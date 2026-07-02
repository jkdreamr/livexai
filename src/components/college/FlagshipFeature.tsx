"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import type { Strategy } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";
import DecryptedText from "@/components/reactbits/DecryptedText";
import { useMounted, useReducedMotion } from "@/lib/hooks";

/**
 * College currently holds one concept: TreeHacks, the flagship. A single
 * confident editorial card that links to the full strategy. Its backdrop is a
 * paper-design mesh-gradient shader that sits quiet, then surges to life when
 * you hover or focus the card. Reduced motion falls back to a static wash.
 */

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

const COLORS = ["#07080b", "#052a20", "#0f6b53", "#21c39a", "#7fead1"];

export function FlagshipFeature({ strategy }: { strategy: Strategy }) {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  return (
    <section className="container-x relative py-24 sm:py-32">
      <Reveal className="mb-12 flex items-baseline justify-between gap-6">
        <DecryptedText
          text="THE FLAGSHIP"
          animateOn="view"
          sequential
          speed={40}
          parentClassName="label text-college"
        />
        <span className="label-tight text-ink-faint">01 / 01</span>
      </Reveal>

      <Reveal delay={0.05}>
        <Link
          href={`/strategy/${strategy.slug}`}
          aria-label={`Open the ${strategy.shortTitle} concept`}
          className="cursor-target group relative block overflow-hidden rounded-3xl border border-line transition-colors duration-500 hover:border-college/50 focus-visible:border-college/50"
        >
          {/* Living shader backdrop, quiet until hover/focus */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 scale-100 opacity-35 transition-[opacity,transform] duration-[900ms] ease-out group-hover:scale-105 group-hover:opacity-90 group-focus-visible:scale-105 group-focus-visible:opacity-90"
          >
            {animate ? (
              <MeshGradient
                className="h-full w-full"
                colors={COLORS}
                distortion={0.8}
                swirl={0.7}
                speed={0.32}
                style={{ width: "100%", height: "100%" }}
              />
            ) : (
              <div
                className="h-full w-full"
                style={{
                  background:
                    "radial-gradient(120% 140% at 16% 14%, #0f6b53 0%, transparent 46%)," +
                    "radial-gradient(90% 120% at 90% 6%, #7fead1 0%, transparent 40%)," +
                    "radial-gradient(120% 120% at 62% 122%, #21c39a 0%, transparent 55%)," +
                    "#07080b",
                }}
              />
            )}
          </div>

          {/* Readability veil */}
          <div
            aria-hidden
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(180deg, rgba(7,8,11,0.62) 0%, rgba(7,8,11,0.78) 58%, rgba(7,8,11,0.92) 100%)",
            }}
          />

          <div className="relative p-8 sm:p-14">
            <div className="flex items-center gap-3">
              <span className="inline-block h-2 w-2 rounded-full bg-college shadow-[0_0_18px_-2px_var(--color-college)]" />
              <span className="label-tight text-ink-dim">{strategy.status}</span>
            </div>

            <h2 className="text-display fluid-h1 mt-8 max-w-4xl leading-[1.02] text-ink transition-colors duration-500 group-hover:text-white">
              {strategy.shortTitle}
            </h2>

            <div className="mt-10 flex items-center justify-between gap-6">
              <p className="text-sm text-ink-dim sm:text-base">
                In the room, on their phone, and the weeks after.
              </p>
              <span className="flex shrink-0 items-center gap-2 text-sm text-ink-soft transition-colors duration-300 group-hover:text-college">
                Open the concept
                <AnimatedArrow className="text-college" />
              </span>
            </div>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
