"use client";

import { motion } from "framer-motion";
import type { WorldMeta, SurfaceKey, VisualTheme } from "@/data/types";
import { StrategyBackdrop } from "@/components/strategy/StrategyBackdrop";
import { SurfaceChip } from "@/components/ui/Surface";
import { accentClasses, type Accent } from "@/components/strategy/theme";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

export function WorldHero({
  world,
  count,
  surfaces,
  accent,
}: {
  world: WorldMeta;
  count: number;
  surfaces: SurfaceKey[];
  accent: Accent;
}) {
  const a = accentClasses(accent);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const on = mounted && !reduced;
  const theme: VisualTheme = accent === "college" ? "constellation" : "concourse";

  const rise = (i: number) =>
    on
      ? {
          initial: { opacity: 0, y: 22 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, ease: ease.out, delay: 0.08 + i * 0.09 },
        }
      : {};

  return (
    <header className="relative isolate flex min-h-[82vh] flex-col justify-center overflow-hidden pt-24">
      <StrategyBackdrop theme={theme} />

      <div className="container-x relative z-10">
        <motion.div {...rise(0)} className="flex flex-wrap items-center gap-4">
          <span className={`label ${a.text}`}>{world.subtitle}</span>
          <span aria-hidden className="h-3 w-px bg-line-strong" />
          <span className="label text-ink-dim">
            {count} active {count === 1 ? "concept" : "concepts"}
          </span>
        </motion.div>

        <motion.h1
          {...(on
            ? {
                initial: { opacity: 0, y: 30, filter: "blur(16px)" },
                animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                transition: { duration: 1.1, ease: ease.out, delay: 0.18 },
              }
            : {})}
          className="text-display fluid-hero mt-6"
        >
          {world.name}
        </motion.h1>

        <motion.p
          {...rise(3)}
          className="text-display fluid-h3 mt-3 max-w-2xl italic text-ink-soft"
        >
          {world.headline}
        </motion.p>

        <motion.p
          {...rise(4)}
          className="body-measure mt-8 max-w-2xl text-ink-soft"
        >
          {world.longThesis}
        </motion.p>

        <motion.div {...rise(5)} className="mt-10 flex flex-wrap items-center gap-2">
          {surfaces.map((s) => (
            <SurfaceChip key={s} surface={s} />
          ))}
        </motion.div>
      </div>
    </header>
  );
}
