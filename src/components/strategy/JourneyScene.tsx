"use client";

import { useRef } from "react";
import { motion, useScroll, useSpring } from "framer-motion";
import type { JourneyStep } from "@/data/types";
import { SURFACES } from "@/data/types";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { accentClasses, type Accent } from "./theme";
import { ease } from "@/lib/motion";

/**
 * The user (or partner) journey as a vertical path. A scroll-linked line draws
 * down the rail as steps pass; each node carries the surface it happens on, so
 * you can *see* the interaction move across surfaces.
 */
export function JourneyScene({
  steps,
  accent,
  kind = "user",
}: {
  steps: JourneyStep[];
  accent: Accent;
  kind?: "user" | "partner";
}) {
  const ref = useRef<HTMLOListElement>(null);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduced;
  const a = accentClasses(accent);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.55"],
  });
  const drawn = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 26,
    mass: 0.4,
  });

  return (
    <ol ref={ref} className="relative flex flex-col">
      {/* Base rail + drawn progress */}
      <div
        aria-hidden
        className="absolute bottom-6 left-[21px] top-6 w-px bg-line"
      />
      {animate && (
        <motion.div
          aria-hidden
          style={{ scaleY: drawn, background: a.stroke }}
          className="absolute bottom-6 left-[21px] top-6 w-px origin-top opacity-70"
        />
      )}

      {steps.map((step, i) => {
        const surface = step.surface ? SURFACES[step.surface] : null;
        return (
          <li key={step.id} className="relative flex gap-5 pb-12 last:pb-0">
            {/* Node */}
            <div className="relative z-10 shrink-0">
              <motion.div
                initial={animate ? { scale: 0.6, opacity: 0 } : false}
                whileInView={animate ? { scale: 1, opacity: 1 } : undefined}
                viewport={{ once: true, amount: 0.8 }}
                transition={{ duration: 0.5, ease: ease.out }}
                className="grid size-[42px] place-items-center rounded-full border border-line-strong bg-charcoal text-ink-soft"
              >
                {surface ? (
                  <SurfaceGlyph surface={surface.key} size={18} />
                ) : (
                  <span className="label-tight text-ink-dim">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                )}
              </motion.div>
            </div>

            {/* Content */}
            <motion.div
              initial={animate ? { opacity: 0, y: 16 } : false}
              whileInView={animate ? { opacity: 1, y: 0 } : undefined}
              viewport={{ once: true, amount: 0.6 }}
              transition={{ duration: 0.6, ease: ease.out, delay: 0.05 }}
              className="pt-1"
            >
              <div className="flex flex-wrap items-center gap-3">
                <span className="label-tight text-ink-faint">
                  {kind === "user" ? "Step" : "Value"} {String(i + 1).padStart(2, "0")}
                </span>
                {surface && (
                  <span className={`label-tight ${a.text}`}>{surface.label}</span>
                )}
              </div>
              <h3 className="mt-2 font-display text-xl text-ink sm:text-2xl">
                {step.title}
              </h3>
              <p className="mt-2 max-w-xl text-[0.95rem] leading-relaxed text-ink-soft">
                {step.detail}
              </p>
            </motion.div>
          </li>
        );
      })}
    </ol>
  );
}
