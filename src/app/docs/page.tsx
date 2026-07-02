import type { Metadata } from "next";
import Link from "next/link";
import { WORLDS, SURFACES } from "@/data/types";
import type { SurfaceKey, World } from "@/data/types";
import {
  STRATEGIES,
  getStrategiesByWorld,
  getStrategyBySlug,
} from "@/data/strategies";
import { Reveal } from "@/components/ui/Reveal";
import { Section } from "@/components/strategy/Section";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { MetricHypotheses } from "@/components/strategy/MetricHypotheses";
import { accentClasses } from "@/components/strategy/theme";
import { DocsEyebrow } from "@/components/docs/DocsEyebrow";
import { Terminal } from "@/components/skiper/Terminal";

const treehacks = getStrategyBySlug("treehacks-builder-guide")!;

export const metadata: Metadata = {
  title: "Docs — the thinking behind the map",
  description:
    "The product thesis, the two GTM motions, the surface model, and how a LiveX interaction is structured across the Surface Map.",
};

const SURFACE_ORDER: SurfaceKey[] = [
  "physical",
  "qr",
  "mobile",
  "web",
  "voice",
  "followup",
  "partner",
];

const SCHEMA = [
  { field: "world", note: "Which GTM motion it belongs to — college or standard." },
  { field: "status", note: "Readiness, shown verbatim: Concept, Exploration, Pilot hypothesis, Concept activation." },
  { field: "oneLineThesis", note: "The felt promise, in a sentence." },
  { field: "strategicQuestion", note: "The single question the concept is a bet on." },
  { field: "primary / connectedSurfaces", note: "Where the one intelligence appears, and how it travels." },
  { field: "user / partnerJourney", note: "What the attendee experiences; what the partner gains." },
  { field: "activationPlan", note: "How it gets built — a short operating sequence." },
  { field: "successSignals", note: "Measurement hypotheses. Signals to watch, never fabricated numbers." },
  { field: "nextStep", note: "The recommended next move, with a time horizon." },
];

