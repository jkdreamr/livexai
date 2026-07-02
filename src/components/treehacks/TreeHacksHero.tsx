"use client";

import dynamic from "next/dynamic";
import TextPressure from "@/components/reactbits/TextPressure";
import GradualBlur from "@/components/reactbits/GradualBlur";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";

const GhostCursor = dynamic(
  () => import("@/components/reactbits/GhostCursor"),
  { ssr: false }
);

export function TreeHacksHero({
  accent = "#2fe08a",
  brandName = "TreeHacks",
}: {
  accent?: string;
  brandName?: string;
}) {
  const reduced = useReducedMotion();
  const isMobile = useIsMobile();
  const showGhost = !reduced && !isMobile;

  return (
    <header className="screen relative flex flex-col items-center justify-center overflow-hidden">
      {showGhost && (
        <GhostCursor
          color={accent}
          brightness={1.15}
          bloomStrength={0.22}
          bloomRadius={1}
          bloomThreshold={0.02}
          grainIntensity={0.04}
          trailLength={46}
          zIndex={0}
        />
      )}
      <div
        aria-hidden
        className="absolute inset-0 z-0"
        style={{
          background: `radial-gradient(80% 70% at 50% 45%, ${accent}0f, transparent 60%)`,
        }}
      />

      <div className="relative z-10 flex w-full flex-col items-center px-6 text-center">
        <div className="flex items-center gap-3 sm:gap-4">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/livex-logo.svg" alt="LiveX AI" className="h-7 w-auto sm:h-8" />
          <span className="text-lg font-light text-ink-faint">&times;</span>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/treehacks-logo.webp" alt="" className="h-9 w-auto sm:h-10" />
          <span className="label text-ink-dim">{brandName}</span>
        </div>

        <div className="mt-12 flex h-[clamp(84px,17vw,172px)] w-[80%] max-w-[42rem] items-center justify-center">
          <TextPressure
            text="TREEHACKS"
            fontFamily="var(--font-sans)"
            weight
            width={false}
            italic={false}
            flex={false}
            textColor="#eceef3"
            minFontSize={40}
          />
        </div>

        <p className="text-display fluid-h3 mt-12 italic text-ink-soft">
          &ldquo;What are you here to build?&rdquo;
        </p>
      </div>

      <GradualBlur target="parent" position="bottom" height="8rem" strength={2} divCount={6} curve="bezier" />
    </header>
  );
}
