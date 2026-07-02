"use client";

import { Suspense, useEffect, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  MeshReflectorMaterial,
  PresentationControls,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";
import type { AgentMood } from "./HoloAgent";

/**
 * The LiveX guide the way LiveX ships it in the field: a real person projected
 * inside a glass cylinder on a lit base. Real glass (transmission), a reflective
 * plinth, top and bottom light rings, and a scanned human figure you can grab
 * and turn. The figure keeps its own detail but wears a holographic treatment,
 * a green fresnel rim and travelling scanlines, and shifts toward violet while
 * it scans. Static under reduced motion.
 */

const GREEN = "#2fe08a";
const VIOLET = "#9d7bff";
const GREEN_C = new THREE.Color(GREEN);
const VIOLET_C = new THREE.Color(VIOLET);

const MODEL = "/models/craig.glb";
// The scan is authored facing +X, so turn it a quarter turn to face the camera.
const BASE_ROT = -Math.PI / 2;
useGLTF.preload(MODEL);

/* -- the projected human --------------------------------------------------- */

function HoloHuman({ mood, reduced }: { mood: AgentMood; reduced: boolean }) {
  const spin = useRef<THREE.Group>(null);
  const { scene } = useGLTF(MODEL);
  const mats = useRef<THREE.MeshStandardMaterial[]>([]);
  const shaders = useRef<{ uniforms: { uTime: { value: number } } }[]>([]);

  useEffect(() => {
    const collected: THREE.MeshStandardMaterial[] = [];
    shaders.current = [];
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.frustumCulled = false;
      mesh.castShadow = false;
      const list = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
      list.forEach((m) => {
        const sm = m as THREE.MeshStandardMaterial;
        sm.transparent = true;
        sm.opacity = 0.95;
        sm.roughness = 0.72;
        sm.metalness = 0;
        sm.emissive = new THREE.Color(GREEN);
        sm.emissiveIntensity = 0.9;
        sm.onBeforeCompile = (shader) => {
          shader.uniforms.uTime = { value: 0 };
          shaders.current.push(shader as unknown as { uniforms: { uTime: { value: number } } });
          shader.vertexShader = shader.vertexShader
            .replace("#include <common>", "#include <common>\nvarying vec3 vHoloN;\nvarying vec3 vHoloV;")
            .replace("#include <defaultnormal_vertex>", "#include <defaultnormal_vertex>\nvHoloN = normalize(transformedNormal);")
            .replace("#include <project_vertex>", "#include <project_vertex>\nvHoloV = normalize(-mvPosition.xyz);");
          shader.fragmentShader = shader.fragmentShader
            .replace(
              "#include <common>",
              "#include <common>\nvarying vec3 vHoloN;\nvarying vec3 vHoloV;\nuniform float uTime;"
            )
            .replace(
              "#include <map_fragment>",
              "#include <map_fragment>\ndiffuseColor.rgb = mix(diffuseColor.rgb, vec3(0.16, 0.86, 0.53), 0.42);"
            )
            .replace(
              "#include <emissivemap_fragment>",
              `#include <emissivemap_fragment>
               float holoF = pow(1.0 - clamp(dot(normalize(vHoloN), normalize(vHoloV)), 0.0, 1.0), 2.2);
               float holoScan = smoothstep(0.5, 1.0, sin(gl_FragCoord.y * 1.05 - uTime * 6.0));
               totalEmissiveRadiance += emissive * (holoF * 2.2 + holoScan * 0.22);`
            );
        };
        sm.needsUpdate = true;
        collected.push(sm);
      });
    });
    mats.current = collected;
  }, [scene]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    if (!reduced) shaders.current.forEach((s) => (s.uniforms.uTime.value = t));
    const target = mood === "scanning" ? VIOLET_C : GREEN_C;
    mats.current.forEach((m) => {
      m.emissive.lerp(target, 0.05);
      m.emissiveIntensity = 0.9 + (reduced ? 0 : Math.sin(t * 7) * 0.06);
    });
    if (spin.current && !reduced) {
      spin.current.position.y = Math.sin(t * 1.1) * 0.02;
      spin.current.rotation.y = BASE_ROT + Math.sin(t * 0.3) * 0.1;
    }
  });

  return (
    <group ref={spin} rotation={[0, BASE_ROT, 0]}>
      <group scale={0.6945} position={[-1.0357, -1.4, -1.131]}>
        <primitive object={scene} />
      </group>
    </group>
  );
}

/* -- rings that sweep the volume as it projects --------------------------- */

function ScanRing({ phase, reduced }: { phase: number; reduced: boolean }) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (reduced || !ref.current) return;
    const span = 2.6;
    const y = (((state.clock.elapsedTime * 0.45 + phase) % 1) - 0.5) * span;
    ref.current.position.y = y;
    (ref.current.material as THREE.Material).opacity = 0.4 * (1 - Math.abs(y) / (span / 2));
  });
  return (
    <mesh ref={ref} rotation={[Math.PI / 2, 0, 0]}>
      <torusGeometry args={[0.74, 0.005, 8, 64]} />
      <meshBasicMaterial color={GREEN} transparent opacity={0.3} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
    </mesh>
  );
}

function ScanRings({ reduced }: { reduced: boolean }) {
  return (
    <>
      <ScanRing phase={0} reduced={reduced} />
      <ScanRing phase={0.5} reduced={reduced} />
    </>
  );
}

