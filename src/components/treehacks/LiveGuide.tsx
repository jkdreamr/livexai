"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

export type GuideState = "idle" | "active" | "committed";

/** Deterministic PRNG so particle layout is stable across renders (and pure). */
function mulberry32(seed: number) {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * The abstract LiveX Builder Guide — a stylized holographic presence built from
 * primitive geometry (no face, no avatar). It reacts to the arrival state:
 * idle → active (brightens, quickens) → committed (a directed build-signal
 * streams toward the phone). Purely visual; all copy lives in the DOM.
 */
function GuideCore({ state, accent }: { state: GuideState; accent: string }) {
  const ACCENT = accent;
  const group = useRef<THREE.Group>(null);
  const core = useRef<THREE.Mesh>(null);
  const coreMat = useRef<THREE.MeshStandardMaterial>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const points = useRef<THREE.Points>(null);
  const stream = useRef<THREE.Points>(null);

  const cloud = useMemo(() => {
    const rand = mulberry32(20260702);
    const n = 220;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      const r = 1.4 + rand() * 0.9;
      const theta = rand() * Math.PI * 2;
      const phi = Math.acos(2 * rand() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  const streamPts = useMemo(() => {
    const rand = mulberry32(881);
    const n = 40;
    const arr = new Float32Array(n * 3);
    for (let i = 0; i < n; i++) {
      arr[i * 3] = (i / n) * 4;
      arr[i * 3 + 1] = (rand() - 0.5) * 0.3;
      arr[i * 3 + 2] = (rand() - 0.5) * 0.3;
    }
    return arr;
  }, []);

  useFrame((s, delta) => {
    const speed = state === "idle" ? 0.15 : state === "active" ? 0.5 : 0.35;
    if (group.current) group.current.rotation.y += delta * speed;
    if (ringA.current) ringA.current.rotation.z += delta * speed * 1.4;
    if (ringB.current) ringB.current.rotation.x -= delta * speed * 1.1;

    const targetGlow = state === "idle" ? 0.5 : state === "active" ? 1.6 : 1.1;
    if (coreMat.current)
      coreMat.current.emissiveIntensity = THREE.MathUtils.damp(
        coreMat.current.emissiveIntensity,
        targetGlow,
        4,
        delta
      );
    const targetScale = state === "active" ? 1.12 : 1;
    if (core.current) {
      const cur = THREE.MathUtils.damp(core.current.scale.x, targetScale, 5, delta);
      core.current.scale.setScalar(cur);
    }
    if (points.current) {
      const pm = points.current.material as THREE.PointsMaterial;
      pm.opacity = THREE.MathUtils.damp(pm.opacity, state === "idle" ? 0.4 : 0.85, 4, delta);
    }
    // build-signal stream fades in only when committed
    if (stream.current) {
      const sm = stream.current.material as THREE.PointsMaterial;
      sm.opacity = THREE.MathUtils.damp(sm.opacity, state === "committed" ? 0.9 : 0, 5, delta);
      const t = (s.clock.elapsedTime * 1.4) % 1;
      stream.current.position.x = t * 1.2;
    }
  });

  return (
    <group ref={group}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.85, 1]} />
        <meshStandardMaterial
          ref={coreMat}
          color={ACCENT}
          emissive={ACCENT}
          emissiveIntensity={0.5}
          roughness={0.3}
          metalness={0.2}
          wireframe
        />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[0.45, 0]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.5} blending={THREE.AdditiveBlending} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.5, 0.012, 12, 90]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.6} />
      </mesh>
      <mesh ref={ringB} rotation={[0, Math.PI / 3, Math.PI / 5]}>
        <torusGeometry args={[1.85, 0.01, 12, 90]} />
        <meshBasicMaterial color={ACCENT} transparent opacity={0.35} />
      </mesh>

      <points ref={points}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[cloud, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.03}
          color={ACCENT}
          transparent
          opacity={0.4}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>

      <points ref={stream} position={[0, 0, 0]}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[streamPts, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.05}
          color={ACCENT}
          transparent
          opacity={0}
          sizeAttenuation
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </points>
    </group>
  );
}

export function LiveGuide({
  state = "idle",
  accent = "#42c58a",
}: {
  state?: GuideState;
  accent?: string;
}) {
  return (
    <Canvas
      camera={{ fov: 40, position: [0, 0, 5.2] }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.4} />
      <pointLight position={[3, 3, 4]} intensity={40} color={accent} />
      <Float speed={1.1} rotationIntensity={0.25} floatIntensity={0.5}>
        <GuideCore state={state} accent={accent} />
      </Float>
    </Canvas>
  );
}
