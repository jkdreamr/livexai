"use client";

import { useMemo, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Strategy } from "@/data/types";
import { useIsMobile, useMounted, useReducedMotion } from "@/lib/hooks";
import { accentClasses, type Accent } from "@/components/strategy/theme";
import { ValueLens, type LensKey } from "./ValueLens";
import { StrategyNode, StrategyNodeRow } from "./StrategyNode";

export interface NodeLayout {
  x: number; // 0–100
  y: number; // 0–100
  size: number;
}

export function StrategyField({
  strategies,
  accent,
  positions,
  temperament,
}: {
  strategies: Strategy[];
  accent: Accent;
  positions: Record<string, NodeLayout>;
  temperament: "kinetic" | "architectural";
}) {
  const [lens, setLens] = useState<LensKey>("audience");
  const [hovered, setHovered] = useState<string | null>(null);
  const ref = useRef<HTMLDivElement>(null);

  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const animate = mounted && !reduced;
  const kinetic = temperament === "kinetic";
  const a = accentClasses(accent);

  // Edges: related strategies within the same world.
  const edges = useMemo(() => {
    const set = new Set<string>();
    const list: { from: string; to: string }[] = [];
    for (const s of strategies) {
      for (const rel of s.relatedStrategies) {
        if (!positions[rel] || !positions[s.slug]) continue;
        const key = [s.slug, rel].sort().join("::");
        if (set.has(key)) continue;
        set.add(key);
        list.push({ from: s.slug, to: rel });
      }
    }
    return list;
  }, [strategies, positions]);

  // Pointer parallax (whole plane moves together so edges stay connected).
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 60, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 60, damping: 18, mass: 0.6 });
  const planeX = useTransform(sx, [-1, 1], [-16, 16]);
  const planeY = useTransform(sy, [-1, 1], [-11, 11]);
  const bgX = useTransform(sx, [-1, 1], [8, -8]);
  const bgY = useTransform(sy, [-1, 1], [6, -6]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  const stateFor = (slug: string) =>
    !hovered ? "idle" : hovered === slug ? "active" : "dim";

  return (
    <div>
      <div className="container-x flex flex-wrap items-end justify-between gap-6">
        <ValueLens value={lens} onChange={setLens} accent={accent} />
        <p className="label-tight max-w-xs text-ink-faint sm:text-right">
          {isMobile
            ? "Tap a node to enter its strategy"
            : "Hover a node to read it · click to enter"}
        </p>
      </div>

      {/* Spatial field — desktop */}
      <div
        ref={ref}
        onMouseMove={animate ? onMove : undefined}
        onMouseLeave={() => {
          mx.set(0);
          my.set(0);
          setHovered(null);
        }}
        className="relative mt-4 hidden h-[64vh] min-h-[520px] overflow-hidden md:block"
      >
        {/* depth layer — accent haze + temperament structure */}
        <motion.div
          aria-hidden
          style={animate ? { x: bgX, y: bgY } : undefined}
          className="absolute inset-[-4%]"
        >
          <div
            className="absolute left-1/2 top-1/2 h-[80%] w-[80%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.1] blur-[120px]"
            style={{ background: a.stroke }}
          />
          <FieldTexture temperament={temperament} color={a.stroke} />
        </motion.div>

        {/* connected plane */}
        <motion.div
          style={animate ? { x: planeX, y: planeY } : undefined}
          className="absolute inset-0"
        >
          {/* edges */}
          <svg
            className="absolute inset-0 h-full w-full"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden
          >
            {edges.map((e, i) => {
              const p1 = positions[e.from];
              const p2 = positions[e.to];
              const lit = hovered === e.from || hovered === e.to;
              return (
                <line
                  key={i}
                  x1={p1.x}
                  y1={p1.y}
                  x2={p2.x}
                  y2={p2.y}
                  stroke={lit ? a.stroke : "var(--color-line-strong)"}
                  strokeWidth={lit ? 1.25 : 0.75}
                  vectorEffect="non-scaling-stroke"
                  className="transition-all duration-500"
                  opacity={hovered && !lit ? 0.25 : lit ? 0.9 : 0.55}
                />
              );
            })}
          </svg>

          {/* signal pulses (kinetic worlds only) */}
          {animate &&
            kinetic &&
            edges.map((e, i) => {
              const p1 = positions[e.from];
              const p2 = positions[e.to];
              return (
                <motion.span
                  key={`pulse-${i}`}
                  aria-hidden
                  className="absolute z-0 size-1.5 rounded-full"
                  style={{ background: a.stroke, marginLeft: -3, marginTop: -3 }}
                  initial={{
                    left: `${p1.x}%`,
                    top: `${p1.y}%`,
                    opacity: 0,
                  }}
                  animate={{
                    left: [`${p1.x}%`, `${p2.x}%`],
                    top: [`${p1.y}%`, `${p2.y}%`],
                    opacity: [0, 0.7, 0],
                  }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    delay: i * 1.1,
                    ease: "easeInOut",
                    repeatDelay: 2,
                  }}
                />
              );
            })}

          {/* nodes */}
          {strategies.map((s, i) => {
            const p = positions[s.slug];
            if (!p) return null;
            return (
              <motion.div
                key={s.slug}
                className="absolute z-10"
                style={{ left: `${p.x}%`, top: `${p.y}%`, x: "-50%", y: "-50%" }}
                animate={
                  animate && kinetic
                    ? { scale: [1, 1.035, 1] }
                    : undefined
                }
                transition={
                  animate && kinetic
                    ? {
                        duration: 6 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.6,
                      }
                    : undefined
                }
              >
                <StrategyNode
                  strategy={s}
                  accent={accent}
                  lens={lens}
                  size={p.size}
                  state={stateFor(s.slug)}
                  onActivate={() => setHovered(s.slug)}
                  onDeactivate={() => setHovered(null)}
                />
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* List — mobile / reduced-motion / a11y */}
      <div className="container-x mt-8 md:hidden">
        <ul>
          {strategies.map((s) => (
            <li key={s.slug}>
              <StrategyNodeRow strategy={s} accent={accent} lens={lens} />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

/**
 * Structural fill behind the field. Kinetic = distant scattered signals;
 * architectural = a faint blueprint grid with a horizon axis.
 */
const SCATTER = [
  [8, 20], [16, 66], [24, 40], [33, 12], [48, 30], [52, 84],
  [60, 52], [68, 18], [77, 44], [84, 72], [90, 34], [94, 60],
  [12, 84], [38, 58], [72, 88], [88, 12],
];

function FieldTexture({
  temperament,
  color,
}: {
  temperament: "kinetic" | "architectural";
  color: string;
}) {
  if (temperament === "architectural") {
    return (
      <svg
        className="absolute inset-0 h-full w-full opacity-[0.16]"
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        aria-hidden
      >
        <g stroke={color} strokeWidth="0.15" vectorEffect="non-scaling-stroke">
          {Array.from({ length: 9 }).map((_, i) => (
            <line key={`v${i}`} x1={(i + 1) * 10} y1="6" x2={(i + 1) * 10} y2="94" />
          ))}
          {Array.from({ length: 7 }).map((_, i) => (
            <line key={`h${i}`} x1="4" y1={(i + 1) * 12} x2="96" y2={(i + 1) * 12} />
          ))}
        </g>
        <line
          x1="4"
          y1="50"
          x2="96"
          y2="50"
          stroke={color}
          strokeWidth="0.6"
          opacity="0.5"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
    );
  }
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.4]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {SCATTER.map(([x, y], i) => (
        <circle key={i} cx={x} cy={y} r={i % 5 === 0 ? 0.5 : 0.28} fill={color} opacity="0.5" />
      ))}
    </svg>
  );
}
