"use client";

import { motion } from "framer-motion";
import { WORLDS } from "@/data/types";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import DecryptedText from "@/components/reactbits/DecryptedText";
import TrueFocus from "@/components/reactbits/TrueFocus";

/**
 * College hero — radically spare. A decrypted eyebrow, one large focus-pulled
 * statement, and a single quiet line. Motion carries it; copy stays minimal.
 */
export function CollegeHero() {
  const world = WORLDS.college;
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const animate = mounted && !reduced;

  return (
    <header className="relative flex min-h-[62vh] flex-col justify-center overflow-hidden pt-28 pb-10 sm:min-h-[68vh] sm:pt-32">
      {/* Ambient college light — a single luminous wash */}
      <div aria-hidden className="haze">
        <div
          className={animate ? "will-drift" : undefined}
          style={{
            position: "absolute",
            left: "8%",
            top: "18%",
            width: "46%",
            height: "70%",
            background: "var(--color-college)",
            opacity: 0.1,
            filter: "blur(130px)",
            borderRadius: "9999px",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: "6%",
            bottom: "6%",
            width: "34%",
            height: "50%",
            background: "var(--color-college-deep)",
            opacity: 0.06,
            filter: "blur(120px)",
            borderRadius: "9999px",
          }}
        />
      </div>

      <div className="container-x relative z-10">
        <DecryptedText
          text="COLLEGE · WORLD 01"
          animateOn="view"
          sequential
          speed={42}
          parentClassName="label text-college/80"
        />

        {/* The world name, focus-pulled */}
        <div className="text-display fluid-hero mt-6 leading-[0.98] text-ink">
          {animate ? (
            <TrueFocus
              sentence="Living Campus Signal"
              blurAmount={5}
              borderColor="#7fead1"
              glowColor="rgba(127,234,209,0.5)"
              animationDuration={0.5}
              pauseBetweenAnimations={1.7}
            />
          ) : (
            <span>Living Campus Signal</span>
          )}
        </div>

        <motion.div
          className="mt-10 flex max-w-xl flex-col gap-3"
          initial={animate ? { opacity: 0, y: 18 } : false}
          animate={animate ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.9, ease: ease.out, delay: 0.35 }}
        >
          <p className="label-tight text-ink-dim">{world.subtitle}</p>
          <p className="text-display fluid-h3 text-ink-soft">{world.headline}</p>
        </motion.div>
      </div>
    </header>
  );
}
