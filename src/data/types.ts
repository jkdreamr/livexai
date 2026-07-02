/**
 * Surface Map - strategy schema.
 *
 * This file defines the *shape* of the strategy universe. Content lives in
 * `strategies.ts`. Keeping the schema here means new ideas can be added
 * without touching layout logic. Every world map and detail page reads
 * from these types.
 */

export type World = "college" | "standard";

/**
 * How ready an idea is. Rendered verbatim as a status label so nothing ever
 * reads as a committed partnership.
 */
export type Status =
  | "Concept"
  | "Pilot hypothesis"
  | "Exploration"
  | "Concept activation";

/** The surfaces a single LiveX intelligence can appear on. */
export type SurfaceKey =
  | "physical"
  | "qr"
  | "mobile"
  | "web"
  | "voice"
  | "followup"
  | "partner";

export interface SurfaceMeta {
  key: SurfaceKey;
  label: string;
  short: string;
  description: string;
}

/** A single moment in a user or partner journey. */
export interface JourneyStep {
  id: string;
  title: string;
  detail: string;
  /** Which surface this moment happens on (drives the transfer visuals). */
  surface?: SurfaceKey;
}

/** A phase in the activation plan / operating model. */
export interface ActivationPhase {
  label: string; // "01", "Week 0-2", etc.
  title: string;
  detail: string;
}

/**
 * A measurement hypothesis. We name the signal and what a healthy read would
 * *indicate*, never a fabricated number.
 */
export interface SuccessSignal {
  signal: string;
  reads: string;
}

export interface RiskItem {
  risk: string;
  mitigation: string;
}

export interface NextStep {
  horizon: string; // "Next 30 days"
  action: string;
  detail: string;
}

/** Drives the detail page's motif + accent. */
export type VisualTheme =
  | "constellation"
  | "orbit"
  | "network"
  | "lab"
  | "arena"
  | "stage"
  | "concourse"
  | "sprint";

/** Short single-idea tags the ValueLens uses to re-read a node. */
export interface LensTags {
  audience: string;
  surface: string;
  activation: string;
  outcome: string;
}

/**
 * Optional event/partner brand for a concept. When present, the detail page
 * adopts the brand's palette (illustrative only, an original stylized mark,
 * never a reproduction of a trademark, and never implying affiliation).
 */
export interface StrategyBrand {
  name: string;
  accent: string; // hex
  accentDeep: string; // hex
}

export interface Strategy {
  id: string;
  slug: string;
  world: World;
  title: string;
  shortTitle: string;
  status: Status;
  oneLineThesis: string;
  strategicQuestion: string;
  targetAudience: string;
  partnerType: string;
  /** Illustrative target archetype, never a claimed, signed relationship. */
  proposedPartner: string;
  primarySurface: SurfaceKey;
  connectedSurfaces: SurfaceKey[];
  whyLiveX: string;
  whyNow: string;
  userJourney: JourneyStep[];
  partnerJourney: JourneyStep[];
  activationPlan: ActivationPhase[];
  gtmMotion: string;
  successSignals: SuccessSignal[];
  risksAndDependencies: RiskItem[];
  nextStep: NextStep;
  visualTheme: VisualTheme;
  /** 1 = highest conviction / sequencing priority. */
  priority: number;
  relatedStrategies: string[]; // slugs
  lens: LensTags;
  /** Marks the single flagship experience with its own bespoke page. */
  flagship?: boolean;
  /** Optional event/partner palette adopted by the detail page. */
  brand?: StrategyBrand;
}

export interface WorldMeta {
  key: World;
  name: string;
  subtitle: string;
  /** Evocative headline for the world hero. */
  headline: string;
  /** One-line GTM thesis surfaced on homepage hover. */
  thesis: string;
  longThesis: string;
  /** The temperament each world should *feel* like. */
  temperament: string[];
  /** Signal token used for accents in that world. */
  signal: "college" | "standard";
  href: string;
}

// ------------------------------------------------------------------
// Stable taxonomy
// ------------------------------------------------------------------

export const SURFACES: Record<SurfaceKey, SurfaceMeta> = {
  physical: {
    key: "physical",
    label: "Physical encounter",
    short: "Physical",
    description:
      "A LiveX agent in real space: a stylized display, kiosk, or holographic guide someone walks up to.",
  },
  qr: {
    key: "qr",
    label: "QR handoff",
    short: "Handoff",
    description:
      "The bridge moment. A scan or tap carries live context from the physical agent onto the person's own device.",
  },
  mobile: {
    key: "mobile",
    label: "Mobile",
    short: "Mobile",
    description:
      "A focused LiveX experience continuing on the attendee's phone, intent preserved, nothing re-typed.",
  },
  web: {
    key: "web",
    label: "Web",
    short: "Web",
    description:
      "A browser surface for deeper exploration, sharing, or a partner-owned page.",
  },
  voice: {
    key: "voice",
    label: "Voice",
    short: "Voice",
    description:
      "Spoken interaction: hands-free intent capture that survives loud, live environments.",
  },
  followup: {
    key: "followup",
    label: "Follow-up",
    short: "Return",
    description:
      "Post-event moments that reappear with memory: reminders, recommendations, invitations to keep going.",
  },
  partner: {
    key: "partner",
    label: "Partner-owned",
    short: "Partner",
    description:
      "The same intelligence embedded inside a partner's own app, venue, or channel.",
  },
};

export const WORLDS: Record<World, WorldMeta> = {
  college: {
    key: "college",
    name: "College",
    subtitle: "Campus & Students",
    headline: "A living campus signal network.",
    thesis:
      "Reach ambitious student builders where they already gather, then grow campus experiments into broader pilots.",
    longThesis:
      "The College world treats high-signal campus ecosystems as a living network. A LiveX interaction meets student builders at hackathons, labs, and founder communities, then travels with them: from a physical moment into an ongoing digital relationship, and from a single event into a repeatable program.",
    temperament: ["Energetic", "Social", "Emerging", "Builder-led", "Kinetic"],
    signal: "college",
    href: "/college",
  },
  standard: {
    key: "standard",
    name: "Standard",
    subtitle: "Potential Partners",
    headline: "A strategic field map of commercial opportunity.",
    thesis:
      "Deploy LiveX experiences with commercial partners where a physical moment can become measurable digital pipeline.",
    longThesis:
      "The Standard world is a strategic field map of commercial opportunity. It is more deliberate than College: high-conviction activations with venues, creators, operators, and enterprises, each engineered so one physical encounter becomes distribution, proof, and an expansion path.",
    temperament: [
      "Deliberate",
      "High-conviction",
      "Enterprise-ready",
      "Physical-capable",
      "Scalable",
    ],
    signal: "standard",
    href: "/standard",
  },
};
