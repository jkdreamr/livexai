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
    title: "TreeHacks × LiveX AI — The Builder Guide",
    shortTitle: "TreeHacks Builder Guide",
    status: "Concept activation",
    flagship: true,
    priority: 1,
    visualTheme: "constellation",
    brand: { name: "TreeHacks", accent: "#42c58a", accentDeep: "#2a8a5e" },
    oneLineThesis:
      "A LiveX guide that greets a builder in the room and stays with them — from the hackathon floor to their phone to the weeks after.",
    strategicQuestion:
      "Can one LiveX intelligence own the full arc of a builder's event — arrival, momentum, and everything after — while it remembers who they are across every surface?",
    targetAudience:
      "Student builders arriving at a high-energy collegiate hackathon: first-timers looking for a team, returning hackers chasing a sponsor track, and the curious who want to see what LiveX is.",
    partnerType: "Collegiate hackathon / student builder event",
    proposedPartner:
      "TreeHacks — collegiate hackathon (illustrative concept target, not a claimed partnership)",
    primarySurface: "physical",
    connectedSurfaces: ["physical", "voice", "qr", "mobile", "followup"],
    whyLiveX:
      "The value is not a hologram at an event — plenty of vendors can render a face. The value is continuity: a guide that captures intent in the room and carries it, intact, onto the builder's phone and into the days after. That hand-off, with memory, is exactly what LiveX exists to do and what a static booth or a chatbot cannot.",
    whyNow:
      "Hackathons are the densest concentration of technical builders LiveX will ever stand in front of — future founders, future customers, future hires — and they arrive primed to try new tools. It is a rare setting where a physical-to-digital demo is also the product doing its actual job.",
    userJourney: [
      {
        id: "arrival",
        surface: "physical",
        title: "Arrival — visual curiosity",
        detail:
          "Walking in, a builder sees a stylized LiveX guide: a luminous, abstract presence at a kiosk, not a cartoon face. It turns toward them and asks one question — “What are you here to build?”",
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
          "“Continue on your phone.” A signal leaves the guide and resolves into a QR/device outline. They scan — and the exact context they just built is already waiting on their screen. Nothing re-typed.",
      },
      {
        id: "support",
        surface: "mobile",
        title: "Builder support in-hand",
        detail:
          "On mobile the guide becomes a focused companion: a suggested sponsor challenge, a workshop route on the venue map, a team-finding prompt, or a quick framework to unblock the idea — and it keeps answering.",
      },
      {
        id: "return",
        surface: "followup",
        title: "Return moments",
        detail:
          "Later, the same context resurfaces: a workshop reminder, a demo-practice nudge before judging, a showcase guide — each one visibly continuous with the guide they met on the floor.",
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
          "The guide absorbs the repetitive questions — where, when, which track, how do I — and routes attendees to the right room and the right people, lifting the floor experience without adding staff.",
      },
      {
        id: "sponsors",
        title: "Sponsors get discovered on purpose",
        detail:
          "Instead of a table people walk past, sponsor tracks are surfaced to builders whose stated intent actually matches — a warmer, opt-in path to the teams they came to meet.",
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
          "Measure engagement, hand-off, completion, sponsor actions, opt-in, and return sessions — so the story after the event is evidence, not vibes.",
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
          "Package what worked into a template other campus events — and eventually commercial venues — can reuse.",
      },
    ],
    gtmMotion:
      "Community-led, event-anchored. A single flagship activation seeds opt-in builder relationships and produces reusable proof that this physical-to-digital motion works — feeding both the campus program and the commercial field motion.",
    successSignals: [
      {
        signal: "Physical engagement rate",
        reads:
          "Of attendees who pass the guide, how many actually start an interaction — the honest read on whether the physical presence earns attention.",
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
          "Intent-matched sponsor track views or saves — the value the guide creates for partners.",
      },
      {
        signal: "Opt-in rate",
        reads:
          "How many choose to keep the relationship going — the quality signal that separates this from a badge scan.",
      },
      {
        signal: "Return-session rate",
        reads:
          "How many re-open a follow-up moment after the event — the flywheel actually turning.",
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
          "Make the mobile surface deliver something the room could not — a specific route, match, or framework — so continuity is felt, not claimed.",
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
    relatedStrategies: [
      "university-builder-program",
      "campus-ambassador-network",
      "sports-fan-experience",
    ],
    lens: {
      audience: "Student builders",
      surface: "Physical → Mobile",
      activation: "Flagship event",
      outcome: "Opt-in builder pipeline",
    },
  },

  // ================================================================
  // COLLEGE
  // ================================================================
  {
    id: "col-builder-program",
    slug: "university-builder-program",
    world: "college",
    title: "Top University Builder Program",
    shortTitle: "Builder Program",
    status: "Pilot hypothesis",
    priority: 2,
    visualTheme: "orbit",
    oneLineThesis:
      "A repeatable cohort program that turns high-signal student builders into LiveX's earliest power users — and its warmest future relationships.",
    strategicQuestion:
      "What is the smallest repeatable program that consistently converts a room of ambitious student builders into real LiveX usage and advocacy?",
    targetAudience:
      "High-signal builders inside selected universities — CS and design students, club leaders, and student founders already shipping side projects.",
    partnerType: "University programs, CS/entrepreneurship clubs, student labs",
    proposedPartner:
      "High-signal university CS / entrepreneurship programs (illustrative)",
    primarySurface: "web",
    connectedSurfaces: ["web", "mobile", "physical", "followup"],
    whyLiveX:
      "Student builders are the most honest possible testers: they will use a tool if it is genuinely good and abandon it instantly if it is not. A program that puts LiveX in their hands produces unfiltered product truth and a cohort of credible early advocates at the same time.",
    whyNow:
      "This audience adopts AI tooling faster than any other and talks constantly. Being early and useful in their build stack is cheaper now than trying to win their attention later as one of many.",
    userJourney: [
      {
        id: "discover",
        surface: "web",
        title: "Discovered through the people they trust",
        detail:
          "Students meet the program through their own clubs, labs, and founder communities — not a cold ad — via a lightweight application.",
      },
      {
        id: "activate",
        surface: "physical",
        title: "Cohort activation",
        detail:
          "A small cohort kicks off with a hands-on LiveX build session, framed around shipping something real that week.",
      },
      {
        id: "build",
        surface: "mobile",
        title: "Build with support in the loop",
        detail:
          "Between sessions the cohort keeps building with LiveX available as a companion, so usage is continuous, not a one-off workshop.",
      },
      {
        id: "demo",
        surface: "physical",
        title: "Demo opportunities",
        detail:
          "The cohort gets a real stage — a demo night or showcase — that rewards finishing and makes the work visible on campus.",
      },
      {
        id: "continue",
        surface: "followup",
        title: "Ambassador / alumni continuation",
        detail:
          "Standouts continue as ambassadors or alumni mentors, seeding the next cohort and keeping the relationship alive after the program.",
      },
    ],
    partnerJourney: [
      {
        id: "clubs",
        title: "Clubs and labs get real programming",
        detail:
          "Partner communities get a credible, hands-on program for their members instead of another sponsor logo — a reason to invite LiveX back.",
      },
      {
        id: "students",
        title: "Students get a stage and a network",
        detail:
          "Participants get build support, a demo moment, and a connection to a company that takes their work seriously.",
      },
      {
        id: "livex",
        title: "LiveX gets a repeatable engine",
        detail:
          "Each cohort is a controlled loop that produces usage data, product feedback, and advocates — and a pathway toward deeper partner relationships.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Pick two anchor campuses",
        detail:
          "Choose where the builder density and existing club relationships are strongest — depth over breadth.",
      },
      {
        label: "02",
        title: "Define one cohort ritual",
        detail:
          "A tight kickoff → build → demo loop that can run in weeks and be copied campus to campus.",
      },
      {
        label: "03",
        title: "Run a single cohort end-to-end",
        detail:
          "Instrument usage and gather product feedback; treat cohort one as research, not scale.",
      },
      {
        label: "04",
        title: "Convert standouts to ambassadors",
        detail:
          "Give the best builders a role in cohort two, turning graduates into the recruiting and support layer.",
      },
    ],
    gtmMotion:
      "Community-led and repeatable. A cohort ritual that compounds: usage and advocacy per campus, with graduates becoming the distribution layer for the next cohort and a bridge into the ambassador network.",
    successSignals: [
      {
        signal: "Activation rate",
        reads:
          "How many accepted builders actually ship something with LiveX in the first session — the honest read on whether the tool clicks.",
      },
      {
        signal: "Sustained usage",
        reads:
          "Whether usage continues between sessions rather than spiking once and dying.",
      },
      {
        signal: "Demo completion",
        reads:
          "How many finish and present — a proxy for real momentum, not just sign-ups.",
      },
      {
        signal: "Ambassador conversion",
        reads:
          "How many graduates opt into continuing — the compounding signal for the program.",
      },
      {
        signal: "Qualitative product feedback",
        reads:
          "The specific, unfiltered friction a builder audience surfaces — arguably the most valuable output.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "Programs like this decay into logo-on-a-flyer sponsorships.",
        mitigation:
          "Anchor every cohort in shipping real work; measure usage, not attendance.",
      },
      {
        risk: "Two campuses is not a pattern.",
        mitigation:
          "Only templatize after a cohort demonstrably repeats; resist scaling on hope.",
      },
      {
        risk: "Student time is scarce and semesters are brutal.",
        mitigation:
          "Keep the loop short and the payoff (stage, network, real output) obvious.",
      },
    ],
    nextStep: {
      horizon: "This semester",
      action: "Run one honest cohort",
      detail:
        "Stand up a single cohort at one anchor campus, instrument it fully, and let the data decide whether the ritual is worth repeating.",
    },
    relatedStrategies: [
      "treehacks-builder-guide",
      "campus-ambassador-network",
      "innovation-labs-fellowships",
    ],
    lens: {
      audience: "Selected builders",
      surface: "Web → Mobile",
      activation: "Cohort program",
      outcome: "Usage + advocates",
    },
  },

  {
    id: "col-ambassadors",
    slug: "campus-ambassador-network",
    world: "college",
    title: "Campus Ambassador Network",
    shortTitle: "Ambassador Network",
    status: "Concept",
    priority: 3,
    visualTheme: "network",
    oneLineThesis:
      "A distributed network of student operators who act as LiveX's human interface on campuses it can't staff.",
    strategicQuestion:
      "Can a network of trusted students become a distributed sensing-and-activation layer — carrying LiveX into rooms a GTM team will never physically reach?",
    targetAudience:
      "Student operators, creators, and community builders — the people who already run the clubs, events, and group chats that shape campus attention.",
    partnerType: "Individual student operators and their communities",
    proposedPartner: "Student operators & campus communities (illustrative)",
    primarySurface: "physical",
    connectedSurfaces: ["physical", "mobile", "web", "followup"],
    whyLiveX:
      "A GTM team cannot be in fifty rooms on fifty campuses. Trusted students can — and their word carries a credibility no ad buy purchases. The network is less a marketing channel than a distributed human interface: local activation on the ground, and a feedback signal flowing back to product and GTM.",
    whyNow:
      "Attention on campus lives inside student-run communities. Building relationships with the operators of those communities early is far cheaper than renting attention later.",
    userJourney: [
      {
        id: "recruit",
        surface: "web",
        title: "Recruitment",
        detail:
          "Ambassadors are recruited for genuine local influence and follow-through, not follower counts — a small, high-trust roster per campus.",
      },
      {
        id: "train",
        surface: "mobile",
        title: "Training & enablement",
        detail:
          "Each gets a tight playbook and the LiveX tools to run credible local moments, so quality stays consistent across a decentralized network.",
      },
      {
        id: "activate",
        surface: "physical",
        title: "Localized activations",
        detail:
          "Ambassadors run small, native events — a workshop, a demo table, a club night — that fit their community instead of a templated roadshow.",
      },
      {
        id: "capture",
        surface: "mobile",
        title: "Content & signal capture",
        detail:
          "Real moments become shareable content and structured feedback, giving LiveX eyes on dozens of campuses at once.",
      },
      {
        id: "loop",
        surface: "followup",
        title: "Referral & feedback loops",
        detail:
          "Ambassadors refer the next builders and route ground-truth back to product and GTM — the network becoming a two-way instrument.",
      },
    ],
    partnerJourney: [
      {
        id: "operators",
        title: "Operators get status and tools",
        detail:
          "Students get a real role, resources, and a relationship with a company — a line on the résumé that means something.",
      },
      {
        id: "community",
        title: "Communities get genuine value",
        detail:
          "Their members get useful events and access, not an extractive sponsorship.",
      },
      {
        id: "livex",
        title: "LiveX gets reach and sensing",
        detail:
          "Distributed activation plus a continuous feedback signal from the exact audiences it wants to understand.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Define what a great ambassador is",
        detail:
          "Local trust and follow-through over reach; write the bar down before recruiting.",
      },
      {
        label: "02",
        title: "Ship a tight playbook",
        detail:
          "One repeatable activation any ambassador can run well, plus the tools to run it.",
      },
      {
        label: "03",
        title: "Seed a small first roster",
        detail:
          "A handful of campuses, chosen for builder density and existing relationships.",
      },
      {
        label: "04",
        title: "Close the feedback loop",
        detail:
          "Give ambassadors a real channel into product and GTM so the signal actually lands.",
      },
    ],
    gtmMotion:
      "Distributed community-led. A human interface network that scales activation horizontally across campuses while returning continuous product and market signal — and feeds qualified builders into the cohort program.",
    successSignals: [
      {
        signal: "Ambassador activity rate",
        reads:
          "How many run real activations, not just hold a title — the health of the network.",
      },
      {
        signal: "Local reach per activation",
        reads:
          "The builders genuinely touched per event, judged on quality of audience over raw headcount.",
      },
      {
        signal: "Referral quality",
        reads:
          "Whether ambassador-referred builders convert into program usage.",
      },
      {
        signal: "Signal volume",
        reads:
          "The usable product/market feedback flowing back through the network.",
      },
      {
        signal: "Retention",
        reads:
          "Whether ambassadors stay engaged term over term — the durability of the layer.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "Ambassador programs often become inactive title-collectors.",
        mitigation:
          "Recruit for follow-through, keep the roster small, and measure activity — not headcount.",
      },
      {
        risk: "Decentralized activation can dilute the brand.",
        mitigation:
          "A tight playbook and clear guardrails keep quality consistent without micromanaging.",
      },
      {
        risk: "The feedback loop is easy to promise and hard to sustain.",
        mitigation:
          "Assign a real owner on the LiveX side so ground-truth actually reaches product.",
      },
    ],
    nextStep: {
      horizon: "Next 60 days",
      action: "Seed five, not fifty",
      detail:
        "Recruit a tiny first roster on the densest campuses, give them one great activation to run, and prove the human-interface model before scaling it.",
    },
    relatedStrategies: [
      "university-builder-program",
      "treehacks-builder-guide",
      "creator-interactive-campaigns",
    ],
    lens: {
      audience: "Student operators",
      surface: "Physical + Social",
      activation: "Distributed network",
      outcome: "Reach + market signal",
    },
  },

  {
    id: "col-innovation-labs",
    slug: "innovation-labs-fellowships",
    world: "college",
    title: "Innovation Labs, Fellowships & Student Founder Communities",
    shortTitle: "Labs & Fellowships",
    status: "Exploration",
    priority: 4,
    visualTheme: "lab",
    oneLineThesis:
      "LiveX as a live product surface inside the programs where student founders are already trying to build companies.",
    strategicQuestion:
      "Where founders are actively building, can LiveX embed as a genuinely useful build surface — and grow with the companies that emerge?",
    targetAudience:
      "Student founders and early teams inside university innovation labs, fellowships, and incubators — people with real projects and real deadlines.",
    partnerType: "University innovation labs, fellowships, student incubators",
    proposedPartner:
      "University innovation labs, fellowships & student incubators (illustrative)",
    primarySurface: "web",
    connectedSurfaces: ["web", "mobile", "physical", "partner", "followup"],
    whyLiveX:
      "Founder programs concentrate people with a real reason to adopt powerful tooling — they have a thing they are trying to make work. Being embedded as a build surface at that moment means LiveX grows up alongside companies rather than trying to sell to them later.",
    whyNow:
      "The next wave of AI-native startups is being prototyped inside these programs right now. Presence during formation is a durable advantage that is hard to buy after the fact.",
    userJourney: [
      {
        id: "embed",
        surface: "web",
        title: "Embedded as build support",
        detail:
          "LiveX shows up inside the program as a genuinely useful surface for founders' actual projects — not a lunch-and-learn.",
      },
      {
        id: "demo",
        surface: "physical",
        title: "Founder-facing demos",
        detail:
          "Hands-on sessions show what LiveX makes newly possible, tied to the problems teams are already chewing on.",
      },
      {
        id: "intro",
        surface: "partner",
        title: "Partner introductions",
        detail:
          "Where it fits, LiveX opens doors — connecting founders to people and resources, deepening the relationship beyond a tool.",
      },
      {
        id: "poc",
        surface: "mobile",
        title: "Proof-of-concept pathways",
        detail:
          "Teams take a real idea to a working proof-of-concept on LiveX, so value is demonstrated, not described.",
      },
      {
        id: "future",
        surface: "followup",
        title: "Future startup & customer relationships",
        detail:
          "Companies that grow out of these programs carry an existing LiveX relationship into their next stage.",
      },
    ],
    partnerJourney: [
      {
        id: "programs",
        title: "Programs get a real capability",
        detail:
          "Labs and fellowships get a tangible build advantage for their teams — a reason to keep LiveX close.",
      },
      {
        id: "founders",
        title: "Founders get leverage",
        detail:
          "Teams get a tool that helps them ship faster and introductions that help them grow.",
      },
      {
        id: "livex",
        title: "LiveX gets formation-stage presence",
        detail:
          "Relationships with companies at the moment they are deciding what to build on.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Find aligned programs",
        detail:
          "Prioritize labs and fellowships whose founders' problems actually fit what LiveX does well.",
      },
      {
        label: "02",
        title: "Embed as a build surface",
        detail:
          "Make LiveX available for real projects, not a one-off talk — presence over pitch.",
      },
      {
        label: "03",
        title: "Support real proofs-of-concept",
        detail:
          "Help a few teams reach a working POC and let those become the reference stories.",
      },
      {
        label: "04",
        title: "Nurture the durable relationships",
        detail:
          "Stay close to the teams that grow — the long-term payoff of this motion.",
      },
    ],
    gtmMotion:
      "Ecosystem-embedded and relationship-led. The slowest-burn College motion but the deepest: value proven through real founder projects, compounding into startup and customer relationships that mature over years.",
    successSignals: [
      {
        signal: "Program embedment",
        reads:
          "Whether LiveX becomes a standing resource inside the program vs. a single guest session.",
      },
      {
        signal: "POC completion",
        reads:
          "How many teams reach a working proof-of-concept — value demonstrated in the real world.",
      },
      {
        signal: "Founder retention",
        reads:
          "Whether teams keep using LiveX after the program ends.",
      },
      {
        signal: "Relationship depth",
        reads:
          "Qualitative: introductions made and trust built, tracked as pipeline health, not revenue.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "Long time-to-signal makes it easy to under-resource.",
        mitigation:
          "Set expectations that this is a multi-quarter relationship motion and staff it patiently.",
      },
      {
        risk: "Fit varies enormously across programs.",
        mitigation:
          "Be selective; a few aligned programs beat broad, shallow presence.",
      },
      {
        risk: "Founder attention is fully consumed by their own company.",
        mitigation:
          "Only show up where LiveX makes their actual build materially easier.",
      },
    ],
    nextStep: {
      horizon: "This quarter",
      action: "Embed in one program",
      detail:
        "Choose a single well-aligned lab or fellowship, make LiveX a real build surface for its teams, and let a working POC become the reference.",
    },
    relatedStrategies: [
      "university-builder-program",
      "treehacks-builder-guide",
      "enterprise-experience-sprints",
    ],
    lens: {
      audience: "Student founders",
      surface: "Web + Product",
      activation: "Ecosystem embed",
      outcome: "Long-term relationships",
    },
  },

  // ================================================================
  // STANDARD
  // ================================================================
  {
    id: "std-sports",
    slug: "sports-fan-experience",
    world: "standard",
    title: "Sports & Fan Experience Partnerships",
    shortTitle: "Sports & Fans",
    status: "Concept",
    priority: 1,
    visualTheme: "arena",
    oneLineThesis:
      "Turn a physical fan moment inside a venue into a digital relationship that survives the final whistle.",
    strategicQuestion:
      "Can a LiveX guide inside a venue convert a fleeting, in-person fan moment into a personalized digital relationship that continues after the crowd goes home?",
    targetAudience:
      "Fans inside a venue or live event — arriving, wayfinding, buying, and looking for something to remember it by.",
    partnerType: "Venues, teams, leagues, and live-event rights holders",
    proposedPartner:
      "Venues, teams, and live-event rights holders (illustrative)",
    primarySurface: "physical",
    connectedSurfaces: ["physical", "qr", "mobile", "followup", "partner"],
    whyLiveX:
      "Live venues generate enormous, emotional physical engagement that almost entirely evaporates when fans leave — the relationship rarely outlives the event. A single LiveX intelligence can connect the in-venue moment to digital follow-up, so a physical high becomes an ongoing, ownable relationship for the partner.",
    whyNow:
      "Venues are investing heavily in fan experience and first-party data, but most digital touchpoints are disconnected apps. A guide that ties the physical moment to what comes next is a differentiated, demonstrable upgrade.",
    userJourney: [
      {
        id: "entry",
        surface: "physical",
        title: "Venue / event entry",
        detail:
          "Arriving, a fan meets a LiveX guide that helps them orient — seat, gates, timing, what not to miss — in the exact moment they are lost in a crowd.",
      },
      {
        id: "onsite",
        surface: "physical",
        title: "On-site guidance",
        detail:
          "Through the event the guide answers the real questions — concessions, merch, moments — with context about where they are and what is happening.",
      },
      {
        id: "handoff",
        surface: "qr",
        title: "QR-to-mobile handoff",
        detail:
          "A scan carries the fan's context to their phone: their seat, their team, the thing they were looking at — now personalized and in-hand.",
      },
      {
        id: "personal",
        surface: "mobile",
        title: "Personalized content or merch",
        detail:
          "On mobile the fan gets something tied to their moment — a personalized highlight, a merch path, an offer that fits — rather than a generic blast.",
      },
      {
        id: "reengage",
        surface: "followup",
        title: "Post-event re-engagement",
        detail:
          "Afterward the same intelligence re-engages: a memory from the night, the next fixture, a reason to come back — continuous with the in-venue guide.",
      },
    ],
    partnerJourney: [
      {
        id: "venue",
        title: "The venue gets a smoother house",
        detail:
          "Wayfinding and questions get absorbed by the guide, easing pressure on staff at peak moments.",
      },
      {
        id: "rights",
        title: "The rights holder gets a relationship",
        detail:
          "A fan moment becomes first-party engagement and a channel they own after the event — the thing venues most want.",
      },
      {
        id: "livex",
        title: "LiveX gets a flagship commercial proof",
        detail:
          "A visible, high-emotion demonstration of physical-to-digital continuity at scale.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Pick one venue moment",
        detail:
          "Choose the sharpest friction — entry wayfinding or a specific merch/queue moment — and own it end-to-end.",
      },
      {
        label: "02",
        title: "Build guide + hand-off",
        detail:
          "A physical guide plus the QR-to-mobile bridge that carries context, personalized to the fan's seat and moment.",
      },
      {
        label: "03",
        title: "Design the follow-up",
        detail:
          "Pre-build the post-event re-engagement so the relationship persists beyond the night.",
      },
      {
        label: "04",
        title: "Instrument and expand",
        detail:
          "Measure engagement, hand-off, and return; use the result to expand across the venue or to another event.",
      },
    ],
    gtmMotion:
      "Partner-led commercial pilot. A contained, high-visibility venue activation that proves physical-to-digital fan continuity, generates first-party engagement for the partner, and becomes a reference for the broader field motion.",
    successSignals: [
      {
        signal: "Physical engagement rate",
        reads:
          "Of fans who encounter the guide, how many engage — attention earned in a chaotic environment.",
      },
      {
        signal: "Scan-to-mobile handoff rate",
        reads:
          "How many carry the moment to their phone — the core continuity proof.",
      },
      {
        signal: "Personalization actions",
        reads:
          "Interactions with the personalized content or merch path — value delivered to the fan.",
      },
      {
        signal: "Opt-in rate",
        reads:
          "How many consent to an ongoing relationship — first-party value for the partner.",
      },
      {
        signal: "Post-event return rate",
        reads:
          "How many re-engage after the event — the relationship outliving the moment.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "Venues are noisy, crowded, connectivity-hostile environments.",
        mitigation:
          "Design for glance-and-go interactions and graceful offline fallback.",
      },
      {
        risk: "Fan data and personalization raise real privacy stakes.",
        mitigation:
          "Make opt-in explicit and data handling a first-class design constraint with the partner.",
      },
      {
        risk: "Rights, sponsorship, and approval chains are complex.",
        mitigation:
          "Scope one contained moment first; avoid boiling the ocean of a whole venue.",
      },
    ],
    nextStep: {
      horizon: "Next quarter",
      action: "Own one moment in one venue",
      detail:
        "Prototype the entry-to-mobile hand-off for a single event and measure whether the relationship survives the final whistle.",
    },
    relatedStrategies: [
      "creator-interactive-campaigns",
      "retail-hospitality-concierge",
      "treehacks-builder-guide",
    ],
    lens: {
      audience: "Live-event fans",
      surface: "Physical → Mobile",
      activation: "Venue pilot",
      outcome: "First-party relationship",
    },
  },

  {
    id: "std-creators",
    slug: "creator-interactive-campaigns",
    world: "standard",
    title: "Creator-Led Interactive Campaigns",
    shortTitle: "Creator Campaigns",
    status: "Pilot hypothesis",
    priority: 2,
    visualTheme: "stage",
    oneLineThesis:
      "Give a creator or IP a LiveX-powered interactive presence that turns audience curiosity into product discovery and continuity.",
    strategicQuestion:
      "Can a creator's LiveX presence be a real distribution and conversion surface — not a novelty avatar — that moves an audience from curiosity to action?",
    targetAudience:
      "A creator's or IP's existing audience — fans primed to engage, encountered on-platform, at events, or through a campaign.",
    partnerType: "Creators, entertainers, and IP owners",
    proposedPartner: "Creators, entertainers, and IP owners (illustrative)",
    primarySurface: "web",
    connectedSurfaces: ["web", "mobile", "physical", "followup", "partner"],
    whyLiveX:
      "The strategic point is not a talking avatar — it is the distribution and conversion logic underneath. A creator has attention and trust; LiveX can turn that attention into a personalized, two-way experience that discovers products, drives action, and continues past the campaign. That is a real funnel wearing the creator's face, not a gimmick.",
    whyNow:
      "Audiences increasingly expect interactive, personalized experiences from creators, and creators are hunting for deeper monetization than a sponsored post. A LiveX presence answers both.",
    userJourney: [
      {
        id: "curiosity",
        surface: "web",
        title: "Audience curiosity",
        detail:
          "A fan encounters the creator's LiveX presence and is drawn in by the promise of a real, personalized interaction rather than a broadcast.",
      },
      {
        id: "engage",
        surface: "mobile",
        title: "Personalized engagement",
        detail:
          "The experience responds to who they are and what they want — a two-way moment that feels made for them.",
      },
      {
        id: "discover",
        surface: "mobile",
        title: "Product discovery",
        detail:
          "Inside that engagement, relevant products or drops surface naturally — discovery as part of the experience, not an ad break.",
      },
      {
        id: "activate",
        surface: "physical",
        title: "On-site or campaign activation",
        detail:
          "At an event or campaign peak, the same presence shows up physically, extending the moment into real space.",
      },
      {
        id: "continue",
        surface: "followup",
        title: "Shareable moments & continuity",
        detail:
          "Fans get something worth sharing, and the presence persists past the campaign as an ongoing channel to the audience.",
      },
    ],
    partnerJourney: [
      {
        id: "creator",
        title: "The creator gets deeper monetization",
        detail:
          "A genuinely interactive surface that converts attention into action and outlasts a single post.",
      },
      {
        id: "audience",
        title: "The audience gets something real",
        detail:
          "A personalized experience with the creator or IP they follow, not a generic promo.",
      },
      {
        id: "livex",
        title: "LiveX gets consumer-scale distribution",
        detail:
          "Access to a creator's audience and proof that its intelligence drives real conversion.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Pick a creator with real fit",
        detail:
          "Aligned audience, genuine trust, and a product/discovery angle worth building around.",
      },
      {
        label: "02",
        title: "Design the funnel, not the avatar",
        detail:
          "Start from curiosity → engagement → discovery → action and let the persona serve that logic.",
      },
      {
        label: "03",
        title: "Run one campaign end-to-end",
        detail:
          "Ship a contained campaign with clear surfaces and continuity built in.",
      },
      {
        label: "04",
        title: "Measure conversion and continuity",
        detail:
          "Judge it on discovery and return, not on views — then decide whether to extend.",
      },
    ],
    gtmMotion:
      "Creator-led consumer distribution. A partner's audience becomes LiveX's reach; the campaign proves conversion logic and produces a repeatable interactive-presence pattern other creators and IP can adopt.",
    successSignals: [
      {
        signal: "Engagement depth",
        reads:
          "Whether fans have a real two-way interaction vs. a single tap — the difference from a novelty.",
      },
      {
        signal: "Discovery actions",
        reads:
          "Product or drop discovery inside the experience — the funnel working.",
      },
      {
        signal: "Conversion signal",
        reads:
          "Movement from discovery to intended action, tracked as a signal (no revenue claims).",
      },
      {
        signal: "Shareability",
        reads:
          "Whether the moment travels — organic reach beyond the initial audience.",
      },
      {
        signal: "Post-campaign retention",
        reads:
          "Whether the audience stays engaged after the campaign ends.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "It reads as a novelty avatar and the strategy dies as a stunt.",
        mitigation:
          "Lead with the funnel and utility; the persona is a wrapper on real value.",
      },
      {
        risk: "Creator fit and audience mismatch can sink it.",
        mitigation:
          "Select for genuine alignment over reach; one right creator beats three wrong ones.",
      },
      {
        risk: "Likeness, rights, and brand-safety obligations.",
        mitigation:
          "Treat rights and representation as explicit, up-front agreements.",
      },
    ],
    nextStep: {
      horizon: "Next quarter",
      action: "One creator, one funnel",
      detail:
        "Build a single campaign designed around conversion and continuity, and prove the presence is a channel — not a stunt.",
    },
    relatedStrategies: [
      "sports-fan-experience",
      "campus-ambassador-network",
      "retail-hospitality-concierge",
    ],
    lens: {
      audience: "Creator audiences",
      surface: "Web → Mobile",
      activation: "Campaign",
      outcome: "Conversion + reach",
    },
  },

  {
    id: "std-retail",
    slug: "retail-hospitality-concierge",
    world: "standard",
    title: "Retail & Hospitality AI Concierge Pilots",
    shortTitle: "Retail Concierge",
    status: "Pilot hypothesis",
    priority: 3,
    visualTheme: "concourse",
    oneLineThesis:
      "A physical AI concierge with a real job — welcome, guide, book, and follow up — that upgrades a specific in-store moment.",
    strategicQuestion:
      "In a store or venue, can a LiveX concierge do a concrete, valuable job well enough that the before-and-after is obvious to the operator?",
    targetAudience:
      "Customers and guests in a physical retail or hospitality space — arriving, looking for something, or needing help in the moment.",
    partnerType: "Flagship retail and hospitality operators",
    proposedPartner: "Flagship retail & hospitality operators (illustrative)",
    primarySurface: "physical",
    connectedSurfaces: ["physical", "voice", "qr", "mobile", "followup"],
    whyLiveX:
      "Retail and hospitality run on moments of need that go unmet because staff can't be everywhere — a question unanswered, a product not found, a booking not made. A LiveX concierge with a clearly scoped job turns those gaps into helpful, measurable interactions, and hands the guest to mobile so the relationship and loyalty continue past the visit.",
    whyNow:
      "Operators are actively piloting in-store technology and want practical, staff-augmenting tools rather than spectacle. A concierge with a concrete job is an easy pilot to justify.",
    userJourney: [
      {
        id: "welcome",
        surface: "physical",
        title: "Welcome",
        detail:
          "A guest is greeted by the concierge and oriented immediately — what's here, what's new, where to go — instead of wandering.",
      },
      {
        id: "guide",
        surface: "voice",
        title: "Product / service guidance",
        detail:
          "They ask for what they need and get a genuinely useful answer — a recommendation, a comparison, a location — in the moment of intent.",
      },
      {
        id: "support",
        surface: "physical",
        title: "Inventory or booking support",
        detail:
          "The concierge checks availability or makes a booking — doing the concrete job that would otherwise require finding a staff member.",
      },
      {
        id: "handoff",
        surface: "qr",
        title: "QR handoff",
        detail:
          "A scan carries the interaction to the guest's phone: their selection, booking, or list — now portable.",
      },
      {
        id: "loyalty",
        surface: "followup",
        title: "Loyalty capture & follow-up",
        detail:
          "On mobile, the guest can join loyalty and receive relevant follow-up — turning a single visit into a returning relationship.",
      },
    ],
    partnerJourney: [
      {
        id: "before",
        title: "Before: unmet moments",
        detail:
          "Questions go unanswered, staff are stretched, and intent is lost at the exact moment a guest is ready to act.",
      },
      {
        id: "after",
        title: "After: an augmented floor",
        detail:
          "The concierge absorbs routine needs and captures intent, letting staff focus on high-value service while more moments convert.",
      },
      {
        id: "livex",
        title: "LiveX gets an operational proof",
        detail:
          "A practical, measurable deployment that shows the concierge does a real job — the reference enterprise buyers trust.",
      },
    ],
    activationPlan: [
      {
        label: "01",
        title: "Scope one concrete job",
        detail:
          "Choose a single high-value task — find-a-product, book-a-table — and make the concierge excellent at exactly that.",
      },
      {
        label: "02",
        title: "Deploy in one location",
        detail:
          "A contained pilot in a single store or venue with a clear before/after to measure.",
      },
      {
        label: "03",
        title: "Wire the hand-off and loyalty",
        detail:
          "Carry the interaction to mobile and connect loyalty so the visit produces a relationship.",
      },
      {
        label: "04",
        title: "Prove the delta and expand",
        detail:
          "Show the operator the measurable improvement, then extend to more locations or jobs.",
      },
    ],
    gtmMotion:
      "Operator-led commercial pilot. A single-location, single-job deployment that proves practical value and a clean before/after, building the operational credibility that scales to a rollout.",
    successSignals: [
      {
        signal: "Interaction volume",
        reads:
          "How many guests actually use the concierge — real demand for the job it does.",
      },
      {
        signal: "Task completion rate",
        reads:
          "How often it finishes the concrete job (found, booked, answered) — the core value.",
      },
      {
        signal: "Handoff & loyalty capture",
        reads:
          "How many carry it to mobile and join loyalty — the relationship forming.",
      },
      {
        signal: "Staff time reclaimed",
        reads:
          "Qualitative operator read on routine load absorbed — the augmentation case.",
      },
      {
        signal: "Return visit signal",
        reads:
          "Whether follow-up drives measurable return — the loyalty loop closing.",
      },
    ],
    risksAndDependencies: [
      {
        risk: "A vague concierge does everything poorly and proves nothing.",
        mitigation:
          "Scope one job and be genuinely excellent at it before adding more.",
      },
      {
        risk: "It must integrate with real inventory / booking systems.",
        mitigation:
          "Treat integration as core scope; a concierge that can't act is a demo, not a pilot.",
      },
      {
        risk: "In-store placement and staff buy-in matter enormously.",
        mitigation:
          "Design with floor staff as partners, positioning the concierge as augmentation, not replacement.",
      },
    ],
    nextStep: {
      horizon: "Next quarter",
      action: "One job, one location",
      detail:
        "Deploy a tightly scoped concierge that does one valuable job well, and put a clean before/after in front of the operator.",
    },
    relatedStrategies: [
      "sports-fan-experience",
      "enterprise-experience-sprints",
      "creator-interactive-campaigns",
    ],
    lens: {
      audience: "In-store guests",
      surface: "Physical → Mobile",
      activation: "Location pilot",
      outcome: "Conversion + loyalty",
    },
  },

  {
    id: "std-enterprise",
    slug: "enterprise-experience-sprints",
    world: "standard",
    title: "Forward-Deployed Enterprise Experience Sprints",
    shortTitle: "Enterprise Sprints",
    status: "Exploration",
    priority: 4,
    visualTheme: "sprint",
    oneLineThesis:
      "A high-conviction operating model: find a sharp customer moment with a partner and build a focused LiveX experience around it, fast.",
    strategicQuestion:
      "What is the repeatable operating model for co-building a focused LiveX experience with a strategic partner — sharp enough to deploy, instrumented enough to expand?",
    targetAudience:
      "A strategic partner's own customers at a specific, high-value moment in their journey — the sharp point where a focused experience changes the outcome.",
    partnerType: "Strategic enterprise accounts",
    proposedPartner: "Strategic enterprise accounts (illustrative)",
    primarySurface: "partner",
    connectedSurfaces: ["partner", "physical", "web", "mobile", "followup"],
    whyLiveX:
      "Enterprises don't want a generic platform pitch — they want a sharp experience that solves a real customer moment and proof it works before they commit. A forward-deployed sprint gives them exactly that: LiveX embeds, finds the sharp moment, ships a focused experience in a contained environment, and instruments the result. It is a serious operating model, not a sales funnel.",
    whyNow:
      "Enterprises are under pressure to show concrete AI outcomes and are wary of open-ended platform commitments. A contained, instrumented sprint is the lowest-risk way for them to say yes — and the fastest way for LiveX to earn expansion.",
    userJourney: [
      {
        id: "moment",
        surface: "partner",
        title: "Identify a sharp customer moment",
        detail:
          "Embedded with the partner, LiveX finds the single high-value moment in their customer journey where a focused experience would change the outcome.",
      },
      {
        id: "define",
        surface: "web",
        title: "Define surface & action layer",
        detail:
          "Decide precisely which surface the experience lives on and what concrete actions the agent can take — scope discipline over scope creep.",
      },
      {
        id: "prototype",
        surface: "mobile",
        title: "Prototype a focused agent",
        detail:
          "Build a tight LiveX agent aimed at that one moment — not a platform, a scalpel.",
      },
      {
        id: "deploy",
        surface: "physical",
        title: "Deploy in a contained environment",
        detail:
          "Ship it into a bounded slice of the real journey where results can be observed cleanly.",
      },
      {
        id: "instrument",
        surface: "followup",
        title: "Instrument, then expand or iterate",
        detail:
          "Measure the result honestly, then make the evidence-based call to expand the surface or iterate the approach.",
      },
    ],
    partnerJourney: [
      {
        id: "sharp",
        title: "The partner gets a real outcome",
        detail:
          "A focused experience that changes a concrete customer moment — not a platform they have to figure out.",
      },
      {
        id: "contained",
        title: "The partner gets low-risk proof",
        detail:
          "A contained, instrumented deployment that de-risks the decision to go further.",
      },
      {
        id: "livex",
        title: "LiveX gets an expansion path",
        detail:
          "A repeatable forward-deployed model that turns one sharp win into a widening relationship.",
      },
    ],
    activationPlan: [
      {
        label: "Week 0–1",
        title: "Identify the moment",
        detail:
          "Forward-deploy with the partner to find the single sharpest customer moment worth building around.",
      },
      {
        label: "Week 1–2",
        title: "Define surface + actions",
        detail:
          "Lock the surface and the concrete action layer; ruthless scope discipline.",
      },
      {
        label: "Week 2–4",
        title: "Prototype the focused agent",
        detail:
          "Build a scalpel, not a platform — aimed at that one moment.",
      },
      {
        label: "Week 4–6",
        title: "Deploy + instrument",
        detail:
          "Ship into a contained slice of the real journey and measure the result.",
      },
      {
        label: "Week 6+",
        title: "Expand or iterate",
        detail:
          "Make the evidence-based call: widen the surface or refine the approach.",
      },
    ],
    gtmMotion:
      "Forward-deployed, high-conviction enterprise motion. A serious operating model — embed, find the sharp moment, ship focused, instrument, expand — that lands durable enterprise relationships through proof rather than pitch.",
    successSignals: [
      {
        signal: "Moment clarity",
        reads:
          "Whether the team truly isolated one sharp, high-value moment — the discipline the model depends on.",
      },
      {
        signal: "Time to deployed prototype",
        reads:
          "How fast a focused agent reaches a contained live environment — the model's velocity.",
      },
      {
        signal: "In-moment outcome",
        reads:
          "Whether the experience measurably changed the targeted customer moment.",
      },
      {
        signal: "Expansion decision",
        reads:
          "Whether the instrumented result earned a clear yes to expand — the point of the sprint.",
      },
      {
        signal: "Relationship trajectory",
        reads:
          "Qualitative: whether one sharp win widened the partnership (pipeline health, not revenue).",
      },
    ],
    risksAndDependencies: [
      {
        risk: "Scope creep turns a scalpel into a doomed platform build.",
        mitigation:
          "Hold the line on one moment, one surface, one action layer.",
      },
      {
        risk: "Forward-deployment is talent-intensive and hard to scale.",
        mitigation:
          "Templatize the operating model so each sprint gets faster and less bespoke.",
      },
      {
        risk: "Enterprise data, security, and procurement gates.",
        mitigation:
          "Choose a contained environment that sidesteps the heaviest gates for the first proof.",
      },
    ],
    nextStep: {
      horizon: "Next 6 weeks",
      action: "Run one sprint end-to-end",
      detail:
        "Pick one strategic account, isolate one sharp moment, and ship a focused, instrumented experience — then let the result decide expansion.",
    },
    relatedStrategies: [
      "retail-hospitality-concierge",
      "innovation-labs-fellowships",
      "sports-fan-experience",
    ],
    lens: {
      audience: "Partner customers",
      surface: "Partner-owned",
      activation: "Deployment sprint",
      outcome: "Proof → expansion",
    },
  },
];

// ------------------------------------------------------------------
// Selectors — the only surface layout code touches.
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
