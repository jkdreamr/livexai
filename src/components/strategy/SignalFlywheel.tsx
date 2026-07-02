"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { accentClasses, type Accent } from "./theme";

/**
 * Event-to-pipeline flywheel: one experience → many outcomes. The wheel stays
 * clean; the outcome labels live as real DOM text in a legend so nothing is
 * trapped in the canvas. A travelling highlight links each dot to its outcome;
 * hovering the legend drives it. Static + fully legible under reduced motion.
 */
export function SignalFlywheel({
  hub,
  nodes,
  accent,
}: {
  hub: string;
  nodes: string[];
  accent: Accent;
}) {
  const a = accentClasses(accent);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduced;

  const [active, setActive] = useState(-1);
  const [pinned, setPinned] = useState(false);

  useEffect(() => {
    if (!live || pinned) return;
    setActive(0);
    const id = setInterval(
      () => setActive((p) => (p + 1) % nodes.length),
      1500
    );
    return () => clearInterval(id);
  }, [live, pinned, nodes.length]);

  const C = 200;
  const R = 132;
  const pos = (i: number) => {
    const angle = -Math.PI / 2 + (i / nodes.length) * Math.PI * 2;
    return { x: C + Math.cos(angle) * R, y: C + Math.sin(angle) * R };
  };

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
      {/* Wheel */}
      <div className="relative mx-auto w-full max-w-[26rem]">
        <svg viewBox="0 0 400 400" className="w-full">
          {/* base ring */}
          <circle cx={C} cy={C} r={R} fill="none" stroke="var(--color-line)" strokeWidth="1" />
          {/* marching ring */}
          <motion.circle
            cx={C}
            cy={C}
            r={R + 12}
            fill="none"
            stroke={a.stroke}
            strokeWidth="1"
            strokeDasharray="2 12"
            opacity={0.5}
            initial={false}
            animate={live ? { strokeDashoffset: [0, -14] } : {}}
            transition={{ duration: 1.3, ease: "linear", repeat: Infinity }}
          />

          {/* connectors */}
          {nodes.map((_, i) => {
            const p = pos(i);
            const on = i === active;
            return (
              <line
                key={`c${i}`}
                x1={C}
                y1={C}
                x2={p.x}
                y2={p.y}
                stroke={on ? a.stroke : "var(--color-line)"}
                strokeWidth={on ? 1.5 : 1}
                className="transition-all duration-500"
                opacity={on ? 0.9 : 0.4}
              />
            );
          })}

          {/* nodes */}
          {nodes.map((_, i) => {
            const p = pos(i);
            const on = i === active;
            return (
              <circle
                key={`n${i}`}
                cx={p.x}
                cy={p.y}
                r={on ? 7 : 4.5}
                fill={on ? a.stroke : "var(--color-charcoal)"}
                stroke={a.stroke}
                strokeWidth="1.5"
                className="cursor-pointer transition-all duration-500"
                style={on ? { filter: `drop-shadow(0 0 8px ${a.stroke})` } : undefined}
                onMouseEnter={() => {
                  setPinned(true);
                  setActive(i);
                }}
                onMouseLeave={() => setPinned(false)}
              />
            );
          })}

          {/* hub */}
          <circle cx={C} cy={C} r="46" fill="var(--color-charcoal)" stroke="var(--color-line-strong)" />
          <circle cx={C} cy={C} r="46" fill="none" stroke={a.stroke} strokeWidth="1" opacity="0.5" />
        </svg>

        <div className="pointer-events-none absolute inset-0 grid place-items-center">
          <div className="max-w-[7rem] text-center">
            <p className="label-tight text-ink-faint">One</p>
            <p className="font-display text-sm leading-tight text-ink">{hub}</p>
          </div>
        </div>
      </div>

      {/* Legend — real, readable outcome labels */}
      <ol className="flex flex-col">
        {nodes.map((node, i) => {
          const on = i === active;
          return (
            <li key={node}>
              <button
                type="button"
                onMouseEnter={() => {
                  setPinned(true);
                  setActive(i);
                }}
                onMouseLeave={() => setPinned(false)}
                onFocus={() => {
                  setPinned(true);
                  setActive(i);
                }}
                onBlur={() => setPinned(false)}
                className={cn(
                  "flex w-full items-center gap-4 border-b border-line py-3.5 text-left transition-colors",
                  on ? "text-ink" : "text-ink-dim hover:text-ink-soft"
                )}
              >
                <span className="label-tight text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span
                  aria-hidden
                  className={cn(
                    "size-1.5 shrink-0 rounded-full transition-all",
                    on ? a.dot : "bg-line-strong"
                  )}
                  style={on ? { boxShadow: `0 0 8px ${a.stroke}` } : undefined}
                />
                <span className="text-[0.95rem] leading-snug">{node}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </div>
  );
}
