import Link from "next/link";
import type { Strategy } from "@/data/types";
import { SurfaceGlyph } from "@/components/ui/Surface";

/**
 * Minimal stacked fallback for touch / mobile / reduced-motion. Same nodes,
 * same destinations — rendered as a quiet, weighted index rather than a
 * spatial map. Each row is a semantic Link with a descriptive aria-label.
 */
export function FieldList({ strategies }: { strategies: Strategy[] }) {
  return (
    <ol className="border-t border-line">
      {strategies.map((s, i) => (
        <li key={s.slug}>
          <Link
            href={`/strategy/${s.slug}`}
            aria-label={`${s.title} — ${s.oneLineThesis}`}
            className="cursor-target group flex items-start gap-5 border-b border-line py-7 transition-colors hover:bg-white/[0.015]"
          >
            <span className="label-tight mt-1 w-8 shrink-0 text-standard/70">
              {String(i + 1).padStart(2, "0")}
            </span>

            <span className="min-w-0 flex-1">
              <span className="flex items-baseline justify-between gap-4">
                <span className="text-display fluid-h3 text-ink transition-colors group-hover:text-standard">
                  {s.shortTitle}
                </span>
                <span className="label-tight hidden shrink-0 text-ink-faint sm:block">
                  {s.status}
                </span>
              </span>
              <span className="mt-2 block max-w-xl text-sm leading-relaxed text-ink-dim">
                {s.oneLineThesis}
              </span>
            </span>

            <span
              aria-hidden
              className="mt-1 shrink-0 text-ink-faint transition-colors group-hover:text-standard"
            >
              <SurfaceGlyph surface={s.primarySurface} size={22} />
            </span>
          </Link>
        </li>
      ))}
    </ol>
  );
}
