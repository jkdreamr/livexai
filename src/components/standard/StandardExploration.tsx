"use client";

import Link from "next/link";
import { WORLDS } from "@/data/types";
import { Terminal } from "@/components/skiper/Terminal";
import { Typewriter } from "@/components/skiper/Typewriter";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";
import DecryptedText from "@/components/reactbits/DecryptedText";
import GradualBlur from "@/components/reactbits/GradualBlur";

/**
 * Standard currently has zero published concepts. Rather than inventing fake
 * partnerships, this is an honest, effect-rich "field open" state: a Terminal
 * typing an awaiting-concepts session and a Typewriter cycling illustrative
 * commercial-motion directions (clearly framed as exploration only).
 */
export function StandardExploration() {
  const meta = WORLDS.standard;

  return (
    <section className="relative">
      <div className="container-x py-24 sm:py-32">
        {/* Section eyebrow */}
        <DecryptedText
          text="FIELD STATUS · OPEN"
          animateOn="view"
          sequential
          speed={28}
          parentClassName="label text-standard/70"
        />

        <h2 className="text-display fluid-h2 mt-6 max-w-2xl text-balance text-ink">
          No concepts committed yet. The field is being mapped.
        </h2>

        <p className="body-measure mt-6 max-w-xl text-ink-dim">
          {meta.longThesis}
        </p>

        {/* Effect-rich pairing: terminal session + illustrative directions */}
        <div className="mt-16 grid gap-8 lg:grid-cols-[1.15fr_1fr] lg:items-start">
          <Terminal
            title="livex · standard · field"
            typingSpeed={38}
            delayBetweenCommands={1100}
            commands={[
              "livex field --world standard --status",
              "livex concepts --world standard --list",
              "livex field --await",
            ]}
            outputs={{
              0: [
                "world      standard · partner & field motion",
                "temperament  deliberate · high-conviction · commercial",
                "surfaces     physical → handoff → mobile → partner",
              ],
              1: ["0 concepts published.", "field open for high-conviction activations."],
              2: [
                "listening for the first commercial motion…",
                "concepts will appear here as they earn conviction.",
              ],
            }}
          />

          <div className="panel-inset p-6 sm:p-7">
            <p className="label-tight text-ink-faint">
              Illustrative directions, not concepts
            </p>
            <div className="text-display mt-5 min-h-[3.2em] text-2xl leading-snug text-ink sm:text-[1.7rem]">
              <Typewriter
                texts={[
                  "A venue moment that becomes measurable pipeline.",
                  "A creator handoff that carries live intent.",
                  "An operator floor turned distribution surface.",
                  "An enterprise field turned into repeatable proof.",
                ]}
                typingSpeed={44}
                deletingSpeed={22}
                pause={1900}
                loop
              />
            </div>
            <p className="mt-6 text-sm leading-relaxed text-ink-dim">
              These are directions under exploration, not committed work. Nothing
              here implies a signed partnership. Each would have to earn its place
              on this map.
            </p>
          </div>
        </div>

        {/* Honest closing note + path onward */}
        <div className="mt-16 flex flex-col gap-4 border-t border-line pt-10 sm:flex-row sm:items-end sm:justify-between">
          <p className="label-tight max-w-md text-ink-faint">
            This motion is open. Published concepts will appear here as the field
            is mapped and conviction is earned.
          </p>
          <Link
            href="/college"
            aria-label="See a world with a published concept · College"
            className="cursor-target group inline-flex items-center gap-2 self-start text-standard sm:self-auto"
          >
            <span className="label-tight text-ink-soft transition-colors group-hover:text-ink">
              See a mapped world · College
            </span>
            <AnimatedArrow className="text-standard" />
          </Link>
        </div>
      </div>

      {/* Keep the effect language going into the outro */}
      <GradualBlur
        target="parent"
        position="bottom"
        height="6rem"
        strength={1.6}
        divCount={4}
        curve="bezier"
      />
    </section>
  );
}
