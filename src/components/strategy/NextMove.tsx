import type { NextStep } from "@/data/types";
import { accentClasses, type Accent } from "./theme";

/** The recommended next move — a decisive closing statement, not a CTA. */
export function NextMove({
  next,
  accent,
}: {
  next: NextStep;
  accent: Accent;
}) {
  const a = accentClasses(accent);
  return (
    <div className="relative overflow-hidden rounded-2xl border border-line bg-charcoal p-8 sm:p-12 lg:p-16">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full opacity-[0.16] blur-[90px]"
        style={{ background: a.stroke }}
      />
      <div className="relative">
        <div className="flex flex-wrap items-center gap-3">
          <span className={`label ${a.text}`}>Recommended next move</span>
          <span className="label-tight rounded-full border border-line-strong px-3 py-1 text-ink-dim">
            {next.horizon}
          </span>
        </div>
        <h2 className="text-display fluid-h2 mt-6 max-w-3xl text-balance">
          {next.action}
        </h2>
        <p className="body-measure mt-6 max-w-2xl text-ink-soft">
          {next.detail}
        </p>
      </div>
    </div>
  );
}
