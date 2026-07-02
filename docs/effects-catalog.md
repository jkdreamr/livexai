# Effects & Animations Catalog

A running index of every effect/animation you've handed me, where it lives, and
where each one is used. Add new ones to the bottom as we go.

**Status key:** ✅ integrated · 🧩 vendored (in repo, ready to drop in) · 📥 available (source provided, not yet added — deps noted)

---

## Batch 1 — React Bits (`src/components/reactbits/`)

| # | Effect | Status | Used in |
|---|--------|--------|---------|
| 1 | **LiquidChrome** — living metallic-liquid shader (`ogl`) | ✅ | Landing background · College header · Standard header (all dialed dark + veiled) |
| 2 | **TrueFocus** — words blur/focus with a moving bracket frame | ✅ | Landing statement · College header |
| 3 | **DecryptedText** — text scrambles then resolves | ✅ | Landing eyebrow · College + Standard headers · Docs |
| 4 | **GradualBlur** — progressive edge blur | ✅ | Landing · both world headers · TreeHacks · (edges throughout) |
| 5 | **TargetCursor** — bracket cursor that locks onto `.cursor-target` | ✅ | Global (site-wide; hidden on touch) |
| 6 | **GhostCursor** — glowing pointer trail with bloom (`three`) | ✅ | TreeHacks hero · College header · Standard header (desktop only) |
| 7 | **TextPressure** — variable-weight word reacting to the cursor | ✅ | TreeHacks headline · College "COLLEGE" · Standard "STANDARD" |

## Batch 2 — Skiper / cult-ui / shadcn set

| # | Effect | Status | Used in / notes |
|---|--------|--------|-----------------|
| 8 | **AnimatedArrow** (Skiper99 arrow) — chevron grows into an arrow on hover | ✅ `src/components/skiper/AnimatedArrow.tsx` | College flagship feature · Standard · RelatedStrategies · TreeHacks "case" link |
| 9 | **Typewriter** — types through strings | ✅ `src/components/skiper/Typewriter.tsx` | TreeHacks mobile handoff message · Standard exploration |
| 10 | **Terminal** — mac-window typing terminal | ✅ `src/components/skiper/Terminal.tsx` | Docs ("add a strategy") · Standard exploration ("field open") |
| 11 | **Skiper99 icons** — hamburger-morph + volume-mute micro-icons | 📥 | Same source as AnimatedArrow. Good for a mobile menu toggle / a mute control. Deps: none (inline SVG + framer). |
| 12 | **VideoPopover** (Skiper67) — click a video → clip-path expand to a player | 📥 | Great for a future "demo reel". Deps: `media-chrome`; needs a video asset in `/public`. |
| 13 | **Keyboard** — interactive keyboard with sound | 📥 | Playful builder moment (College). Deps: a `@/components/ui/keyboard` base. |
| 14 | **Dock** — macOS-style magnifying dock | 📥 | Surface/quick-nav idea. Deps: a `@/components/ui/dock` base; source uses external mesh-gradient images (swap for local). |
| 15 | **FloatingPanel** — morphing popover (note / color / actions) | 📥 | An "add your own concept" affordance. Deps: `@/components/ui/floating-panel`. |
| 16 | **MorphSurface** — collapsed pill morphs into an input surface | 📥 | A feedback / contact surface (Docs). Deps: `@/components/ui/morph-surface`. |
| 17 | **ExpandableCard** — cards that expand in place (Design Sync / Product / Weather) | 📥 | Note: we deliberately avoid "cards" for concepts; useful for a Docs FAQ or detail module. Deps: `@/components/ui/expandable`. |
| 18 | **MetalButton** — liquid-metal ring button | 📥 | A signature CTA (e.g. landing "Enter", TreeHacks). Deps: `metal-fx` (WebGL) + a shadcn `Button`. |
| 19 | **HeroColorPanels** — shader hero with animated color panels | 📥 | An alternate hero treatment. Deps: `@paper-design/shaders-react` (or similar) + a `@/components/ui/hero-color-panel` base. |
| 20 | **RotatingText** (React Bits) — per-character rotating word | ✅ `src/components/reactbits/RotatingText.tsx` | College header: "College" + rotating students / builders / events / classes |

## Backgrounds (per-page, so no two pages feel the same)

| # | Background | Status | Used in |
|---|-----------|--------|---------|
| B1 | **LiquidChrome** — liquid-metal shader (`ogl`) | ✅ | Landing |
| B2 | **AuroraBackground** — flowing cyan aurora (rotating conic + drifting glow, CSS/framer) | ✅ `src/components/atmosphere/AuroraBackground.tsx` | College header |
| B3 | **GridField** — architectural amber grid + drifting light + horizon (CSS/framer) | ✅ `src/components/atmosphere/GridField.tsx` | Standard header |

---

## Notes

- Everything under `📥` has working source you provided; adding it means creating
  its base `@/components/ui/*` primitive(s) and installing the noted dep. Say the
  word and I'll wire any of them in.
- All integrated effects respect `prefers-reduced-motion` (JS-gated) and drop
  heavy WebGL on touch/mobile.
- The vendored effect code lives in `src/components/reactbits/` (Batch 1) and
  `src/components/skiper/` (Batch 2).
