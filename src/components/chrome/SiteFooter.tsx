import Link from "next/link";

const WORLDS = [
  { href: "/college", label: "College — Campus & Builder Motion" },
  { href: "/standard", label: "Standard — Partner & Field Motion" },
];

const META = [
  { href: "/docs", label: "Docs — the thinking" },
  { href: "/strategy/treehacks-builder-guide", label: "Flagship: TreeHacks" },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 border-t border-line bg-abyss">
      <div className="container-x grid gap-12 py-16 md:grid-cols-[1.5fr_1fr_1fr] md:py-20">
        <div className="max-w-md">
          <div className="flex items-baseline gap-2">
            <span className="font-display text-xl text-ink">LiveX</span>
            <span className="label-tight text-ink-dim">/ Surface Map</span>
          </div>
          <p className="mt-5 text-sm leading-relaxed text-ink-dim">
            An internal strategy universe for how a single LiveX intelligence
            can appear across physical space, mobile, web, voice, and follow-up.
          </p>
          <p className="mt-5 border-l border-line-strong pl-4 text-[0.8rem] leading-relaxed text-ink-faint">
            All opportunities shown are internal hypotheses and illustrative
            activation concepts. Nothing here implies a signed, approved, live,
            or endorsed partnership. No performance figures, logos, or quotes are
            real.
          </p>
        </div>

        <nav aria-label="Worlds" className="flex flex-col gap-3">
          <p className="label mb-1">Worlds</p>
          {WORLDS.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <nav aria-label="Reference" className="flex flex-col gap-3">
          <p className="label mb-1">Reference</p>
          {META.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm text-ink-soft transition-colors hover:text-ink"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      <div className="border-t border-line">
        <div className="container-x flex flex-col gap-2 py-5 sm:flex-row sm:items-center sm:justify-between">
          <p className="label-tight text-ink-faint">
            Internal use · Strategy exploration · Not for external distribution
          </p>
          <p className="label-tight text-ink-faint">
            LiveX AI · Surface Map v1
          </p>
        </div>
      </div>
    </footer>
  );
}
