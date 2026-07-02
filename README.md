# LiveX / Surface Map

An internal strategy-exploration experience for LiveX AI. It makes one idea
concrete: **a single LiveX intelligence can appear across many surfaces —
physical space, QR handoff, mobile, web, voice, follow-up — and carry its
context between them.** Every concept is an internal hypothesis, explored through
two GTM motions:

- **College** — Campus & Builder Motion (a kinetic campus signal network)
- **Standard** — Partner & Field Motion (an architectural commercial field map)

The flagship is **TreeHacks × LiveX AI — The Builder Guide**, an interactive
concept for physical-to-mobile continuity at a collegiate hackathon, built around
an arrival & check-in flow ("You're in.").

> All opportunities shown are internal hypotheses and illustrative activation
> concepts. Nothing here implies a signed, approved, live, or endorsed
> partnership. No figures, logos, or quotes are real; where an event palette is
> used it is illustrative only (an original stylized mark, not a trademark).

---

## Stack

- **Next.js 16** (App Router) + **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first design tokens in `src/app/globals.css`)
- **Framer Motion** for interface motion
- **React Three Fiber + Drei** for the centerpiece 3D scene only (the TreeHacks
  Builder Guide)
- A small set of vendored open-source effect components (React Bits) in
  `src/components/reactbits/` — LiquidChrome, TrueFocus, DecryptedText,
  GradualBlur, TargetCursor, GhostCursor, TextPressure (deps: `gsap`, `ogl`)
- Typography: **Fraunces** (editorial display), **Hanken Grotesk** (UI), and
  **JetBrains Mono** (instrument labels), via `next/font`

## Local setup

```bash
npm install
npm run dev        # http://localhost:3000
```

### Scripts

| Script          | What it does                          |
| --------------- | ------------------------------------- |
| `npm run dev`   | Start the dev server (Turbopack)      |
| `npm run build` | Production build (type-checks + lint) |
| `npm run start` | Serve the production build            |
| `npm run lint`  | ESLint                                |

## Project structure

```
src/
  app/
    page.tsx                     # Landing (WorldEntry)
    college/page.tsx             # College world
    standard/page.tsx            # Standard world
    docs/page.tsx                # The thinking — thesis, motions, schema, index
    strategy/[slug]/page.tsx     # Reusable strategy detail template
    strategy/treehacks-builder-guide/page.tsx   # Bespoke flagship page
    globals.css                  # Design tokens + editorial utilities + effect CSS
    layout.tsx                   # Fonts, chrome, cursor, grain
  data/
    types.ts                     # Schema + surface/world taxonomy (stable)
    strategies.ts                # <- THE content file: all concepts + selectors
  components/
    home/        # Landing
    college/     # College field
    standard/    # Standard field
    treehacks/   # Flagship: LiveGuide, ArrivalSignal, TreeHacksHero
    strategy/    # Detail template + reusable sections (StrategyHero, JourneyScene,
                 #   SurfaceTransfer, MetricHypotheses, SignalFlywheel, NextMove ...)
    docs/        # Docs eyebrow
    world/       # WorldOutro (cross-world nav)
    chrome/      # Header, footer, cursor
    ui/          # StatusTag, SurfaceGlyph, Reveal, SectionLabel
    reactbits/   # Vendored effect components
    atmosphere/  # Grain overlay
  lib/           # cn, hooks (reduced-motion / media / mounted), motion tokens
docs/
  experience-blueprint.md        # Product thesis, IA, schema, motion principles
```

## How to add a strategy

Everything is data-driven. Append one object to `STRATEGIES` in
[`src/data/strategies.ts`](src/data/strategies.ts) with a unique `slug`. It then
automatically:

- appears as a node in its world map (`world: "college" | "standard"`),
- gets a detail page at `/strategy/{slug}` (rendered by the shared template),
- becomes linkable from other concepts via `relatedStrategies`.

No layout code needs to change. The `Strategy` shape lives in
[`src/data/types.ts`](src/data/types.ts); fill in `oneLineThesis`,
`strategicQuestion`, `userJourney`, `partnerJourney`, `activationPlan`,
`successSignals` (always framed as measurement hypotheses, never fabricated
numbers), `nextStep`, etc.

To give a concept an event/partner palette, add an optional `brand`
(`{ name, accent, accentDeep }`). The detail page adopts it by overriding the
`--color-college` / `--color-college-deep` CSS variables at the page root, so
every accented element rebrands automatically (see the TreeHacks page).

## How to edit a world

- World copy (name, subtitle, headline, thesis) lives in the `WORLDS` map in
  [`src/data/types.ts`](src/data/types.ts).
- Node placement + the world's spatial treatment live in that world's components
  (`src/components/college/*`, `src/components/standard/*`) and its page
  (`src/app/college/page.tsx`, `src/app/standard/page.tsx`).

## Replacing sample concepts with real GTM content

The concepts are illustrative hypotheses. To make them real:

1. Edit the objects in `src/data/strategies.ts` — swap in real audiences,
   partner archetypes, journeys, and next steps.
2. Keep `status` honest (`Concept` / `Exploration` / `Pilot hypothesis` /
   `Concept activation`) — it renders verbatim so nothing reads as committed.
3. Keep `successSignals` as **signals to measure**, not results, until you have
   real data.
4. Only add a `brand` / real event palette when you actually have permission to
   associate with that partner.

## Accessibility & performance

- Every canvas experience has a semantic, keyboard-navigable equivalent; no text
  is trapped in a canvas.
- `prefers-reduced-motion` is respected everywhere (JS-driven motion is gated,
  not just CSS); heavy 3D/shaders are lazy-loaded and simplified on mobile/touch.
- The custom cursor is hidden on touch devices.
