"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { accentClasses, type Accent } from "@/components/strategy/theme";

export type LensKey = "audience" | "surface" | "activation" | "outcome";

const LENSES: { key: LensKey; label: string }[] = [
  { key: "audience", label: "Audience" },
  { key: "surface", label: "Surface" },
  { key: "activation", label: "Activation" },
  { key: "outcome", label: "Outcome" },
];

/**
 * A "lens", not a filter. It never hides nodes — it changes what each node
 * tells you about itself. Deliberately not a row of dashboard chips.
 */
export function ValueLens({
  value,
  onChange,
  accent,
}: {
  value: LensKey;
  onChange: (v: LensKey) => void;
  accent: Accent;
}) {
  const a = accentClasses(accent);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduced;

  return (
    <div className="inline-flex flex-col gap-2">
      <span className="label-tight text-ink-faint">Read the field by</span>
      <div
        role="tablist"
        aria-label="Lens"
        className="inline-flex items-center gap-1 rounded-full border border-line bg-abyss/70 p-1 backdrop-blur-md"
      >
        {LENSES.map((l) => {
          const active = value === l.key;
          return (
            <button
              key={l.key}
              role="tab"
              aria-selected={active}
              onClick={() => onChange(l.key)}
              className={cn(
                "relative rounded-full px-3.5 py-1.5 label-tight transition-colors duration-300",
                active ? "text-void" : "text-ink-dim hover:text-ink"
              )}
            >
              {active &&
                (animate ? (
                  <motion.span
                    layoutId="lens-pill"
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: a.stroke }}
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                ) : (
                  <span
                    aria-hidden
                    className="absolute inset-0 rounded-full"
                    style={{ background: a.stroke }}
                  />
                ))}
              <span className="relative">{l.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}
