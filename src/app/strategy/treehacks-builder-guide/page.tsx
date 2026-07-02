import type { Metadata } from "next";
import { getStrategyBySlug, getRelatedStrategies } from "@/data/strategies";
import type { SuccessSignal } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/strategy/Section";
import { SurfaceTransfer } from "@/components/strategy/SurfaceTransfer";
import { SignalFlywheel } from "@/components/strategy/SignalFlywheel";
import { MetricHypotheses } from "@/components/strategy/MetricHypotheses";
import { NextMove } from "@/components/strategy/NextMove";
import { RelatedStrategies } from "@/components/strategy/RelatedStrategies";
import { TreeHacksHero } from "@/components/treehacks/TreeHacksHero";
import { ArrivalSignal } from "@/components/treehacks/ArrivalSignal";

const strategy = getStrategyBySlug("treehacks-builder-guide")!;

export const metadata: Metadata = {
  title: "TreeHacks × LiveX AI — The Builder Guide · Concept activation",
  description: strategy.oneLineThesis,
};

const FLYWHEEL = [
  "Stronger attendee experience",
  "Sponsor discovery",
  "LiveX product awareness",
  "High-quality opt-in engagement",
  "Demo / pilot interest",
  "Post-event content",
  "Future builder community",
  "Physical-to-digital proof",
];

const RETURN_MOMENTS = [
  { label: "Workshop reminder", detail: "Ten minutes before the session you saved — with the room." },
  { label: "Demo practice", detail: "Before judging, a prompt to rehearse. Same guide, same context." },
  { label: "Showcase guide", detail: "A route through the final demos worth seeing, tuned to your track." },
  { label: "After the event", detail: "An invitation to keep building. The relationship doesn't end Sunday." },
];

const CHECKIN_SIGNALS: SuccessSignal[] = [
  { signal: "Check-in completion time", reads: "Arrival → oriented, against the baseline of a normal queue." },
  { signal: "Self-service check-in rate", reads: "Share who complete without staff — the augmentation working." },
  { signal: "Staff-assistance rate", reads: "How often the human fallback is used — a load to plan for, not a failure." },
  { signal: "Registration issue-routing rate", reads: "Edge cases cleanly routed to staff instead of stalling a line." },
  { signal: "Post-check-in guide engagement", reads: "Do attendees keep interacting after 'you're in'?" },
  { signal: "First-action selection rate", reads: "Share who choose a first move rather than drifting off." },
  { signal: "QR-to-mobile continuation", reads: "The core proof: arrival state survives onto the phone." },
  { signal: "Reported arrival clarity", reads: "Qualitative — did arrival feel calmer and clearer?" },
  { signal: "Organizer staff-workload signal", reads: "Qualitative — did routine load drop at peak times?" },
  { signal: "Discovery actions after check-in", reads: "Sponsor and programming discovery driven by orientation." },
];

export default function TreeHacksPage() {
  const related = getRelatedStrategies(strategy);
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

      {/* Arrival & check-in — the interactive centerpiece */}
      <Section
        index="01"
        label="Arrival & check-in · You're in"
        accent="college"
        title="The first practical LiveX moment"
        intro="Check-in becomes orientation. LiveX wraps an existing registration and QR-pass flow — it doesn't replace it, and it never holds sensitive data alone."
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

      {/* Flywheel */}
      <Section
        index="04"
        label="Event → pipeline flywheel"
        accent="college"
        title="One arrival, many outcomes"
        intro="No projected numbers — the shape of the compounding value, and the signals worth watching."
      >
        <SignalFlywheel hub="arrival" nodes={FLYWHEEL} accent="college" />
      </Section>

      {/* Measurement */}
      <Section
        index="05"
        label="Measurement hypotheses"
        accent="college"
        title="What we'd watch"
      >
        <MetricHypotheses signals={CHECKIN_SIGNALS} accent="college" />
      </Section>

      {/* Organizer value */}
      <Section
        index="06"
        label="Organizer & sponsor value"
        accent="college"
        title="Why the event cares"
      >
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-3">
          {strategy.partnerJourney.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.06}>
              <div className="flex h-full flex-col gap-3 bg-void p-6 sm:p-8">
                <span className="label-tight text-ink-faint">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="font-display text-lg text-ink">{p.title}</h3>
                <p className="text-sm leading-relaxed text-ink-soft">{p.detail}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </Section>

      {/* Risks */}
      <Section
        index="07"
        label="Risks & dependencies"
        accent="college"
        title="What has to be true"
      >
        <ul className="divide-y divide-line border-y border-line">
          {strategy.risksAndDependencies.map((r, i) => (
            <Reveal key={i}>
              <li className="grid gap-4 py-7 sm:grid-cols-2 sm:gap-10">
                <p className="text-[0.95rem] text-ink">{r.risk}</p>
                <p className="text-[0.95rem] text-ink-soft">{r.mitigation}</p>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Next move */}
      <section className="container-x pb-24 pt-4">
        <NextMove next={strategy.nextStep} accent="college" />
      </section>

      {related.length > 0 && (
        <Section index="08" label="Adjacent paths" accent="college">
          <RelatedStrategies items={related} />
        </Section>
      )}
    </article>
  );
}
