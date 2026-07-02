import type { Strategy, World, SurfaceKey } from "./types";

export { SURFACES, WORLDS } from "./types";
export type {
  Strategy,
  World,
  SurfaceKey,
  Status,
  VisualTheme,
} from "./types";

/**
 * The strategy universe.
 *
 * To add a new idea: append a Strategy object below and give it a unique
 * `slug`. It will automatically appear in its world map, get a detail page at
 * /strategy/[slug], and become linkable from `relatedStrategies`. No layout
 * code needs to change.
 *
 * Everything here is an internal hypothesis. Statuses ("Concept", "Pilot
 * hypothesis", "Exploration", "Concept activation") are shown verbatim so
 * nothing reads as a committed partnership. No figures, logos, or quotes are
 * real.
 */
export const STRATEGIES: Strategy[] = [
  // ================================================================
  // COLLEGE · FLAGSHIP
  // ================================================================
  {
    id: "col-treehacks",
    slug: "treehacks-builder-guide",
    world: "college",
    title: "TreeHacks × LiveX AI: The Builder Guide",
    shortTitle: "TreeHacks Builder Guide",
    status: "Concept activation",
    flagship: true,
    priority: 1,
    visualTheme: "constellation",
    brand: { name: "TreeHacks", accent: "#2fe08a", accentDeep: "#14b877" },
    oneLineThesis:
      "A LiveX guide that greets a builder in the room and stays with them, from the hackathon floor to their phone to the weeks after.",
    strategicQuestion:
      "Can one LiveX intelligence own the full arc of a builder's event (arrival, momentum, and everything after) while it remembers who they are across every surface?",
    targetAudience:
      "Student builders arriving at a high-energy collegiate hackathon: first-timers looking for a team, returning hackers chasing a sponsor track, and the curious who want to see what LiveX is.",
    partnerType: "Collegiate hackathon / student builder event",
    proposedPartner:
      "TreeHacks, a collegiate hackathon (illustrative concept target, not a claimed partnership)",
    primarySurface: "physical",
    connectedSurfaces: ["physical", "voice", "qr", "mobile", "followup"],
    whyLiveX:
      "The value is not a hologram at an event. Plenty of vendors can render a face. The value is continuity: a guide that captures intent in the room and carries it, intact, onto the builder's phone and into the days after. That hand-off, with memory, is exactly what LiveX exists to do and what a static booth or a chatbot cannot.",
    whyNow:
      "Hackathons are the densest concentration of technical builders LiveX will ever stand in front of, the future founders, customers, and hires, and they arrive primed to try new tools. It is a rare setting where a physical-to-digital demo is also the product doing its actual job.",
    userJourney: [
      {
        id: "arrival",
        surface: "physical",
        title: "Arrival: visual curiosity",
        detail:
          "Walking in, a builder sees a stylized LiveX guide: a luminous, abstract presence at a kiosk, not a cartoon face. It turns toward them and asks one question: “What are you here to build?”",
      },
      {
        id: "intent",
        surface: "voice",
        title: "Intent capture",
        detail:
          "They answer by voice or tap: find a team, pick a sponsor track, find a workshop, get unstuck, practice a demo, or just explore LiveX. The guide reacts visibly and reflects their intent back in a sentence.",
      },
      {
        id: "handoff",
        surface: "qr",
        title: "The physical-to-mobile handoff",
        detail:
          "“Continue on your phone.” A signal leaves the guide and resolves into a QR/device outline. They scan, and the exact context they just built is already waiting on their screen. Nothing re-typed.",
      },
      {
        id: "support",
        surface: "mobile",
        title: "Builder support in-hand",
        detail:
          "On mobile the guide becomes a focused companion: a suggested sponsor challenge, a workshop route on the venue map, a team-finding prompt, or a quick framework to unblock the idea, and it keeps answering.",
      },
      {
        id: "return",
        surface: "followup",
        title: "Return moments",
        detail:
          "Later, the same context resurfaces: a workshop reminder, a demo-practice nudge before judging, a showcase guide, each one visibly continuous with the guide they met on the floor.",
      },
      {
        id: "flywheel",
        surface: "followup",
        title: "Event-to-pipeline flywheel",
        detail:
          "One experience compounds: a better attendee moment, sponsor discovery, LiveX awareness, opt-in engagement, and a warm reason to keep the relationship going after the event ends.",
      },
    ],
    partnerJourney: [
      {
        id: "organizer",
        title: "Organizers get a better event",
        detail:
          "The guide absorbs the repetitive questions (where, when, which track, how do I) and routes attendees to the right room and the right people, lifting the floor experience without adding staff.",
      },
      {
        id: "sponsors",
        title: "Sponsors get discovered on purpose",
        detail:
          "Instead of a table people walk past, sponsor tracks are surfaced to builders whose stated intent actually matches: a warmer, opt-in path to the teams they came to meet.",
      },
      {
        id: "livex",
        title: "LiveX gets proof in the wild",
        detail:
          "The company demonstrates a physical-to-digital hand-off to the exact audience it wants to win, and leaves with opt-in relationships instead of badge scans.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Scope one sharp moment",
        detail:
          "Pick the single highest-friction attendee question (usually “what should I do first?”) and design the guide around solving it end-to-end.",
      },
      {
        label: "02",
        title: "Build the guide + hand-off",
        detail:
          "A stylized physical presence with voice/tap intent capture, and the QR hand-off that carries context to mobile without a re-prompt. This bridge is the whole demo.",
      },
      {
        label: "03",
        title: "Instrument every surface",
        detail:
          "Measure engagement, hand-off, completion, sponsor actions, opt-in, and return sessions, so the story after the event is evidence, not vibes.",
      },
      {
        label: "04",
        title: "Design the return",
        detail:
          "Pre-write the follow-up moments (workshop, demo practice, showcase, after-event invite) so the relationship continues automatically.",
      },
      {
        label: "05",
        title: "Debrief into a repeatable pattern",
        detail:
          "Package what worked into a template other campus events, and eventually commercial venues, can reuse.",
      },
    ],
    gtmMotion:
      "Community-led, event-anchored. A single flagship activation seeds opt-in builder relationships and produces reusable proof that this physical-to-digital motion works, feeding both the campus program and the commercial field motion.",
    successSignals: [
      {
        signal: "Physical engagement rate",
        reads:
          "Of attendees who pass the guide, how many actually start an interaction. The honest read on whether the physical presence earns attention.",
      },
      {
        signal: "Scan-to-mobile handoff rate",
        reads:
          "Of those who engage, how many carry it to their phone. The core proof that the hand-off, with context, works.",
      },
      {
        signal: "Interaction completion rate",
        reads:
          "How many reach a useful outcome (a team lead, a route, an unblocked idea) rather than bouncing.",
      },
      {
        signal: "Sponsor discovery actions",
        reads:
          "Intent-matched sponsor track views or saves: the value the guide creates for partners.",
      },
      {
        signal: "Opt-in rate",
        reads:
          "How many choose to keep the relationship going. The quality signal that separates this from a badge scan.",
      },
      {
        signal: "Return-session rate",
        reads:
          "How many re-open a follow-up moment after the event. The flywheel actually turning.",
      },
      {
        signal: "Follow-up demo / pilot conversations",
        reads:
          "Qualitative: warm threads that open because of the experience, tracked as a pipeline signal, not a revenue claim.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "A loud, chaotic room degrades voice and attention.",
        mitigation:
          "Design tap-first with voice as an accelerant; keep the opening ask to a single question that works in three seconds.",
      },
      {
        risk: "The hand-off feels like a gimmick if context is thin.",
        mitigation:
          "Make the mobile surface deliver something the room could not, a specific route, match, or framework, so continuity is felt, not claimed.",
      },
      {
        risk: "Event partnership, placement, and privacy approvals.",
        mitigation:
          "Treat opt-in, data handling, and on-site placement as day-one design constraints, agreed with organizers before build.",
      },
      {
        risk: "Hardware and connectivity on a crowded venue network.",
        mitigation:
          "Degrade gracefully: the guide and hand-off must survive flaky Wi-Fi and fall back to a lightweight mobile path.",
      },
    ],
    nextStep: {
      horizon: "Next 30 days",
      action: "Prototype the hand-off, not the hologram",
      detail:
        "Build the single moment where a stated intent jumps from a physical display to a phone with zero re-entry. If that lands, the rest of the arc is production.",
    },
    relatedStrategies: [],
    lens: {
      audience: "Student builders",
      surface: "Physical → Mobile",
      activation: "Flagship event",
      outcome: "Opt-in builder pipeline",
    },
  },
];

