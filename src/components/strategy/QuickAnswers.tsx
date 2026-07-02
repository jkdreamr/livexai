import type { Strategy } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { SurfaceChip } from "@/components/ui/Surface";
import { accentClasses, THEME } from "./theme";

/**
 * The four questions every concept must answer fast:
 *  1. Who encounters this?
 *  2. What does the LiveX interaction feel like?
 *  3. Why does the partner care?
 *  4. What signal does LiveX gain?
 */
export function QuickAnswers({ strategy }: { strategy: Strategy }) {
  const { accent } = THEME[strategy.visualTheme];
  const a = accentClasses(accent);

  const partnerCares =
    strategy.partnerJourney[0]?.detail ?? strategy.whyLiveX;
  const feltMoment = strategy.userJourney[0]?.detail ?? strategy.oneLineThesis;
  const signals = strategy.successSignals.slice(0, 3);
  const surfaces = [
    strategy.primarySurface,
    ...strategy.connectedSurfaces.filter((s) => s !== strategy.primarySurface),
  ].slice(0, 4);

  const items = [
    { q: "Who encounters this", body: strategy.targetAudience },
    { q: "What it feels like", body: feltMoment, surfaces: true },
    { q: "Why the partner cares", body: partnerCares },
    { q: "What LiveX gains", body: null as string | null, signals: true },
  ];

  return (
    <section className="border-y border-line bg-abyss/60">
      <div className="container-x grid gap-px py-px sm:grid-cols-2 lg:grid-cols-4">
        {items.map((item, i) => (
          <Reveal
            key={item.q}
            delay={i * 0.06}
            className="relative flex h-full flex-col gap-4 bg-void px-6 py-10 sm:px-8"
          >
            <div className="flex items-center gap-2.5">
              <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden />
              <p className="label-tight text-ink-dim">
                {String(i + 1).padStart(2, "0")} · {item.q}
              </p>
            </div>

            {item.body && (
              <p className="text-[0.95rem] leading-relaxed text-ink-soft">
                {item.body}
              </p>
            )}

            {item.surfaces && (
              <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
                {surfaces.map((s, si) => (
                  <SurfaceChip key={s} surface={s} primary={si === 0} />
                ))}
              </div>
            )}

            {item.signals && (
              <ul className="mt-auto flex flex-col gap-2.5 pt-1">
                {signals.map((s) => (
                  <li
                    key={s.signal}
                    className="flex items-start gap-2 text-sm text-ink-soft"
                  >
                    <span
                      aria-hidden
                      className={`mt-1.5 h-px w-3 shrink-0 ${a.bg}`}
                    />
                    {s.signal}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        ))}
      </div>
    </section>
  );
}
