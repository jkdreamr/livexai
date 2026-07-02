"use client";

import Link from "next/link";
import type { Strategy } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";
import DecryptedText from "@/components/reactbits/DecryptedText";
import { SURFACES } from "@/data/types";

/**
 * College currently holds one concept: TreeHacks, the flagship. Presented as a
 * single confident editorial feature — not a sparse list — that links to the
 * full strategy. Effects continue throughout: a DecryptedText micro-label, a
 * scroll reveal, and an AnimatedArrow that resolves on hover.
 */
export function FlagshipFeature({ strategy }: { strategy: Strategy }) {
  const surfaces = strategy.connectedSurfaces;

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
          className="cursor-target group relative block overflow-hidden rounded-3xl border border-line bg-charcoal/40 p-8 transition-colors duration-500 hover:border-college/40 sm:p-14"
        >
          {/* Cyan-mint bloom that warms on hover */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-college/10 opacity-40 blur-3xl transition-opacity duration-700 group-hover:opacity-80"
          />

          <div className="relative flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-college shadow-[0_0_18px_-2px_var(--color-college)]" />
            <span className="label-tight text-ink-dim">{strategy.status}</span>
          </div>

          <h2 className="text-display fluid-h1 relative mt-8 max-w-4xl leading-[1.02] text-ink">
            {strategy.shortTitle}
          </h2>

          <p className="body-measure relative mt-8 text-base text-ink-soft sm:text-lg">
            {strategy.oneLineThesis}
          </p>

          <div className="relative mt-12 flex flex-wrap items-center gap-x-8 gap-y-6">
            {/* Surface glyphs — the arc this concept travels */}
            <ul
              aria-label="Surfaces this concept spans"
              className="flex items-center gap-5 text-ink-dim transition-colors duration-500 group-hover:text-college"
            >
              {surfaces.map((s) => (
                <li key={s} className="flex flex-col items-center gap-2">
                  <SurfaceGlyph surface={s} size={24} />
                  <span className="label-tight text-ink-faint">
                    {SURFACES[s].short}
                  </span>
                </li>
              ))}
            </ul>

            <span className="ml-auto flex items-center gap-2 text-sm text-ink-soft transition-colors duration-300 group-hover:text-college">
              Open the concept
              <AnimatedArrow className="text-college" />
            </span>
          </div>
        </Link>
      </Reveal>
    </section>
  );
}
