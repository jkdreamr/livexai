"use client";

import dynamic from "next/dynamic";
import { WORLDS } from "@/data/types";
import { useIsMobile, useMounted, useReducedMotion } from "@/lib/hooks";
import DecryptedText from "@/components/reactbits/DecryptedText";
import TextPressure from "@/components/reactbits/TextPressure";
import GradualBlur from "@/components/reactbits/GradualBlur";
import { GridField } from "@/components/atmosphere/GridField";

const GhostCursor = dynamic(() => import("@/components/reactbits/GhostCursor"), {
  ssr: false,
});

/**
 * Standard world header - architectural, high-conviction, still.
 * Layers a very-restrained dark LiquidChrome veil + a scoped GhostCursor
 * presence behind a DecryptedText eyebrow and the world name via TextPressure.
 * A GradualBlur dissolves the header into the page below.
 */
export function StandardHeader() {
  const meta = WORLDS.standard;
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const showEffects = mounted && !reduced;

  return (
    <header className="screen relative flex flex-col justify-center overflow-hidden">
      {/* Architectural amber grid - structured, still, distinct from College */}
      <GridField />

      {/* Scoped glowing pointer presence - desktop only, restrained */}
      {showEffects && !isMobile && (
        <div aria-hidden className="absolute inset-0 z-0">
          <GhostCursor
            color="#eaad78"
            brightness={0.85}
            bloomStrength={0.08}
            trailLength={44}
            zIndex={0}
          />
        </div>
      )}

      <div className="container-x pointer-events-none relative z-10">
        <DecryptedText
          text="STANDARD · PARTNER & FIELD MOTION"
          animateOn="view"
          sequential
          speed={30}
          parentClassName="label text-standard/80"
        />

        <div className="mt-8 h-[16vh] min-h-[120px] max-w-[14ch]">
          <TextPressure
            text="STANDARD"
            fontFamily="var(--font-sans)"
            textColor="#f4ede4"
            weight
            width={false}
            italic={false}
            minFontSize={64}
          />
        </div>

        <p className="body-measure mt-6 max-w-xl text-balance text-ink-soft">
          {meta.headline}
        </p>
      </div>

      {/* Premium bottom fade into the page */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="9rem"
        strength={2.4}
        divCount={6}
        curve="bezier"
      />
    </header>
  );
}
