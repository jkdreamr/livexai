import type { Strategy } from "@/data/types";
import { SURFACES, WORLDS } from "@/data/types";
import { getRelatedStrategies } from "@/data/strategies";
import { Reveal } from "@/components/ui/Reveal";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { StrategyHero } from "./StrategyHero";
import { QuickAnswers } from "./QuickAnswers";
import { Section } from "./Section";
import { JourneyScene } from "./JourneyScene";
import { ActivationTimeline } from "./ActivationTimeline";
import { MetricHypotheses } from "./MetricHypotheses";
import { NextMove } from "./NextMove";
import { RelatedStrategies } from "./RelatedStrategies";
import { accentFor, accentClasses } from "./theme";

/**
 * The shared strategy detail template. Every non-flagship strategy renders
 * through this: one system, but varied layouts (bands, journeys, timelines,
 * pulled statements) so no two pages feel identical.
 */
export function StrategyDetail({ strategy }: { strategy: Strategy }) {
  const accent = accentFor(strategy.world);
  const a = accentClasses(accent);
  const world = WORLDS[strategy.world];
  const related = getRelatedStrategies(strategy);

  const surfaces = [
    strategy.primarySurface,
    ...strategy.connectedSurfaces.filter((s) => s !== strategy.primarySurface),
  ];

  return (
    <article>
      <StrategyHero strategy={strategy} />
      <QuickAnswers strategy={strategy} />

      {/* Strategic question + definition */}
      <Section index="01" label="The strategic question" accent={accent}>
        <div className="grid gap-12 lg:grid-cols-[1.4fr_1fr]">
          <Reveal>
            <p className="text-display fluid-h2 text-balance text-ink">
              {strategy.strategicQuestion}
            </p>
          </Reveal>
          <Reveal delay={0.1}>
            <dl className="flex flex-col divide-y divide-line border-y border-line">
              {[
                { k: "Proposed partner", v: strategy.proposedPartner },
                { k: "Partner type", v: strategy.partnerType },
                { k: "World", v: `${world.name} · ${world.subtitle}` },
              ].map((row) => (
                <div key={row.k} className="py-4">
                  <dt className="label-tight text-ink-faint">{row.k}</dt>
                  <dd className="mt-1.5 text-sm text-ink-soft">{row.v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </Section>

      {/* User experience */}
      <Section
        index="02"
        label="What the user experiences"
        accent={accent}
        title="One intelligence, moving across surfaces"
        intro="The interaction is designed to keep its context as it travels: nothing re-typed, nothing forgotten."
      >
        <JourneyScene steps={strategy.userJourney} accent={accent} kind="user" />
      </Section>

      {/* Surfaces involved */}
      <Section
        index="03"
        label="LiveX surfaces involved"
        accent={accent}
        title="Where the intelligence appears"
      >
        <ul className="grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
          {surfaces.map((s, i) => {
            const meta = SURFACES[s];
            return (
              <Reveal key={s} delay={(i % 3) * 0.05}>
                <li className="flex h-full flex-col gap-4 bg-void p-6">
                  <div className="flex items-center justify-between">
                    <span
                      className={`grid size-10 place-items-center rounded-full border ${
                        i === 0 ? a.border : "border-line-strong"
                      } ${i === 0 ? a.text : "text-ink-soft"}`}
                    >
                      <SurfaceGlyph surface={s} size={18} />
                    </span>
                    {i === 0 && (
                      <span className={`label-tight ${a.text}`}>Primary</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-display text-lg text-ink">{meta.label}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-ink-dim">
                      {meta.description}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </Section>

      {/* Why LiveX / Why now */}
      <Section index="04" label="Why LiveX, why now" accent={accent}>
        <div className="grid gap-12 md:grid-cols-2">
          <Reveal>
            <div className="flex h-full flex-col">
              <h3 className="font-display text-2xl text-ink">Why LiveX is required</h3>
              <p className="body-measure mt-4 text-ink-soft">{strategy.whyLiveX}</p>
            </div>
          </Reveal>
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-xl border border-line bg-charcoal p-7">
              <h3 className={`font-display text-2xl ${a.text}`}>Why now</h3>
              <p className="body-measure mt-4 text-ink-soft">{strategy.whyNow}</p>
            </div>
          </Reveal>
        </div>
      </Section>

      {/* Partner value */}
      <Section
        index="05"
        label="What the partner gains"
        accent={accent}
        title="The value on the other side of the table"
      >
        <JourneyScene
          steps={strategy.partnerJourney}
          accent={accent}
          kind="partner"
        />
      </Section>

      {/* GTM motion */}
      <Section index="06" label="GTM motion" accent={accent}>
        <Reveal>
          <p className="text-display fluid-h3 max-w-4xl text-balance text-ink-soft">
            <span className={a.text}>→&nbsp;</span>
            {strategy.gtmMotion}
          </p>
        </Reveal>
      </Section>

      {/* Activation plan */}
      <Section
        index="07"
        label="Activation plan"
        accent={accent}
        title="How it gets built"
      >
        <ActivationTimeline phases={strategy.activationPlan} accent={accent} />
      </Section>

      {/* Measurement hypotheses */}
      <Section
        index="08"
        label="Measurement hypotheses"
        accent={accent}
        title="What we'd watch to know it's working"
      >
        <MetricHypotheses signals={strategy.successSignals} accent={accent} />
      </Section>

      {/* Risks */}
      <Section
        index="09"
        label="Risks & dependencies"
        accent={accent}
        title="What has to be true"
      >
        <ul className="divide-y divide-line border-y border-line">
          {strategy.risksAndDependencies.map((r, i) => (
            <Reveal key={i}>
              <li className="grid gap-4 py-7 sm:grid-cols-2 sm:gap-10">
                <div>
                  <p className="label-tight text-ink-faint">Risk / dependency</p>
                  <p className="mt-2 text-[0.95rem] text-ink">{r.risk}</p>
                </div>
                <div>
                  <p className={`label-tight ${a.text}`}>How we hold it</p>
                  <p className="mt-2 text-[0.95rem] text-ink-soft">
                    {r.mitigation}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </Section>

      {/* Next move */}
      <section className="container-x pb-24 pt-4">
        <NextMove next={strategy.nextStep} accent={accent} />
      </section>

      {/* Related */}
      {related.length > 0 && (
        <Section index="10" label="Adjacent paths" accent={accent}>
          <RelatedStrategies items={related} />
        </Section>
      )}
    </article>
  );
}
