"use client";

import Link from "next/link";
import type { Strategy } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";
import DecryptedText from "@/components/reactbits/DecryptedText";

/**
 * College holds one concept: TreeHacks, the flagship. Not a card, an editorial
 * line on the page. The title sits plain until you move onto it, then it
 * scrambles and resolves (DecryptedText), so the feature reads as a text
 * transition rather than a boxed panel.
 */
export function FlagshipFeature({ strategy }: { strategy: Strategy }) {
  return (
    <section className="container-x relative py-24 sm:py-36">
      <Reveal className="mb-10 flex items-baseline justify-between gap-6">
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
          className="cursor-target group block max-w-5xl"
        >
          <div className="flex items-center gap-3">
            <span className="inline-block h-2 w-2 rounded-full bg-college shadow-[0_0_18px_-2px_var(--color-college)]" />
            <span className="label-tight text-ink-dim">{strategy.status}</span>
          </div>

          <h2 className="mt-7 max-w-4xl">
            <DecryptedText
              text={strategy.shortTitle}
              animateOn="hover"
              sequential
              speed={34}
              maxIterations={14}
              revealDirection="start"
              parentClassName="text-display leading-[0.98] text-ink [font-size:clamp(2.7rem,7.2vw,6rem)]"
              className="text-ink transition-colors"
              encryptedClassName="text-college/55"
            />
          </h2>

          <div className="mt-9 flex flex-wrap items-center gap-x-10 gap-y-4">
            <p className="max-w-md text-sm text-ink-dim sm:text-base">
              In the room, on their phone, and the weeks after.
            </p>
            <span className="ml-auto flex items-center gap-2 text-sm text-ink-soft transition-colors duration-300 group-hover:text-college">
              Open the concept
              <AnimatedArrow className="text-college" />
            </span>
          </div>
        </Link>
      </Reveal>

      <div className="hairline mt-16 max-w-5xl opacity-60" />
    </section>
  );
}
