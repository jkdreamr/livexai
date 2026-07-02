# Surface Map — Experience Blueprint

The reference for what this artifact is, how it's organized, and the bar every
future concept should meet.

---

## 1. Product thesis

A single LiveX intelligence can appear across many **surfaces** — a physical
encounter, a QR handoff, a phone, the web, voice, a follow-up weeks later, or a
partner-owned channel — and **carry its context between them**. The value is not
any one surface (a kiosk, a hologram, a chat widget). The value is continuity:
the agent remembers who you are as attention moves from the room to your pocket
to the days after.

Everything here is an **internal hypothesis**. Every concept is held to four
questions, answered fast:

1. **Who** encounters this?
2. What does the interaction **feel like**?
3. Why does the **partner** care?
4. What **signal** does LiveX gain?

## 2. Information architecture

Two GTM motions, each a "world":

- **College — Campus & Builder Motion.** Reaching ambitious student builders
  where they already gather; growing campus experiments into broader pilots. Feels
  kinetic, social, emerging. Rendered as a living **signal network** of nodes.
- **Standard — Partner & Field Motion.** High-conviction commercial activations
  with venues, creators, operators, and enterprises. Feels deliberate,
  architectural, weighted. Rendered as a **field map** on a structured grid.

```
/                      Landing — choose a path
/college               College world (signal network)
/standard              Standard world (field map)
/strategy/[slug]       Reusable strategy detail template
/strategy/treehacks-…  Bespoke flagship page
/docs                  The thinking (thesis, motions, schema, index)
```

Concepts are the atoms. Each belongs to a world, appears as a node, and expands
into a detail page. Ideas can travel between worlds (a campus experiment growing
into a commercial deployment) — surfaced by the cross-world outro.

## 3. Interaction model

- **Landing.** Almost no copy. A living shader, a focus statement, two paths.
  Choosing a path enters a world.
- **Worlds.** An explorable spatial field. Hovering a node reveals a *sentence*,
  not a card; clicking enters the concept. A minimal on-screen affordance, never
  a dashboard of filter chips.
- **Detail pages.** A cinematic editorial sequence: the strategic question, the
  user journey moving across surfaces, the partner value, the GTM motion, the
  activation plan, measurement hypotheses, risks, and the recommended next move.
- **Cursor.** A site-wide targeting cursor whose brackets lock onto interactive
  elements (`.cursor-target`); hidden on touch.

Effects carry the experience; text is scarce. Motion is a *language* for
attention moving between surfaces, context transferring, and a concept expanding
into a larger opportunity.

## 4. Strategy-data schema

One object per concept in `src/data/strategies.ts`. Key fields:

| Field                            | Purpose                                                            |
| -------------------------------- | ----------------------------------------------------------------- |
| `world`                          | `college` \| `standard`                                           |
| `status`                         | Readiness, shown verbatim (Concept / Exploration / Pilot hypothesis / Concept activation) |
| `oneLineThesis`                  | The felt promise                                                  |
| `strategicQuestion`              | The single bet the concept represents                            |
| `primary` / `connectedSurfaces`  | Where the intelligence appears, and how it travels               |
| `userJourney` / `partnerJourney` | What the attendee experiences; what the partner gains            |
| `activationPlan`                 | A short operating sequence                                        |
| `successSignals`                 | **Measurement hypotheses** — signals to watch, never fabricated numbers |
| `risksAndDependencies`           | What has to be true                                              |
| `nextStep`                       | The recommended next move, with a horizon                        |
| `relatedStrategies`              | Cross-links (drives world edges)                                 |
| `brand?`                         | Optional event/partner palette (illustrative only)              |

Adding an object gives you a world node, a detail page, and cross-links with no
layout changes. The taxonomy (`SURFACES`, `WORLDS`) is stable and lives in
`src/data/types.ts`.

## 5. Visual & motion principles

- **Restraint over spectacle.** Near-black base, editorial serif for large
  intentional headings, a mono "instrument" label used sparingly. World identity
  is carried by material and behavior, not blunt color coding.
- **Effects as the advanced layer.** Shaders, focus, decrypt, gradual blur, and
  the targeting cursor do the wow; the copy stays minimal.
- **Purposeful motion.** Enter with expressive ease-out; exit faster than enter;
  spring physics for anything tracking a pointer. No decorative-only motion, no
  constant particle noise.
- **Accessibility is not optional.** `prefers-reduced-motion` is gated in JS (not
  just CSS); every canvas has a semantic, keyboard-navigable equivalent; heavy 3D
  is lazy-loaded and simplified on mobile.

## 6. How TreeHacks sets the bar

`/strategy/treehacks-builder-guide` is the flagship and the quality reference.
It goes beyond a static concept to a *working* interaction:

- A reactive **3D Builder Guide** (primitive geometry, no face/avatar) that
  responds to the arrival state.
- An interactive **Arrival Signal** check-in flow — the first practical LiveX
  moment. Scan / tap / code / staff-assisted fallback → the guide reacts →
  instant orientation → choose a first move → the intent becomes a **build
  signal** that transfers to mobile, with context intact.
- An **Operations Lens** overlay (a calm event pulse, not an admin table) showing
  why organizers care.
- Fallback and accessibility paths made visible; measurement framed strictly as
  hypotheses; an illustrative event palette applied through the `brand` field.

Every future concept should aim for this level of clarity, continuity, and craft:
show the physical-to-digital handoff, keep the agent's memory legible across
surfaces, and never claim an outcome the data hasn't earned.
