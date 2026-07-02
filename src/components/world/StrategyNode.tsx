"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import type { Strategy } from "@/data/types";
import { cn } from "@/lib/cn";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { accentClasses, type Accent } from "@/components/strategy/theme";
import type { LensKey } from "./ValueLens";

type NodeState = "idle" | "active" | "dim";

/** The luminous orb used in the spatial field. */
export function StrategyNode({
  strategy,
  accent,
  lens,
  size = 60,
  state = "idle",
  onActivate,
  onDeactivate,
}: {
  strategy: Strategy;
  accent: Accent;
  lens: LensKey;
  size?: number;
  state?: NodeState;
  onActivate?: () => void;
  onDeactivate?: () => void;
}) {
  const a = accentClasses(accent);
  const lensValue = strategy.lens[lens];
  const isFlagship = Boolean(strategy.flagship);

  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      onMouseEnter={onActivate}
      onMouseLeave={onDeactivate}
      onFocus={onActivate}
      onBlur={onDeactivate}
      aria-label={`${strategy.title} — ${strategy.status}. ${strategy.oneLineThesis}`}
      className={cn(
        "cursor-target group relative flex flex-col items-center outline-none transition-opacity duration-500",
        state === "dim" ? "opacity-35" : "opacity-100"
      )}
    >
      {/* Orb */}
      <span
        className="relative grid place-items-center"
        style={{ width: size, height: size }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-xl transition-opacity duration-500"
          style={{
            background: a.stroke,
            opacity: state === "active" ? 0.5 : 0.22,
          }}
        />
        <span
          aria-hidden
          className={cn(
            "absolute inset-0 rounded-full border transition-all duration-500",
            state === "active" ? "scale-110" : "scale-100"
          )}
          style={{
            borderColor: a.stroke,
            boxShadow:
              state === "active"
                ? `0 0 0 1px ${a.stroke}, inset 0 0 20px -6px ${a.stroke}`
                : `inset 0 0 16px -8px ${a.stroke}`,
          }}
        />
        {isFlagship && (
          <span
            aria-hidden
            className="absolute rounded-full border border-dashed opacity-60"
            style={{
              inset: -8,
              borderColor: a.stroke,
            }}
          />
        )}
        <span
          aria-hidden
          className="text-ink-soft transition-transform duration-500 group-hover:scale-110"
          style={{ color: state === "active" ? a.stroke : undefined }}
        >
          <SurfaceGlyph surface={strategy.primarySurface} size={size * 0.34} />
        </span>
      </span>

      {/* Label */}
      <span className="mt-3 flex flex-col items-center text-center">
        {isFlagship && (
          <span className={`label-tight mb-1 ${a.text}`}>Flagship</span>
        )}
        <span className="font-display text-base leading-tight text-ink">
          {strategy.shortTitle}
        </span>
        <span className="label-tight mt-1.5 text-ink-faint">
          {strategy.status}
        </span>
        <span className={`label-tight mt-1 ${a.text}`}>{lensValue}</span>
      </span>

      {/* Hover thesis */}
      <AnimatePresence>
        {state === "active" && (
          <motion.span
            initial={{ opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.25 }}
            className="absolute top-full z-20 mt-3 w-52 rounded-lg border border-line-strong bg-abyss/95 p-3 text-center text-xs leading-relaxed text-ink-soft backdrop-blur"
          >
            {strategy.oneLineThesis}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

/** Compact row used for the mobile / reduced-motion / a11y list. */
export function StrategyNodeRow({
  strategy,
  accent,
  lens,
}: {
  strategy: Strategy;
  accent: Accent;
  lens: LensKey;
}) {
  const a = accentClasses(accent);
  return (
    <Link
      href={`/strategy/${strategy.slug}`}
      className="cursor-target group flex items-center gap-4 border-b border-line py-5 transition-colors hover:bg-white/[0.02]"
    >
      <span
        className="relative grid size-12 shrink-0 place-items-center rounded-full border"
        style={{ borderColor: a.stroke }}
      >
        <span
          aria-hidden
          className="absolute inset-0 rounded-full blur-md"
          style={{ background: a.stroke, opacity: 0.18 }}
        />
        <span className="relative" style={{ color: a.stroke }}>
          <SurfaceGlyph surface={strategy.primarySurface} size={20} />
        </span>
      </span>
      <span className="min-w-0 flex-1">
        <span className="flex flex-wrap items-center gap-x-3 gap-y-1">
          {strategy.flagship && (
            <span className={`label-tight ${a.text}`}>Flagship</span>
          )}
          <span className="font-display text-lg text-ink">
            {strategy.shortTitle}
          </span>
          <span className="label-tight text-ink-faint">{strategy.status}</span>
        </span>
        <span className="mt-1 block text-sm text-ink-dim">
          {strategy.oneLineThesis}
        </span>
        <span className={`label-tight mt-1.5 block ${a.text}`}>
          {strategy.lens[lens]}
        </span>
      </span>
      <span
        aria-hidden
        className="text-ink-dim transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </Link>
  );
}
