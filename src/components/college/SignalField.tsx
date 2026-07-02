"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import type { Strategy } from "@/data/types";
import { useIsCoarsePointer, useMounted, useReducedMotion } from "@/lib/hooks";
import { SurfaceGlyph } from "@/components/ui/Surface";
import GradualBlur from "@/components/reactbits/GradualBlur";

export interface NodePlacement {
  x: number; // 0–100 (percent of field)
  y: number; // 0–100
  size: number; // px diameter of the luminous core
}

interface Edge {
  from: string;
  to: string;
}

const COLLEGE = "var(--color-college)";

/**
 * The living campus signal network. Four luminous, interconnected nodes float
 * over a dark field; same-world relations draw the wiring; signals pulse along
 * them. Pointer parallax moves the whole plane so edges stay attached. Nodes
 * are real <Link>s — the visual is a wrapper on navigation, never a canvas of
 * trapped text.
 *
 * Touch / reduced-motion / no-hover gracefully collapses to a stacked list.
 */
export function SignalField({
  strategies,
  placements,
}: {
  strategies: Strategy[];
  placements: Record<string, NodePlacement>;
}) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const coarse = useIsCoarsePointer();

  // Live, kinetic field only when we have a fine pointer and motion is allowed.
  const live = mounted && !reduced && !coarse;

  if (!mounted) {
    // Pre-hydration: render the accessible list so there is no layout flash
    // and the content is present for crawlers / no-JS.
    return <SignalList strategies={strategies} />;
  }

  if (!live) {
    return <SignalList strategies={strategies} />;
  }

  return <SignalPlane strategies={strategies} placements={placements} />;
}

/* ------------------------------------------------------------------ */
/* Kinetic plane (desktop, motion-on)                                  */
/* ------------------------------------------------------------------ */

