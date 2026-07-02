"use client";

import dynamic from "next/dynamic";
import { useIsMobile, useMounted, useReducedMotion } from "@/lib/hooks";
import DecryptedText from "@/components/reactbits/DecryptedText";
import TextPressure from "@/components/reactbits/TextPressure";
import TrueFocus from "@/components/reactbits/TrueFocus";
import GradualBlur from "@/components/reactbits/GradualBlur";

// Effects that touch WebGL / window must be client-only.
const GhostCursor = dynamic(
  () => import("@/components/reactbits/GhostCursor"),
  { ssr: false }
);
const LiquidChrome = dynamic(
  () => import("@/components/reactbits/LiquidChrome").then((m) => m.LiquidChrome),
  { ssr: false }
);

/**
 * College world header — "Campus & Builder Motion".
 *
 * Effect-rich but restrained: a dark LiquidChrome veil + a scoped GhostCursor
 * presence, a DecryptedText eyebrow, the world name via TextPressure, and a
 * short TrueFocus statement. A GradualBlur fades the whole thing into the page.
 * Heavy motion is gated on reduced-motion and simplified on touch/mobile.
 */
export function CollegeHeader() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();

  const showShader = mounted && !reduced;
  const showGhost = mounted && !reduced && !isMobile;

  return (
    <header className="screen relative flex flex-col items-center justify-center overflow-hidden">
      {/* Living shader, kept dark + veiled so it stays a presence, not a poster */}
      {showShader && (
        <div aria-hidden className="absolute inset-0 z-0 opacity-[0.5]">
          <LiquidChrome
            baseColor={[0.02, 0.06, 0.055]}
            speed={0.3}
            amplitude={0.34}
            frequencyX={2.4}
            frequencyY={2.2}
            interactive={!isMobile}
          />
        </div>
      )}

      {/* Scoped glowing pointer presence — cyan-mint, low bloom */}
      {showGhost && (
        <GhostCursor
          color="#7fead1"
          brightness={0.9}
          bloomStrength={0.14}
          trailLength={44}
          zIndex={0}
        />
      )}

      {/* Veil into the void so the header stays editorial */}
      <div
        aria-hidden
        className="absolute inset-0 z-[1] [background:radial-gradient(120%_95%_at_50%_42%,transparent_26%,rgba(6,10,9,0.74)_64%,var(--color-void))]"
      />

      <div className="relative z-10 flex w-full max-w-4xl flex-col items-center px-6 text-center">
        <DecryptedText
          text="COLLEGE · CAMPUS & BUILDER MOTION"
          animateOn="view"
          sequential
          speed={34}
          parentClassName="label text-college"
        />

        {/* World name — variable-weight, reacts to the cursor */}
        <div className="mt-8 h-[16vh] w-full sm:h-[20vh]">
          <TextPressure
            text="COLLEGE"
            fontFamily="var(--font-display)"
            weight
            width={false}
            italic={false}
            textColor="#f4f6f5"
            minFontSize={64}
          />
        </div>

        {/* A short focus statement — words blur/focus under a moving frame */}
        <div className="text-display fluid-h3 mt-4 max-w-2xl leading-[1.1] text-ink-soft">
          <TrueFocus
            sentence="Where builders gather"
            blurAmount={4}
            borderColor="#7fead1"
            glowColor="rgba(127,234,209,0.45)"
            animationDuration={0.55}
            pauseBetweenAnimations={1.6}
          />
        </div>

        <p className="body-measure mt-8 text-sm text-ink-dim sm:text-base">
          A LiveX interaction meets student builders in the room — then travels
          with them, from a physical moment into an ongoing relationship.
        </p>
      </div>

      {/* Fade the header into the page */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="7rem"
        strength={2}
        divCount={5}
        curve="bezier"
      />
    </header>
  );
}