/* -- base + glass + rings -------------------------------------------------- */

function Kiosk({ mood, reduced, mobile }: { mood: AgentMood; reduced: boolean; mobile: boolean }) {
  const baseGlow: [number, string, number][] = [
    [0.55, GREEN, 0.5],
    [0.85, GREEN, 0.34],
    [1.12, VIOLET, 0.3],
  ];

  return (
    <group>
      {/* projector beam */}
      <mesh position={[0, -0.55, 0]} rotation={[Math.PI, 0, 0]}>
        <coneGeometry args={[0.78, 1.9, 40, 1, true]} />
        <meshBasicMaterial color={GREEN} transparent opacity={0.045} side={THREE.DoubleSide} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
      </mesh>

      <Suspense fallback={null}>
        <HoloHuman mood={mood} reduced={reduced} />
      </Suspense>
      <ScanRings reduced={reduced} />

      {/* glass cylinder */}
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.98, 0.98, 2.9, 64, 1, true]} />
        <MeshTransmissionMaterial
          transmission={1}
          thickness={0.3}
          roughness={0.08}
          ior={1.18}
          chromaticAberration={0.035}
          anisotropicBlur={0.1}
          distortion={0.06}
          distortionScale={0.15}
          temporalDistortion={0}
          samples={mobile ? 2 : 6}
          resolution={mobile ? 256 : 512}
          color="#e6fff3"
          attenuationColor={GREEN}
          attenuationDistance={3}
          backside={false}
        />
      </mesh>

      {/* top + bottom light rings */}
      {[1.5, -1.4].map((y, i) => (
        <group key={i} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <mesh>
            <torusGeometry args={[0.99, 0.04, 16, 90]} />
            <meshBasicMaterial color={GREEN} toneMapped={false} />
          </mesh>
          <mesh>
            <torusGeometry args={[1.06, 0.015, 12, 90]} />
            <meshBasicMaterial color={VIOLET} transparent opacity={0.55} toneMapped={false} blending={THREE.AdditiveBlending} />
          </mesh>
        </group>
      ))}

      {/* base plinth */}
      <mesh position={[0, -1.66, 0]}>
        <cylinderGeometry args={[1.32, 1.5, 0.52, 64]} />
        <meshStandardMaterial color="#0a0e15" metalness={0.85} roughness={0.42} />
      </mesh>

      {/* reflective top face of the plinth */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.39, 0]}>
        <circleGeometry args={[1.3, 64]} />
        {mobile ? (
          <meshStandardMaterial color="#0b0f16" metalness={0.7} roughness={0.35} />
        ) : (
          <MeshReflectorMaterial
            mirror={0.5}
            blur={[240, 60]}
            resolution={512}
            mixBlur={1.2}
            mixStrength={22}
            depthScale={0.8}
            minDepthThreshold={0.3}
            maxDepthThreshold={1.2}
            color="#0b0f16"
            metalness={0.6}
            roughness={0.5}
          />
        )}
      </mesh>

      {/* concentric glow rings on the base */}
      {baseGlow.map(([r, c, o], i) => (
        <mesh key={i} rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.375, 0]}>
          <ringGeometry args={[r - 0.02, r, 80]} />
          <meshBasicMaterial color={c} transparent opacity={o} blending={THREE.AdditiveBlending} depthWrite={false} toneMapped={false} />
        </mesh>
      ))}
    </group>
  );
}

export function HoloKiosk({ mood = "idle" }: { mood?: AgentMood }) {
  const reduced = useReducedMotion();
  const mobile = useIsMobile();

  return (
    <Canvas
      camera={{ position: [0, 0.25, 5.4], fov: 34 }}
      dpr={mobile ? [1, 1.3] : [1, 1.7]}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ touchAction: "pan-y" }}
    >
      <ambientLight intensity={0.5} />
      <spotLight position={[0, 4.5, 3]} angle={0.5} penumbra={1} intensity={0.85} color="#dfeeff" />
      <pointLight position={[0, -1.1, 0.4]} intensity={2.4} distance={3.4} color={GREEN} />
      <pointLight position={[2.2, 1.4, -1.5]} intensity={1.5} distance={7} color={VIOLET} />
      <pointLight position={[-2, 0.6, 2]} intensity={1} distance={7} color={GREEN} />
      <pointLight position={[0, 1.6, 2.4]} intensity={0.7} distance={6} color="#eafff6" />

      <PresentationControls
        global
        cursor={false}
        snap
        speed={1.1}
        polar={[-0.12, 0.2]}
        azimuth={[-0.5, 0.5]}
      >
        <group position={[0, 0.15, 0]}>
          <Kiosk mood={mood} reduced={reduced} mobile={mobile} />
        </group>
      </PresentationControls>

      <Environment resolution={128} frames={1}>
        <Lightformer intensity={2.2} position={[0, 2, -2]} scale={[4, 4, 1]} color={GREEN} />
        <Lightformer intensity={1.3} position={[-2.5, 0, 1.5]} scale={[2.5, 3, 1]} color={VIOLET} />
        <Lightformer intensity={1} position={[2.5, 0.5, 1.5]} scale={[2.5, 3, 1]} color="#ffffff" />
      </Environment>
    </Canvas>
  );
}

export default HoloKiosk;