function SignalPlane({
  strategies,
  placements,
}: {
  strategies: Strategy[];
  placements: Record<string, NodePlacement>;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [hovered, setHovered] = useState<string | null>(null);

  const slugSet = useMemo(
    () => new Set(strategies.map((s) => s.slug)),
    [strategies]
  );

  // Edges = related strategies within this same world, de-duplicated.
  const edges = useMemo<Edge[]>(() => {
    const seen = new Set<string>();
    const list: Edge[] = [];
    for (const s of strategies) {
      for (const rel of s.relatedStrategies) {
        if (!slugSet.has(rel) || !placements[rel] || !placements[s.slug])
          continue;
        const key = [s.slug, rel].sort().join("::");
        if (seen.has(key)) continue;
        seen.add(key);
        list.push({ from: s.slug, to: rel });
      }
    }
    return list;
  }, [strategies, placements, slugSet]);

  // Pointer parallax — the whole plane drifts together so wiring stays joined.
  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 55, damping: 18, mass: 0.6 });
  const sy = useSpring(my, { stiffness: 55, damping: 18, mass: 0.6 });
  const planeX = useTransform(sx, [-1, 1], [-18, 18]);
  const planeY = useTransform(sy, [-1, 1], [-12, 12]);
  const hazeX = useTransform(sx, [-1, 1], [10, -10]);
  const hazeY = useTransform(sy, [-1, 1], [8, -8]);

  const onMove = (e: React.MouseEvent) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
    my.set(((e.clientY - r.top) / r.height) * 2 - 1);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => {
        mx.set(0);
        my.set(0);
        setHovered(null);
      }}
      className="relative h-[72vh] min-h-[560px] w-full overflow-hidden"
    >
      {/* Distant ambient haze — parallaxes opposite the plane for depth */}
      <motion.div
        aria-hidden
        style={{ x: hazeX, y: hazeY }}
        className="absolute inset-[-6%]"
      >
        <div
          className="absolute left-1/2 top-1/2 h-[70%] w-[70%] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.11] blur-[130px]"
          style={{ background: COLLEGE }}
        />
        <FieldDust />
      </motion.div>

      {/* The connected plane: wiring + pulses + nodes move as one */}
      <motion.div style={{ x: planeX, y: planeY }} className="absolute inset-0">
        {/* Wiring */}
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          {edges.map((e, i) => {
            const p1 = placements[e.from];
            const p2 = placements[e.to];
            const lit = hovered === e.from || hovered === e.to;
            return (
              <line
                key={i}
                x1={p1.x}
                y1={p1.y}
                x2={p2.x}
                y2={p2.y}
                stroke={lit ? COLLEGE : "var(--color-line-strong)"}
                strokeWidth={lit ? 1.3 : 0.7}
                vectorEffect="non-scaling-stroke"
                className="transition-all duration-500"
                opacity={hovered && !lit ? 0.16 : lit ? 0.95 : 0.5}
              />
            );
          })}
        </svg>

        {/* Traveling signal pulses */}
        {edges.map((e, i) => {
          const p1 = placements[e.from];
          const p2 = placements[e.to];
          return (
            <motion.span
              key={`pulse-${i}`}
              aria-hidden
              className="absolute z-0 size-1.5 rounded-full"
              style={{
                background: COLLEGE,
                marginLeft: -3,
                marginTop: -3,
                boxShadow: "0 0 8px 1px var(--color-college)",
              }}
              initial={{ left: `${p1.x}%`, top: `${p1.y}%`, opacity: 0 }}
              animate={{
                left: [`${p1.x}%`, `${p2.x}%`],
                top: [`${p1.y}%`, `${p2.y}%`],
                opacity: [0, 0.85, 0],
              }}
              transition={{
                duration: 4.6,
                repeat: Infinity,
                delay: i * 1.05,
                ease: "easeInOut",
                repeatDelay: 1.8,
              }}
            />
          );
        })}

        {/* Nodes */}
        {strategies.map((s, i) => {
          const p = placements[s.slug];
          if (!p) return null;
          return (
            <motion.div
              key={s.slug}
              className="absolute z-10"
              style={{ left: `${p.x}%`, top: `${p.y}%`, x: "-50%", y: "-50%" }}
              animate={{
                y: ["-50%", "calc(-50% - 8px)", "-50%"],
              }}
              transition={{
                duration: 7 + i * 1.3,
                repeat: Infinity,
                ease: "easeInOut",
                delay: i * 0.7,
              }}
            >
              <SignalNode
                strategy={s}
                size={p.size}
                state={
                  !hovered ? "idle" : hovered === s.slug ? "active" : "dim"
                }
                onEnter={() => setHovered(s.slug)}
                onLeave={() => setHovered(null)}
              />
            </motion.div>
          );
        })}
      </motion.div>

      {/* Premium bottom fade into the void */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="8rem"
        strength={2}
        divCount={6}
        curve="bezier"
      />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* A single luminous node — a real <Link>                              */
/* ------------------------------------------------------------------ */

type NodeState = "idle" | "active" | "dim";

function SignalNode({
  strategy,
  size,
  state,
  onEnter,
  onLeave,
}: {
  strategy: Strategy;
  size: number;
  state: NodeState;
  onEnter: () => void;
  onLeave: () => void;
}) {
  const active = state === "active";
  const dim = state === "dim";
  const flagship = Boolean(strategy.flagship);

  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      aria-label={`${strategy.shortTitle} — ${strategy.oneLineThesis}`}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onFocus={onEnter}
      onBlur={onLeave}
      className="cursor-target group relative block outline-none"
      style={{ width: size, height: size }}
    >
      {/* Outer breathing ring */}
      <span
        aria-hidden
        className={
          "absolute inset-0 rounded-full transition-all duration-500 " +
          (flagship ? "will-breathe" : "")
        }
        style={{
          border: `1px solid ${
            active ? "var(--color-college)" : "var(--color-line-strong)"
          }`,
          opacity: dim ? 0.28 : 1,
          transform: active ? "scale(1.14)" : "scale(1)",
        }}
      />

      {/* Halo glow */}
      <span
        aria-hidden
        className="absolute inset-0 rounded-full transition-opacity duration-500"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, var(--color-college), transparent 68%)",
          opacity: active ? 0.55 : dim ? 0.1 : flagship ? 0.3 : 0.2,
          filter: "blur(6px)",
        }}
      />

      {/* Luminous core */}
      <span
        aria-hidden
        className="absolute inset-[22%] rounded-full transition-all duration-500"
        style={{
          background:
            "radial-gradient(circle at 38% 34%, rgba(234,255,248,0.95), var(--color-college) 55%, var(--color-college-deep) 100%)",
          opacity: dim ? 0.5 : 1,
          boxShadow: active
            ? "0 0 34px 4px var(--color-college)"
            : "0 0 18px 0 rgba(127,234,209,0.35)",
          transform: active ? "scale(1.06)" : "scale(1)",
        }}
      />

      {/* Flagship gets a fine orbit ring */}
      {flagship && (
        <span
          aria-hidden
          className="absolute inset-[-14%] rounded-full"
          style={{
            border: "1px dashed rgba(127,234,209,0.28)",
            opacity: dim ? 0.2 : 0.6,
          }}
        />
      )}

      {/* Label + reveal — sits below the core, minimal by default */}
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-full mt-3 w-[min(15rem,42vw)] -translate-x-1/2 text-center"
      >
        <span
          className="block font-display text-sm text-ink transition-opacity duration-300"
          style={{ opacity: dim ? 0.4 : 1 }}
        >
          {strategy.shortTitle}
        </span>
        {/* One-line thesis revealed only on hover/focus */}
        <span
          className="mt-1.5 block text-[0.72rem] leading-snug text-ink-dim transition-all duration-300"
          style={{
            opacity: active ? 1 : 0,
            transform: active ? "translateY(0)" : "translateY(-4px)",
          }}
        >
          {strategy.oneLineThesis}
        </span>
      </span>

      {/* Primary-surface glyph, whispered inside the core on hover */}
      <span
        aria-hidden
        className="absolute inset-0 flex items-center justify-center text-void transition-opacity duration-300"
        style={{ opacity: active ? 0.85 : 0 }}
      >
        <SurfaceGlyph
          surface={strategy.primarySurface}
          size={Math.round(size * 0.34)}
        />
      </span>
    </Link>
  );
}