// ------------------------------------------------------------------
// Selectors - the only surface layout code touches.
// ------------------------------------------------------------------

export function getStrategiesByWorld(world: World): Strategy[] {
  return STRATEGIES.filter((s) => s.world === world).sort(
    (a, b) => a.priority - b.priority
  );
}

export function getStrategyBySlug(slug: string): Strategy | undefined {
  return STRATEGIES.find((s) => s.slug === slug);
}

export function getAllSlugs(): string[] {
  return STRATEGIES.map((s) => s.slug);
}

export function getRelatedStrategies(strategy: Strategy): Strategy[] {
  return strategy.relatedStrategies
    .map((slug) => getStrategyBySlug(slug))
    .filter((s): s is Strategy => Boolean(s));
}

export function getFlagship(): Strategy {
  return STRATEGIES.find((s) => s.flagship) ?? STRATEGIES[0];
}

export function countByWorld(world: World): number {
  return STRATEGIES.filter((s) => s.world === world).length;
}

/** Distinct primary+connected surfaces used by a world (for hover reveals). */
export function surfacesForWorld(world: World): SurfaceKey[] {
  const set = new Set<SurfaceKey>();
  for (const s of STRATEGIES) {
    if (s.world !== world) continue;
    set.add(s.primarySurface);
    s.connectedSurfaces.forEach((c) => set.add(c));
  }
  return Array.from(set);
}