export default function DocsPage() {
  return (
    <article>
      {/* Hero */}
      <header className="container-x flex min-h-[62vh] flex-col justify-center pt-24">
        <Reveal>
          <DocsEyebrow />
          <h1 className="text-display fluid-hero mt-6 max-w-3xl">Docs</h1>
          <p className="body-measure fluid-lead mt-8 max-w-2xl text-ink-soft">
            The thinking behind the Surface Map — the thesis, the two motions,
            and how a single LiveX interaction is structured so it can travel
            across physical space, mobile, web, voice, and everything after.
          </p>
        </Reveal>
      </header>

      {/* Thesis */}
      <Section index="01" label="Thesis">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr]">
          <Reveal>
            <p className="text-display fluid-h2 text-balance">
              One LiveX intelligence can appear across many surfaces — and carry
              its context between them.
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="body-measure text-ink-soft">
              The map exists to make one idea concrete: a physical encounter, a
              QR handoff, a phone, a voice, a follow-up weeks later — the same
              intelligence, remembering who you are. Every concept here is an
              internal hypothesis, held to four questions: who encounters it,
              what it feels like, why the partner cares, and what signal LiveX
              gains.
            </p>
          </Reveal>
        </div>
      </Section>

      {/* Two motions */}
      <Section index="02" label="Two motions">
        <div className="grid gap-px overflow-hidden rounded-lg border border-line bg-line md:grid-cols-2">
          {(Object.keys(WORLDS) as World[]).map((key) => {
            const w = WORLDS[key];
            const a = accentClasses(w.signal);
            return (
              <Reveal key={key}>
                <Link
                  href={w.href}
                  className="cursor-target group flex h-full flex-col gap-4 bg-void p-8 transition-colors hover:bg-white/[0.02]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`size-1.5 rounded-full ${a.dot}`} />
                    <span className={`label-tight ${a.text}`}>{w.subtitle}</span>
                  </div>
                  <h3 className="font-display text-3xl text-ink">{w.name}</h3>
                  <p className="body-measure text-sm text-ink-soft">{w.longThesis}</p>
                  <span className="mt-auto inline-flex items-center gap-2 pt-2 label-tight text-ink-dim transition-colors group-hover:text-ink">
                    Enter <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </span>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Section>

      {/* Surfaces */}
      <Section
        index="03"
        label="The surfaces"
        title="Where one intelligence can appear"
      >
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {SURFACE_ORDER.map((key, i) => {
            const s = SURFACES[key];
            return (
              <Reveal key={key} delay={(i % 3) * 0.05}>
                <li className="flex h-full flex-col gap-3 bg-void p-6">
                  <span className="grid size-10 place-items-center rounded-full border border-line-strong text-ink-soft">
                    <SurfaceGlyph surface={key} size={18} />
                  </span>
                  <h3 className="font-display text-lg text-ink">{s.label}</h3>
                  <p className="text-sm leading-relaxed text-ink-dim">{s.description}</p>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Schema */}
      <Section
        index="04"
        label="How a concept is structured"
        title="One schema, many ideas"
        intro="Every concept is one object in src/data/strategies.ts. Add a new idea there and it gets a world node, a detail page, and cross-links — no layout code changes."
      >
        <div className="grid gap-8 lg:grid-cols-[1.3fr_1fr] lg:items-start">
          <dl className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
            {SCHEMA.map((row, i) => (
              <Reveal key={row.field} delay={(i % 2) * 0.05}>
                <div className="flex h-full flex-col gap-2 bg-void p-6">
                  <dt className="font-mono text-sm text-ink">{row.field}</dt>
                  <dd className="text-sm leading-relaxed text-ink-dim">{row.note}</dd>
                </div>
              </Reveal>
            ))}
          </dl>
          <Reveal delay={0.1}>
            <Terminal
              commands={[
                "open src/data/strategies.ts",
                "append one { Strategy }",
                "npm run build",
              ]}
              outputs={{
                1: [
                  "→ node added to its world",
                  "→ /strategy/[slug] generated",
                  "→ related links wired",
                ],
                2: ["✓ compiled", "✓ concepts prerendered · static"],
              }}
            />
          </Reveal>
        </div>
      </Section>

      {/* The bar */}
      <Section index="05" label="The quality bar">
        <Reveal>
          <p className="text-display fluid-h3 max-w-4xl text-balance text-ink-soft">
            <Link href="/strategy/treehacks-builder-guide" className="cursor-target text-college underline-offset-4 hover:underline">
              TreeHacks
            </Link>{" "}
            sets the bar: an interactive, physical-to-mobile concept where the
            agent remembers context across surfaces. Every future concept should
            aim for that level of clarity and craft.
          </p>
        </Reveal>
      </Section>

      {/* TreeHacks — the case */}
      <div id="treehacks" className="scroll-mt-24" />
      <Section
        index="06"
        label="TreeHacks · the case"
        accent="college"
        title="Why this one, first"
        intro={treehacks.whyLiveX}
      >
        <div className="grid gap-12 lg:grid-cols-2">
          <Reveal>
            <div className="rounded-xl border border-line bg-charcoal p-7">
              <h3 className="font-display text-2xl text-college">Why now</h3>
              <p className="body-measure mt-4 text-ink-soft">{treehacks.whyNow}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div>
              <p className="label mb-4">Organizer &amp; sponsor value</p>
              <ul className="divide-y divide-line border-y border-line">
                {treehacks.partnerJourney.map((p) => (
                  <li key={p.id} className="py-4">
                    <p className="text-sm text-ink">{p.title}</p>
                    <p className="mt-1 text-sm text-ink-dim">{p.detail}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-16">
          <p className="label mb-6">Measurement hypotheses</p>
          <MetricHypotheses signals={treehacks.successSignals} accent="college" />
        </div>

        <div className="mt-16 grid gap-12 md:grid-cols-2">
          <Reveal>
            <div>
              <p className="label mb-4">Risks &amp; dependencies</p>
              <ul className="divide-y divide-line border-y border-line">
                {treehacks.risksAndDependencies.map((r, i) => (
                  <li key={i} className="py-4">
                    <p className="text-sm text-ink">{r.risk}</p>
                    <p className="mt-1 text-sm text-ink-dim">{r.mitigation}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex flex-col gap-6">
              <div>
                <p className="label mb-3 text-college">
                  Recommended next move · {treehacks.nextStep.horizon}
                </p>
                <p className="font-display text-xl text-ink">
                  {treehacks.nextStep.action}
                </p>
                <p className="mt-2 text-sm text-ink-soft">
                  {treehacks.nextStep.detail}
                </p>
              </div>
              <div className="rounded-xl border border-dashed border-line-strong p-6">
                <p className="label text-ink-dim">
                  Sponsorship directions · point of contact
                </p>
                <p className="mt-3 text-sm text-ink-faint">
                  To be added by the LiveX team — a placeholder for the
                  partnership case, sponsorship ideas, and the point of contact.
                </p>
              </div>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Index */}
      <Section index="07" label="All concepts">
        <div className="grid gap-12 md:grid-cols-2">
          {(Object.keys(WORLDS) as World[]).map((key) => (
            <Reveal key={key}>
              <div>
                <p className="label mb-4">{WORLDS[key].name}</p>
                <ul className="border-t border-line">
                  {getStrategiesByWorld(key).map((s) => (
                    <li key={s.slug}>
                      <Link
                        href={`/strategy/${s.slug}`}
                        className="cursor-target group flex items-baseline justify-between gap-4 border-b border-line py-4 transition-colors hover:bg-white/[0.015]"
                      >
                        <span className="font-display text-lg text-ink">{s.shortTitle}</span>
                        <span className="label-tight shrink-0 text-ink-faint">{s.status}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <p className="mt-12 border-l border-line-strong pl-4 text-sm leading-relaxed text-ink-faint">
            {STRATEGIES.length} concepts, all internal hypotheses. Nothing here
            implies a signed, approved, live, or endorsed partnership. No figures,
            logos, or quotes are real; event palettes are illustrative only.
          </p>
        </Reveal>
      </Section>
    </article>
  );
}
