"use client";

/* eslint-disable react-hooks/immutability -- This is an imperative
   react-three-fiber scene. useFrame mutates three.js materials and objects
   every frame by design, which the React Compiler purity rules do not model. */

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  Environment,
  Lightformer,
  MeshTransmissionMaterial,
  MeshReflectorMaterial,
  PresentationControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei";
import * as THREE from "three";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";
import type { AgentMood } from "./HoloAgent";

/**
 * The LiveX guide the way LiveX ships it in the field: a full 3D human
 * projected inside a glass cylinder on a lit base. Real glass (transmission),
 * a reflective plinth, top and bottom light rings, and a rigged figure you can
 * grab and turn. It idles and breathes, glows green while it listens, and
 * shifts toward violet while it scans. Static under reduced motion.
 */

const GREEN = "#2fe08a";
const VIOLET = "#9d7bff";
const GREEN_C = new THREE.Color(GREEN);
const VIOLET_C = new THREE.Color(VIOLET);

const MODEL = "/models/agent.glb";
useGLTF.preload(MODEL);

/* -- the projected human --------------------------------------------------- */

function HoloHuman({ mood, reduced }: { mood: AgentMood; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(MODEL);
  const { actions, names } = useAnimations(animations, group);

  const mat = useMemo(() => {
    const m = new THREE.MeshStandardMaterial({
      color: new THREE.Color("#04140e"),
      emissive: new THREE.Color(GREEN),
      emissiveIntensity: 0.72,
      roughness: 0.85,
      metalness: 0,
      transparent: true,
      opacity: 0.92,
      side: THREE.FrontSide,
    });
    m.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      m.userData.shader = shader;
      shader.vertexShader = shader.vertexShader
        .replace("#include <common>", "#include <common>\nvarying vec3 vHoloN;\nvarying vec3 vHoloV;")
        .replace(
          "#include <defaultnormal_vertex>",
          "#include <defaultnormal_vertex>\nvHoloN = normalize(transformedNormal);"
        )
        .replace(
          "#include <project_vertex>",
          "#include <project_vertex>\nvHoloV = normalize(-mvPosition.xyz);"
        );
      shader.fragmentShader = shader.fragmentShader
        .replace(
          "#include <common>",
          "#include <common>\nvarying vec3 vHoloN;\nvarying vec3 vHoloV;\nuniform float uTime;"
        )
        .replace(
          "#include <emissivemap_fragment>",
          `#include <emissivemap_fragment>
           float holoF = pow(1.0 - clamp(dot(normalize(vHoloN), normalize(vHoloV)), 0.0, 1.0), 2.0);
           float holoScan = smoothstep(0.55, 1.0, sin(gl_FragCoord.y * 1.15 - uTime * 6.0));
           totalEmissiveRadiance += emissive * (holoF * 2.6 + holoScan * 0.35);`
        );
    };
    return m;
  }, []);

  useEffect(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.material = mat;
        mesh.frustumCulled = false;
        mesh.castShadow = false;
      }
    });
  }, [scene, mat]);

  useEffect(() => {
    const name = names.find((n) => /idle/i.test(n)) ?? names[0];
    const action = name ? actions[name] : null;
    action?.reset().fadeIn(0.4).play();
    if (reduced) action?.halt(0);
    return () => {
      action?.fadeOut(0.2);
    };
  }, [actions, names, reduced]);

  useFrame((state) => {
    const t = state.clock.elapsedTime;
    const shader = mat.userData.shader as { uniforms: { uTime: { value: number } } } | undefined;
    if (shader && !reduced) shader.uniforms.uTime.value = t;
    mat.emissive.lerp(mood === "scanning" ? VIOLET_C : GREEN_C, 0.05);
    mat.emissiveIntensity = 0.72 + (reduced ? 0 : Math.sin(t * 7) * 0.05);
    if (group.current && !reduced) group.current.rotation.y = Math.PI + Math.sin(t * 0.3) * 0.12;
  });

  return (
    <group ref={group} position={[0, -1.42, 0]} scale={1.32} rotation={[0, Math.PI, 0]}>
      <primitive object={scene} />
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
      <ambientLight intensity={0.45} />
      <spotLight position={[0, 4.5, 3]} angle={0.5} penumbra={1} intensity={0.8} color="#dfeeff" />
      <pointLight position={[0, -1.1, 0.4]} intensity={2.4} distance={3.4} color={GREEN} />
      <pointLight position={[2.2, 1.4, -1.5]} intensity={1.5} distance={7} color={VIOLET} />
      <pointLight position={[-2, 0.6, 2]} intensity={0.8} distance={7} color={GREEN} />

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
