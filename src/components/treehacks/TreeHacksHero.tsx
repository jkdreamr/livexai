"use client";

import dynamic from "next/dynamic";
import TextPressure from "@/components/reactbits/TextPressure";
import GradualBlur from "@/components/reactbits/GradualBlur";
import { StatusTag } from "@/components/ui/StatusTag";
import { useIsMobile, useReducedMotion } from "@/lib/hooks";

const GhostCursor = dynamic(
  () => import("@/components/reactbits/GhostCursor"),
  { ssr: false }
);

/** Original, stylized evergreen mark - an illustrative nod, not a reproduction
 *  of any real event logo. */
function TreeMark({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 40 44" width="34" height="38" aria-hidden fill="none">
      <path d="M20 3 L31 18 H24 L33 31 H23 V40 H17 V31 H7 L16 18 H9 Z" fill={color} opacity="0.9" />
    </svg>
  );
}

export function TreeHacksHero({
  accent = "#42c58a",
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
        <div className="flex flex-wrap items-center justify-center gap-3">
          <StatusTag status="Concept activation" />
          <span className="label-tight text-ink-faint">Illustrative event integration</span>
        </div>

        <div className="mt-9 flex items-center gap-3">
          <TreeMark color={accent} />
          <span className="label text-ink-dim">{brandName} × LiveX AI</span>
        </div>

        <div className="mt-6 h-[16vh] w-full max-w-4xl sm:h-[20vh]">
          <TextPressure
            text="TREEHACKS"
            fontFamily="var(--font-sans)"
            weight
            width={false}
            italic={false}
            textColor="#eceef3"
            minFontSize={44}
          />
        </div>

        <p className="text-display fluid-h3 mt-6 italic text-ink-soft">
          &ldquo;What are you here to build?&rdquo;
        </p>
      </div>

      <GradualBlur target="parent" position="bottom" height="8rem" strength={2} divCount={6} curve="bezier" />
    </header>
  );
}
