import type { ActivationPhase } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { accentClasses, type Accent } from "./theme";

/** The activation plan as a connected operating sequence. */
export function ActivationTimeline({
  phases,
  accent,
}: {
  phases: ActivationPhase[];
  accent: Accent;
}) {
  const a = accentClasses(accent);
  return (
    <ol className="relative flex flex-col gap-10 lg:flex-row lg:gap-5">
      <div
        aria-hidden
        className="absolute left-0 right-0 top-[7px] hidden h-px bg-line lg:block"
      />
      {phases.map((phase, i) => (
        <Reveal
          key={phase.label + i}
          delay={i * 0.07}
          className="relative flex-1"
        >
          <li>
            <span
              aria-hidden
              className={`block size-3.5 rounded-full border-2 border-void ${a.bg}`}
              style={{ boxShadow: `0 0 12px -2px ${a.stroke}` }}
            />
            <p className={`label-tight mt-4 ${a.text}`}>{phase.label}</p>
            <h3 className="mt-2 font-display text-lg text-ink">{phase.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-dim">
              {phase.detail}
            </p>
          </li>
        </Reveal>
      ))}
    </ol>
  );
}
