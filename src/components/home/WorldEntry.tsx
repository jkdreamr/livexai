"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import type { World } from "@/data/types";
import { WORLDS } from "@/data/types";
import { useIsMobile, useMounted, useReducedMotion } from "@/lib/hooks";
import DecryptedText from "@/components/reactbits/DecryptedText";
import TrueFocus from "@/components/reactbits/TrueFocus";
import GradualBlur from "@/components/reactbits/GradualBlur";

const LiquidChrome = dynamic(
  () => import("@/components/reactbits/LiquidChrome").then((m) => m.LiquidChrome),
  { ssr: false }
);

export function WorldEntry() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const showShader = mounted && !reduced;
  const router = useRouter();
  const [entering, setEntering] = useState<World | null>(null);

  const go = (world: World) => (e: React.MouseEvent) => {
    if (reduced) return;
    e.preventDefault();
    setEntering(world);
    window.setTimeout(() => router.push(WORLDS[world].href), 360);
  };

  return (
    <section className="screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Restrained living shader */}
      {showShader && (
        <div aria-hidden className="absolute inset-0 z-0 opacity-[0.5]">
          <LiquidChrome
            baseColor={[0.05, 0.035, 0.33]}
            speed={0.3}
            amplitude={0.3}
            frequencyX={2.6}
            frequencyY={2}
            interactive={!isMobile}
          />
        </div>
      )}
      {/* Veil the shader into the void so it stays quiet */}
      <div
        aria-hidden
        className="absolute inset-0 z-0 [background:radial-gradient(120%_95%_at_50%_50%,transparent_28%,rgba(7,9,16,0.72)_66%,var(--color-void))]"
      />

      {/* Hero */}
      <div className="relative z-10 flex flex-col items-center px-6 text-center">
        <DecryptedText
          text="LIVEX AI"
          animateOn="view"
          sequential
          speed={38}
          parentClassName="label text-ink-dim"
        />

        <div className="text-display fluid-h1 mt-8 max-w-3xl leading-[1.04] text-ink">
          <TrueFocus
            sentence="One agent, every surface"
            blurAmount={4}
            borderColor="#2f80ff"
            glowColor="rgba(0,102,255,0.5)"
            animationDuration={0.55}
            pauseBetweenAnimations={1.5}
          />
        </div>

        <div className="mt-16 flex items-center gap-8 sm:mt-20 sm:gap-14">
          <PathLink world="college" onEnter={go("college")} />
          <div aria-hidden className="h-14 w-px bg-line-strong" />
          <PathLink world="standard" onEnter={go("standard")} />
        </div>
      </div>

      {/* Premium bottom fade */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
      />

      {/* Enter fade */}
      <AnimatePresence>
        {entering && (
          <motion.div
            className="pointer-events-none fixed inset-0 z-40"
            style={{ background: "var(--color-void)" }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.32 }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function PathLink({
  world,
  onEnter,
}: {
  world: World;
  onEnter: (e: React.MouseEvent) => void;
}) {
  const meta = WORLDS[world];
  return (
    <Link
      href={meta.href}
      onClick={onEnter}
      aria-label={`Enter the ${meta.name} world · ${meta.subtitle}`}
      className="cursor-target group flex flex-col items-center gap-2 px-3 py-2 outline-none"
    >
      <span className="text-display text-2xl text-ink opacity-90 transition-opacity duration-300 group-hover:opacity-100 sm:text-3xl">
        {meta.name}
      </span>
      <span className="label-tight text-ink-faint transition-colors duration-300 group-hover:text-ink-dim">
        {meta.subtitle}
      </span>
    </Link>
  );
}
