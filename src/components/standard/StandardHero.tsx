"use client";

import { motion } from "framer-motion";
import { WORLDS } from "@/data/types";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import DecryptedText from "@/components/reactbits/DecryptedText";

/**
 * Standard hero — spare and weighted. A mono eyebrow decrypts into view, the
 * world name resolves out of a blur, and a single line names the intent. No
 * dashboards, no chips. The stillness is the point.
 */
export function StandardHero() {
  const world = WORLDS.standard;
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduced;

  return (
    <header className="container-x relative flex min-h-[86svh] flex-col justify-center pb-16 pt-28 sm:min-h-[90svh]">
      {/* One warm architectural light, held to the left margin */}
      <div
        aria-hidden
        className="haze -z-10 [background:radial-gradient(70%_60%_at_18%_42%,rgba(234,173,120,0.12),transparent_60%)]"
      />

      <div className="max-w-4xl">
        <DecryptedText
          text="STANDARD · FIELD MAP"
          animateOn="view"
          sequential
          speed={34}
          parentClassName="label text-standard/80"
        />

        <motion.h1
          className="text-display fluid-hero mt-10 text-ink"
          initial={animate ? { opacity: 0, filter: "blur(16px)", y: 10 } : false}
          animate={animate ? { opacity: 1, filter: "blur(0px)", y: 0 } : undefined}
          transition={{ duration: 1.1, ease: ease.out, delay: 0.15 }}
        >
          {world.name}
        </motion.h1>

        <motion.p
          className="text-display fluid-h3 mt-8 max-w-2xl text-balance text-ink-soft"
          initial={animate ? { opacity: 0, y: 16 } : false}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: ease.out, delay: 0.5 }}
        >
          {world.headline}
        </motion.p>

        <motion.div
          className="mt-10 flex items-center gap-4"
          initial={animate ? { opacity: 0 } : false}
          animate={animate ? { opacity: 1 } : undefined}
          transition={{ duration: 0.8, ease: ease.out, delay: 0.75 }}
        >
          <span className="h-px w-10 bg-standard/50" aria-hidden />
          <span className="label-tight text-ink-dim">{world.subtitle}</span>
        </motion.div>
      </div>
    </header>
  );
}
