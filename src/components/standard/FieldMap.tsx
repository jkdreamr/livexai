"use client";

import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import type { Strategy } from "@/data/types";
import { useIsCoarsePointer, useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { FieldList } from "./FieldList";

/** A node's placement on the deliberate field grid (percent coords). */
type Placement = { x: number; y: number; weight: number };

/**
 * Architectural placement — aligned to two vertical registers and a shared
 * horizon. Priority 1 anchors the field, largest and lowest-left; the others
 * step up and across it. Nothing is scattered.
 */
const PLACEMENTS: Record<string, Placement> = {
  "sports-fan-experience": { x: 27, y: 60, weight: 1 },
  "creator-interactive-campaigns": { x: 68, y: 30, weight: 0.72 },
  "retail-hospitality-concierge": { x: 27, y: 24, weight: 0.7 },
  "enterprise-experience-sprints": { x: 72, y: 68, weight: 0.78 },
};

const BASE = 132; // px diameter of a weight-1 node on desktop

export function FieldMap({ strategies }: { strategies: Strategy[] }) {
  const reduced = useReducedMotion();
  const coarse = useIsCoarsePointer();
  const mounted = useMounted();

  // Touch / mobile / reduced-motion → clean stacked index.
  if (!mounted || coarse || reduced) {
    return <FieldList strategies={strategies} />;
  }
  return <FieldCanvas strategies={strategies} />;
}

function FieldCanvas({ strategies }: { strategies: Strategy[] }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<string | null>(null);

  // Subtle pointer parallax — the whole field leans, it does not float.
  const px = useMotionValue(0);
  const py = useMotionValue(0);
  const sx = useSpring(px, { stiffness: 60, damping: 20, mass: 0.8 });
  const sy = useSpring(py, { stiffness: 60, damping: 20, mass: 0.8 });
  const leanX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const leanY = useTransform(sy, [-0.5, 0.5], [-9, 9]);

  const onMove = (e: React.PointerEvent) => {
    const el = wrapRef.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    px.set((e.clientX - r.left) / r.width - 0.5);
    py.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => {
    px.set(0);
    py.set(0);
  };

  const placed = strategies.filter((s) => PLACEMENTS[s.slug]);

  // Same-world related pairs → orthogonal elbow links (drawn once per pair).
  const links = useMemo(() => {
    const seen = new Set<string>();
    const out: { a: Placement; b: Placement; key: string }[] = [];
    for (const s of placed) {
      const from = PLACEMENTS[s.slug];
      for (const rel of s.relatedStrategies) {
        const to = PLACEMENTS[rel];
        if (!to) continue; // cross-world relation — skip
        const key = [s.slug, rel].sort().join("::");
        if (seen.has(key)) continue;
        seen.add(key);
        out.push({ a: from, b: to, key });
      }
    }
    return out;
  }, [placed]);

  return (
    <div
      ref={wrapRef}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className="relative mx-auto aspect-[16/11] w-full max-w-6xl"
    >
      {/* Register lines — the architecture behind the nodes */}
      <FieldGrid />

      <motion.div className="absolute inset-0" style={{ x: leanX, y: leanY }}>
        {/* Orthogonal connective tissue */}
        <svg
          aria-hidden
          className="absolute inset-0 h-full w-full overflow-visible"
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
        >
          {links.map((l, i) => (
            <ElbowLink key={l.key} a={l.a} b={l.b} index={i} active={active} />
          ))}
        </svg>

        {/* Nodes */}
        {placed.map((s, i) => (
          <FieldNode
            key={s.slug}
            strategy={s}
            place={PLACEMENTS[s.slug]}
            index={i}
            active={active}
            onFocus={() => setActive(s.slug)}
            onBlur={() => setActive((cur) => (cur === s.slug ? null : cur))}
          />
        ))}
      </motion.div>
    </div>
  );
}

/** Static architectural registers — faint horizon + two verticals. */
function FieldGrid() {
  return (
    <svg
      aria-hidden
      className="pointer-events-none absolute inset-0 h-full w-full"
      viewBox="0 0 100 100"
      preserveAspectRatio="none"
    >
      {[27, 72].map((x) => (
        <line
          key={x}
          x1={x}
          y1={6}
          x2={x}
          y2={94}
          stroke="var(--color-line)"
          strokeWidth={0.15}
          vectorEffect="non-scaling-stroke"
        />
      ))}
      <line
        x1={6}
        y1={45}
        x2={94}
        y2={45}
        stroke="var(--color-line)"
        strokeWidth={0.15}
        vectorEffect="non-scaling-stroke"
      />
    </svg>
  );
}

/** An orthogonal L-shaped link between two placements. */
function ElbowLink({
  a,
  b,
  index,
  active,
}: {
  a: Placement;
  b: Placement;
  index: number;
  active: string | null;
}) {
  // Route: horizontal from a to b.x, then vertical to b — reads architectural.
  const d = `M ${a.x} ${a.y} H ${b.x} V ${b.y}`;
  return (
    <motion.path
      d={d}
      fill="none"
      stroke="var(--color-standard)"
      strokeWidth={0.18}
      strokeOpacity={active ? 0.42 : 0.16}
      vectorEffect="non-scaling-stroke"
      initial={{ pathLength: 0, opacity: 0 }}
      animate={{ pathLength: 1, opacity: 1 }}
      transition={{ duration: 1.1, ease: ease.out, delay: 0.35 + index * 0.12 }}
      style={{ transition: "stroke-opacity 0.5s ease" }}
    />
  );
}

function FieldNode({
  strategy,
  place,
  index,
  active,
  onFocus,
  onBlur,
}: {
  strategy: Strategy;
  place: Placement;
  index: number;
  active: string | null;
  onFocus: () => void;
  onBlur: () => void;
}) {
  const size = Math.round(BASE * place.weight);
  const isActive = active === strategy.slug;
  const dimmed = active !== null && !isActive;
  const primary = place.weight === 1;
  // Reveal the thesis toward the interior of the field so it never clips out.
  const labelSide = place.x > 50 ? "right" : "left";

  return (
    <motion.div
      className="absolute"
      style={{
        left: `${place.x}%`,
        top: `${place.y}%`,
        width: size,
        height: size,
        transform: "translate(-50%, -50%)",
      }}
      initial={{ opacity: 0, scale: 0.82 }}
      animate={{ opacity: dimmed ? 0.4 : 1, scale: 1 }}
      transition={{
        opacity: { duration: 0.45, ease: ease.out },
        scale: { duration: 0.9, ease: ease.out, delay: 0.2 + index * 0.1 },
      }}
    >
      <Link
        href={`/strategy/${strategy.slug}`}
        aria-label={`${strategy.title} — ${strategy.oneLineThesis}`}
        onMouseEnter={onFocus}
        onMouseLeave={onBlur}
        onFocus={onFocus}
        onBlur={onBlur}
        className="cursor-target group absolute inset-0 flex items-center justify-center rounded-full outline-none"
      >
        {/* Ambient glow — grows on focus, never pulses on its own */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-[-40%] rounded-full opacity-40 blur-2xl transition-opacity duration-500 group-hover:opacity-90 group-focus-visible:opacity-90"
          style={{
            background:
              "radial-gradient(circle, var(--color-standard) 0%, transparent 65%)",
          }}
        />

        {/* The luminous well */}
        <span
          aria-hidden
          className="absolute inset-0 rounded-full border transition-colors duration-500"
          style={{
            borderColor: isActive
              ? "var(--color-standard)"
              : "var(--color-line-strong)",
            background:
              "radial-gradient(circle at 50% 38%, rgba(234,173,120,0.14), rgba(10,12,17,0.9) 72%)",
            boxShadow: isActive
              ? "0 0 60px -12px var(--color-standard), inset 0 0 30px -18px var(--color-standard)"
              : "inset 0 0 24px -16px rgba(255,255,255,0.4)",
          }}
        />

        {/* Slow conviction ring on the anchor node only. This branch never
            renders under reduced-motion, so an infinite rotation is safe. */}
        {primary && (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute inset-[-14px] rounded-full border border-dashed border-standard/25"
            animate={{ rotate: 360 }}
            transition={{ duration: 44, ease: "linear", repeat: Infinity }}
          />
        )}

        {/* Core mark */}
        <span className="relative z-10 flex flex-col items-center gap-1.5 text-center">
          <SurfaceGlyph
            surface={strategy.primarySurface}
            size={primary ? 30 : 22}
            className="text-standard transition-transform duration-500 group-hover:scale-110"
          />
          <span
            className="text-display leading-none text-ink transition-colors duration-500 group-hover:text-standard"
            style={{ fontSize: primary ? "1.05rem" : "0.82rem" }}
          >
            {strategy.shortTitle}
          </span>
        </span>
      </Link>

      {/* Tiny hover reveal — the single line of thesis */}
      <motion.div
        aria-hidden
        className={`pointer-events-none absolute top-1/2 w-56 -translate-y-1/2 ${
          labelSide === "right"
            ? "left-full ml-5 text-left"
            : "right-full mr-5 text-right"
        }`}
        initial={false}
        animate={{
          opacity: isActive ? 1 : 0,
          x: isActive ? 0 : labelSide === "right" ? -8 : 8,
        }}
        transition={{ duration: 0.4, ease: ease.out }}
      >
        <span className="label-tight text-standard/80">{strategy.status}</span>
        <p className="mt-2 text-[0.82rem] leading-relaxed text-ink-soft">
          {strategy.oneLineThesis}
        </p>
      </motion.div>
    </motion.div>
  );
}
