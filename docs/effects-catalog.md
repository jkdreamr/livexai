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
| 11 | **Expand / collapse in place** (ExpandableCard pattern) | ✅ | TreeHacks demo: sponsor rows expand to tracks + prizes. Kit source: `kit/KitExpandable.tsx` |
| 12 | **Dock** — macOS-style magnifying dock | ✅ `src/components/chrome/DockNav.tsx` | **Site nav** |
| 13 | **Chat typing + thinking dots** | ✅ | TreeHacks demo chatbot (Chatbot.tsx), replies typed via Typewriter |
| 14 | **RotatingText** (React Bits) | ✅ `src/components/reactbits/RotatingText.tsx` | College header: "College" + rotating students / builders / events / classes |
| 15 | **HoloMap** — tilted holographic floor plan with an animated route | ✅ `src/components/treehacks/HoloMap.tsx` | TreeHacks demo → Events (directions) |
| 16 | **HoloAgent** — projected holographic guide that reacts + tilts | ✅ `src/components/treehacks/HoloAgent.tsx` | TreeHacks demo (the agent) |

### Built and available to slot in (not currently placed)
The interaction-kit gallery was removed (a gallery is not integration). These stay in `src/components/kit/` ready to drop into a real spot on request: **Keyboard**, **VideoReveal** (clip-path, no video asset yet), **FloatingPanel**, **MorphSurface**, **MetalButton** (`metal-fx`), **HeroColorPanels** (`@paper-design/shaders-react`), **AnimatedIcons** (hamburger / volume / arrow).

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
