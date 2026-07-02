import Link from "next/link";
import type { World } from "@/data/types";
import { WORLDS } from "@/data/types";
import { accentClasses, accentFor } from "@/components/strategy/theme";

/** Cross-world nav — reinforces that ideas travel between the two motions. */
export function WorldOutro({ from }: { from: World }) {
  const other = WORLDS[from === "college" ? "standard" : "college"];
  const a = accentClasses(accentFor(other.key));
  return (
    <section className="container-x border-t border-line py-24">
      <div className="grid items-end gap-12 lg:grid-cols-[1.3fr_1fr]">
        <div>
          <p className="label">Between the worlds</p>
          <p className="text-display fluid-h3 mt-6 max-w-xl text-balance text-ink-soft">
            Ideas don&apos;t stay in one world. A campus experiment can grow into
            a commercial deployment — and the same intelligence carries between
            them.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          <Link
            href={other.href}
            className="cursor-target group relative overflow-hidden rounded-xl border border-line bg-charcoal p-6 transition-colors hover:border-line-strong"
          >
            <div
              aria-hidden
              className="pointer-events-none absolute -right-8 -top-8 h-32 w-32 rounded-full opacity-[0.14] blur-2xl transition-opacity group-hover:opacity-25"
              style={{ background: a.stroke }}
            />
            <div className="relative flex items-center justify-between">
              <div>
                <p className={`label-tight ${a.text}`}>Enter the other world</p>
                <p className="mt-2 font-display text-2xl text-ink">
                  {other.name}
                </p>
                <p className="mt-1 text-sm text-ink-dim">{other.subtitle}</p>
              </div>
              <span
                aria-hidden
                className="text-ink-dim transition-transform group-hover:translate-x-1"
              >
                →
              </span>
            </div>
          </Link>

          <Link
            href="/system"
            className="cursor-target group flex items-center justify-between rounded-xl border border-line px-6 py-4 text-ink-soft transition-colors hover:bg-white/[0.02] hover:text-ink"
          >
            <span className="label-tight">How the Surface Map works · System overview</span>
            <span aria-hidden className="transition-transform group-hover:translate-x-1">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
