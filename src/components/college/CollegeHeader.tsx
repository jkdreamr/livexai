"use client";

import dynamic from "next/dynamic";
import { useIsMobile, useMounted, useReducedMotion } from "@/lib/hooks";
import DecryptedText from "@/components/reactbits/DecryptedText";
import { RotatingText } from "@/components/reactbits/RotatingText";
import GradualBlur from "@/components/reactbits/GradualBlur";
import { AuroraBackground } from "@/components/atmosphere/AuroraBackground";

const GhostCursor = dynamic(
  () => import("@/components/reactbits/GhostCursor"),
  { ssr: false }
);

/**
 * College world header - "Campus & Builder Motion".
 * Background is a flowing cyan aurora (distinct from the landing's liquid
 * metal). The name pairs "College" with a rotating noun - students / builders
 * / events / classes - plus a GhostCursor presence and a DecryptedText eyebrow.
 */
export function CollegeHeader() {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const isMobile = useIsMobile();
  const showGhost = mounted && !reduced && !isMobile;

  return (
    <header className="screen relative flex flex-col items-center justify-center overflow-hidden">
      <AuroraBackground />

      {showGhost && (
        <GhostCursor
          color="#7fead1"
          brightness={0.9}
          bloomStrength={0.14}
          trailLength={44}
          zIndex={0}
        />
      )}

      <div className="relative z-10 flex w-full max-w-5xl flex-col items-center px-6 text-center">
        <DecryptedText
          text="COLLEGE · CAMPUS & BUILDER MOTION"
          animateOn="view"
          sequential
          speed={34}
          parentClassName="label text-college"
        />

        <div
          className="text-display mt-8 flex flex-wrap items-baseline justify-center gap-x-5 gap-y-1 leading-[1.02]"
          style={{ fontSize: "clamp(2.6rem, 7.5vw, 6rem)" }}
        >
          <span className="text-ink">College</span>
          <RotatingText
            texts={["students", "builders", "events", "classes"]}
            mainClassName="text-college"
            splitLevelClassName="pb-2"
            staggerFrom="last"
            rotationInterval={2200}
          />
        </div>
      </div>

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