/* ------------------------------------------------------------------ */
/* Accessible / touch / reduced-motion fallback — a clean stacked list */
/* ------------------------------------------------------------------ */

function SignalList({ strategies }: { strategies: Strategy[] }) {
  return (
    <div className="container-x">
      <ul className="mx-auto max-w-2xl divide-y divide-line">
        {strategies.map((s) => (
          <li key={s.slug}>
            <Link
              href={`/strategy/${s.slug}`}
              aria-label={`${s.shortTitle} — ${s.oneLineThesis}`}
              className="cursor-target group flex items-start gap-5 py-7 outline-none"
            >
              {/* A small luminous node marker */}
              <span
                aria-hidden
                className="relative mt-1 shrink-0"
                style={{ width: s.flagship ? 18 : 12, height: s.flagship ? 18 : 12 }}
              >
                <span
                  className="absolute inset-0 rounded-full"
                  style={{
                    background:
                      "radial-gradient(circle at 38% 34%, rgba(234,255,248,0.95), var(--color-college) 55%, var(--color-college-deep) 100%)",
                    boxShadow: "0 0 12px 0 rgba(127,234,209,0.4)",
                  }}
                />
              </span>

              <span className="min-w-0 flex-1">
                <span className="flex items-baseline justify-between gap-4">
                  <span className="font-display text-xl text-ink transition-colors group-hover:text-college">
                    {s.shortTitle}
                  </span>
                  <span
                    aria-hidden
                    className="shrink-0 text-ink-faint transition-transform group-hover:translate-x-1"
                  >
                    →
                  </span>
                </span>
                <span className="mt-1.5 block text-sm leading-relaxed text-ink-dim">
                  {s.oneLineThesis}
                </span>
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

/* ------------------------------------------------------------------ */
/* Distant scattered signals behind the plane                          */
/* ------------------------------------------------------------------ */

const DUST: [number, number][] = [
  [8, 22], [16, 66], [24, 40], [33, 12], [48, 30], [52, 84],
  [60, 52], [68, 18], [77, 44], [84, 72], [90, 34], [94, 60],
  [12, 84], [38, 58], [72, 88], [88, 12],
];

function FieldDust() {
  return (
    <svg
      className="absolute inset-0 h-full w-full opacity-[0.4]"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
      aria-hidden
    >
      {DUST.map(([x, y], i) => (
        <circle
          key={i}
          cx={x}
          cy={y}
          r={i % 5 === 0 ? 0.5 : 0.28}
          fill={COLLEGE}
          opacity="0.5"
        />
      ))}
    </svg>
  );
}
