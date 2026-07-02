"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Strategy } from "@/data/types";
import { WORLDS, SURFACES } from "@/data/types";
import { StatusTag } from "@/components/ui/StatusTag";
import { SurfaceChip } from "@/components/ui/Surface";
import { StrategyBackdrop } from "./StrategyBackdrop";
import { THEME, accentClasses } from "./theme";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";

export function StrategyHero({ strategy }: { strategy: Strategy }) {
  const world = WORLDS[strategy.world];
  const { accent } = THEME[strategy.visualTheme];
  const a = accentClasses(accent);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduced;

  const surfaces = [
    strategy.primarySurface,
    ...strategy.connectedSurfaces.filter((s) => s !== strategy.primarySurface),
  ];

  const rise = (i: number) =>
    animate
      ? {
          initial: { opacity: 0, y: 20 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.8, ease: ease.out, delay: 0.1 + i * 0.09 },
        }
      : {};

  return (
    <header className="relative isolate flex min-h-[88vh] flex-col justify-end overflow-hidden">
      <StrategyBackdrop theme={strategy.visualTheme} />

      <div className="container-x relative z-10 w-full pb-16 pt-32 sm:pb-24">
        <motion.div {...rise(0)}>
          <Link
            href={world.href}
            className="group inline-flex items-center gap-2 label text-ink-dim transition-colors hover:text-ink"
          >
            <span aria-hidden className="transition-transform group-hover:-translate-x-1">
              ←
            </span>
            {world.name} · {world.subtitle}
          </Link>
        </motion.div>

        <motion.div {...rise(1)} className="mt-8 flex flex-wrap items-center gap-3">
          <StatusTag status={strategy.status} />
          <span className={`label-tight ${a.text}`}>{THEME[strategy.visualTheme].note}</span>
        </motion.div>

        <motion.h1
          {...(animate
            ? {
                initial: { opacity: 0, y: 26, filter: "blur(14px)" },
                animate: { opacity: 1, y: 0, filter: "blur(0px)" },
                transition: { duration: 1.1, ease: ease.out, delay: 0.24 },
              }
            : {})}
          className="text-display fluid-h1 mt-6 max-w-5xl text-balance"
        >
          {strategy.title}
        </motion.h1>

        <motion.p
          {...rise(4)}
          className="body-measure fluid-lead mt-8 max-w-2xl text-ink-soft"
        >
          {strategy.oneLineThesis}
        </motion.p>

        <motion.div {...rise(5)} className="mt-10 flex flex-wrap items-center gap-2">
          {surfaces.map((s, i) => (
            <SurfaceChip key={s} surface={s} primary={i === 0} />
          ))}
        </motion.div>

        <motion.p
          {...rise(6)}
          className="mt-8 max-w-xl text-sm leading-relaxed text-ink-dim"
        >
          <span className="text-ink-soft">Primary surface — </span>
          {SURFACES[strategy.primarySurface].description}
        </motion.p>
      </div>
    </header>
  );
}
