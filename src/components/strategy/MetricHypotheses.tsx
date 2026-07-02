import type { SuccessSignal } from "@/data/types";
import { Reveal } from "@/components/ui/Reveal";
import { accentClasses, type Accent } from "./theme";

/**
 * Measurement hypotheses. We name the signal and what a healthy read would
 * *indicate* — never a fabricated number. The header makes that explicit.
 */
export function MetricHypotheses({
  signals,
  accent,
}: {
  signals: SuccessSignal[];
  accent: Accent;
}) {
  const a = accentClasses(accent);
  return (
    <div>
      <div className="flex items-center gap-3 rounded-full border border-line-strong bg-white/[0.02] px-4 py-2 text-ink-dim label-tight w-fit">
        <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden />
        Signals to measure — hypotheses, not projected results
      </div>

      <ol className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
        {signals.map((s, i) => (
          <Reveal key={s.signal} delay={(i % 2) * 0.06}>
            <li className="flex h-full flex-col bg-void p-6 sm:p-7">
              <span className="label-tight text-ink-faint">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-3 font-display text-lg leading-snug text-ink">
                {s.signal}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-ink-soft">
                {s.reads}
              </p>
            </li>
          </Reveal>
        ))}
      </ol>
    </div>
  );
}
