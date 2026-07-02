import Link from "next/link";
import type { Strategy } from "@/data/types";
import { WORLDS } from "@/data/types";
import { AnimatedArrow } from "@/components/skiper/AnimatedArrow";
import { accentFor, accentClasses } from "./theme";

/** Adjacent paths — minimal editorial rows, not repeated heavy cards. */
export function RelatedStrategies({ items }: { items: Strategy[] }) {
  if (items.length === 0) return null;
  return (
    <ul className="border-t border-line">
      {items.map((s) => {
        const a = accentClasses(accentFor(s.world));
        return (
          <li key={s.id}>
            <Link
              href={`/strategy/${s.slug}`}
              className="cursor-target group grid items-baseline gap-2 border-b border-line py-7 transition-colors hover:bg-white/[0.015] sm:grid-cols-[minmax(0,1fr)_auto] sm:gap-8"
            >
              <div>
                <div className="flex items-center gap-3">
                  <span className={`size-1.5 rounded-full ${a.dot}`} aria-hidden />
                  <span className="label-tight text-ink-faint">
                    {WORLDS[s.world].name} · {s.status}
                  </span>
                </div>
                <h3 className="mt-2 font-display text-xl text-ink transition-colors sm:text-2xl">
                  {s.title}
                </h3>
                <p className="mt-1.5 max-w-xl text-sm text-ink-dim">
                  {s.oneLineThesis}
                </p>
              </div>
              <span className="hidden text-ink-dim sm:block">
                <AnimatedArrow />
              </span>
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
