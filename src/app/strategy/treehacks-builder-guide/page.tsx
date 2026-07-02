import type { Metadata } from "next";
import Link from "next/link";
import { getStrategyBySlug } from "@/data/strategies";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/strategy/Section";
import { SurfaceTransfer } from "@/components/strategy/SurfaceTransfer";
import { TreeHacksHero } from "@/components/treehacks/TreeHacksHero";
import { ArrivalSignal } from "@/components/treehacks/ArrivalSignal";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";

const strategy = getStrategyBySlug("treehacks-builder-guide")!;

export const metadata: Metadata = {
  title: "TreeHacks × LiveX AI — The Builder Guide · Concept activation",
  description: strategy.oneLineThesis,
};

const RETURN_MOMENTS = [
  { label: "Workshop reminder", detail: "Ten minutes before the session you saved — with the room." },
  { label: "Demo practice", detail: "Before judging, a prompt to rehearse. Same guide, same context." },
  { label: "Showcase guide", detail: "A route through the final demos worth seeing, tuned to your track." },
  { label: "After the event", detail: "An invitation to keep building. The relationship doesn't end Sunday." },
];

export default function TreeHacksPage() {
  const brand = strategy.brand!;

  return (
    <article
      // Rebrand every college-accented element on this page to the event
      // palette by overriding the CSS variable at the root.
      style={
        {
          "--color-college": brand.accent,
          "--color-college-deep": brand.accentDeep,
        } as React.CSSProperties
      }
    >
      <TreeHacksHero accent={brand.accent} brandName={brand.name} />

      {/* The moment */}
      <section className="container-reading py-24 text-center sm:py-32">
        <Reveal>
          <p className="text-display fluid-h2 text-balance">
            The point isn&apos;t a hologram at an event. It&apos;s a guide that
            remembers you — from the door to your phone to the weeks after.
          </p>
        </Reveal>
      </section>

      {/* Arrival & check-in — the interactive demo */}
      <Section
        index="01"
        label="Arrival & check-in · You're in"
        accent="college"
        title="The first practical LiveX moment"
        intro="Check-in becomes orientation. LiveX wraps an existing registration and QR-pass flow — it doesn't replace it, and it never holds sensitive data alone. Try it."
        bleed
      >
        <ArrivalSignal accent={brand.accent} />
      </Section>

      {/* Physical → QR → mobile */}
      <Section
        index="02"
        label="Physical → QR → mobile"
        accent="college"
        title="The handoff, with context intact"
        intro="A signal leaves the guide, resolves into a scan, and re-materialises on the phone — carrying the intent the attendee just set."
      >
        <SurfaceTransfer
          accent="college"
          intent="Build an idea"
          context="Your build signal is ready on your phone"
        />
      </Section>

      {/* Return moments */}
      <Section
        index="03"
        label="Return moments"
        accent="college"
        title="The same context, later"
      >
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
          {RETURN_MOMENTS.map((m, i) => (
            <Reveal key={m.label} delay={(i % 2) * 0.06}>
              <li className="flex h-full flex-col gap-2 bg-void p-6 sm:p-8">
                <div className="flex items-center gap-2.5">
                  <span className="size-1.5 rounded-full bg-college" />
                  <h3 className="font-display text-lg text-ink">{m.label}</h3>
                </div>
                <p className="text-sm leading-relaxed text-ink-soft">{m.detail}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* The case lives in Docs */}
      <section className="container-x pb-28 pt-8">
        <Reveal>
          <Link
            href="/docs#treehacks"
            className="cursor-target group flex flex-col gap-4 rounded-2xl border border-line bg-charcoal p-8 transition-colors hover:border-line-strong sm:flex-row sm:items-center sm:justify-between sm:p-10"
          >
            <div>
              <p className="label text-college">The case for TreeHacks</p>
              <p className="mt-3 max-w-2xl text-lg leading-relaxed text-ink-soft">
                Why it fits, sponsorship directions, measurement hypotheses, and
                point of contact — kept in the docs, alongside the rest of the
                thinking.
              </p>
            </div>
            <span className="text-ink-dim">
              <AnimatedArrow />
            </span>
          </Link>
        </Reveal>
      </section>
    </article>
  );
}
