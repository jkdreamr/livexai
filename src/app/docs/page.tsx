import type { Metadata } from "next";
import { DocsShell } from "@/components/docs/DocsShell";
import { DocsSection } from "@/components/docs/DocsSection";
import { DocsEyebrow } from "@/components/docs/DocsEyebrow";

export const metadata: Metadata = {
  title: "Docs · the thinking behind the map",
  description:
    "An internal document. How the demo works, why TreeHacks is the first College bet, illustrative sponsorship directions, and what we would measure.",
};

/* Illustrative sponsorship prize directions. Nothing here is signed or priced. */
const PRIZE_DIRECTIONS = [
  {
    title: "Best use of a live agent",
    detail:
      "A track prize for the team that puts a LiveX-style agent to the sharpest use inside their own build. Rewards real integration, not a logo on a slide.",
  },
  {
    title: "Best physical-to-digital moment",
    detail:
      "For the project that carries context across a real handoff: a scan, a room, a device. It maps to the exact thing the demo is showing on the floor.",
  },
  {
    title: "Continuity prize",
    detail:
      "For a build that still does something useful after the event ends. It rewards the memory idea instead of a one-off demo.",
  },
];

const PARTNER_VALUE = [
  {
    title: "Organizers get a lighter floor",
    detail:
      "The guide answers the repeated questions (where, when, which track, how do I start) and points people to the right room. That is help the organizing team does not have to staff.",
  },
  {
    title: "Sponsors get found on purpose",
    detail:
      "Sponsor tracks surface to builders whose stated intent actually matches, so the people who walk up already care. That is a warmer path than a table people pass by.",
  },
  {
    title: "LiveX gets proof in the room",
    detail:
      "We show a physical-to-digital handoff to the exact audience we want, and we leave with opt-in relationships instead of badge scans.",
  },
];

const SIGNALS = [
  {
    signal: "Physical engagement rate",
    reads:
      "Of the people who pass the guide, how many start an interaction. The honest read on whether the physical presence earns attention.",
  },
  {
    signal: "Handoff rate",
    reads:
      "Of those who engage, how many carry it to their phone. This is the core proof that the handoff, with context, works.",
  },
  {
    signal: "Completion rate",
    reads:
      "How many reach a useful outcome, like a team lead, a route, or an unblocked idea, instead of bouncing.",
  },
  {
    signal: "Sponsor discovery actions",
    reads:
      "Intent-matched sponsor track views or saves. The value the guide creates for partners.",
  },
  {
    signal: "Opt-in rate",
    reads:
      "How many choose to keep the relationship going. The quality signal that separates this from a scan.",
  },
  {
    signal: "Return-session rate",
    reads:
      "How many re-open a follow-up moment after the event. The flywheel actually turning.",
  },
];

/* The three actions a builder can take on the mobile guide, plus the chatbot. */
const BUILDER_ACTIONS = [
  {
    tag: "Check in",
    detail:
      "The builder tells the guide what they are here to do: find a team, pick a track, get unstuck. The agent reflects it back and sets up everything after.",
  },
  {
    tag: "Sponsors",
    detail:
      "The guide surfaces sponsor tracks that match the stated intent, so a builder sees the challenges worth their time instead of a wall of tables.",
  },
  {
    tag: "Events",
    detail:
      "Workshops, deadlines, and demo windows laid out as a route through the day, with reminders that reappear when they matter.",
  },
];

export default function DocsPage() {
  return (
    <article>
      {/* Hero */}
      <header className="container-x pt-24">
        <DocsEyebrow />
        <h1 className="text-display fluid-hero mt-6 max-w-3xl">Docs</h1>
        <p className="body-measure fluid-lead mt-8 max-w-2xl text-ink-soft">
          An internal working document. It holds the reasoning behind the first
          College bet, how the live demo is put together, and the illustrative
          directions we would take a sponsorship. Read it top to bottom, or jump
          around with the outline on the left.
        </p>
      </header>

      <DocsShell>
        {/* Intro: how these docs work */}
        <div className="mb-16 border-b border-line pb-14">
          <p className="label mb-4 text-brand">How these docs work</p>
          <div className="body-measure flex flex-col gap-4 text-ink-soft">
            <p>
              The outline on the left is the whole document. It is grouped by the
              two go-to-market worlds. College holds the work that is furthest
              along, which is the TreeHacks concept. Standard holds partners we
              are still only thinking about. Open a branch to see its sections,
              click a section to jump to it, and the outline tracks where you are
              as you scroll.
            </p>
            <p>
              Everything below is a hypothesis. The prizes and the case for
              sponsoring are illustrative directions, written to show the shape
              of a deal, not to claim one. There are no real figures and no real
              logos. Where a term or a point of contact belongs, it is left as a
              placeholder for the team to fill in.
            </p>
          </div>
        </div>

        <div className="flex flex-col gap-12">
          {/* ==================== MY THOUGHTS ==================== */}
          <DocsSection
            id="my-thoughts-notes"
            eyebrow="My Thoughts"
            title="My Thoughts"
            accent="brand"
          >
            <div className="rounded-xl border border-dashed border-line-strong p-7">
              <p className="label-tight mb-3 text-brand">Working notes</p>
              <div className="body-measure flex flex-col gap-4 text-ink-soft">
                <p>
                  A space for my own running notes on these bets. What I believe,
                  what I am unsure about, and what would change my mind.
                </p>
                <p className="text-ink-faint">To be filled in.</p>
              </div>
            </div>
          </DocsSection>

          {/* ==================== COLLEGE · TREEHACKS ==================== */}
          <DocsSection
            id="why-treehacks"
            eyebrow="College · TreeHacks"
            title="Why TreeHacks"
            accent="college"
          >
            <div className="body-measure flex flex-col gap-4 text-ink-soft">
              <p>
                A hackathon is the densest room of technical builders LiveX will
                stand in front of. Future founders, future customers, future
                hires, all in one place and all willing to try a new tool on the
                spot. That makes it a rare setting where a physical-to-digital
                demo is also the product doing its real job.
              </p>
              <p>
                It runs the other way too. TreeHacks gets a guide that absorbs
                the repeated questions and points people to the right room,
                which lifts the floor without adding staff. The fit is that the
                thing we want to show off is the same thing the event actually
                needs.
              </p>
              <p>
                What we would bring is not a face at a kiosk. Plenty of vendors
                can render a face. The point is continuity: an agent that
                captures intent in the room and carries it, intact, onto the
                builder&rsquo;s phone and into the days after. A booth or a plain
                chatbot cannot do that.
              </p>
            </div>
          </DocsSection>

          <DocsSection
            id="how-the-demo-works"
            eyebrow="College · TreeHacks"
            title="How the demo works"
            accent="college"
          >
            <div className="body-measure flex flex-col gap-4 text-ink-soft">
              <p>
                The demo is an interactive Builder Guide. At its center is one
                agent that greets a builder on the floor, captures what they are
                there to do, and hands that context to their phone with a scan.
                Nothing gets re-typed. On mobile, the same agent gives the
                builder three things to do and answers questions along the way.
              </p>
            </div>

            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-3">
              {BUILDER_ACTIONS.map((a) => (
                <div key={a.tag} className="flex flex-col gap-2 bg-void p-5">
                  <span className="label-tight text-college">{a.tag}</span>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    {a.detail}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-lg border border-line bg-charcoal p-5">
              <span className="label-tight text-college">Chatbot</span>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Underneath the three actions, the guide is a chatbot the builder
                can ask anything: where a workshop is, how a track works, what to
                do next. It keeps the context it already has, so answers stay
                specific to that builder&rsquo;s day.
              </p>
            </div>
          </DocsSection>

          <DocsSection
            id="sponsorship-prizes"
            eyebrow="College · TreeHacks"
            title="Possible sponsorship prizes"
            accent="college"
          >
            <p className="body-measure text-ink-soft">
              These are illustrative prize directions, not a set offer. Each one
              is written to reward the behavior we actually care about, which is
              real use of a live agent rather than a mention on a slide. Amounts
              and terms are a placeholder for the team.
            </p>
            <ul className="mt-8 divide-y divide-line border-y border-line">
              {PRIZE_DIRECTIONS.map((p) => (
                <li key={p.title} className="py-4">
                  <p className="text-sm text-ink">{p.title}</p>
                  <p className="mt-1 text-sm leading-relaxed text-ink-dim">
                    {p.detail}
                  </p>
                </li>
              ))}
            </ul>
          </DocsSection>

          <DocsSection
            id="why-sponsor"
            eyebrow="College · TreeHacks"
            title="Why we should sponsor"
            accent="college"
          >
            <p className="body-measure text-ink-soft">
              A sponsorship is worth it if all three sides come out ahead. Here
              is the case, framed as directions we believe hold rather than a
              committed plan.
            </p>
            <div className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line">
              {PARTNER_VALUE.map((v) => (
                <div key={v.title} className="flex flex-col gap-2 bg-void p-6">
                  <p className="text-sm text-ink">{v.title}</p>
                  <p className="text-sm leading-relaxed text-ink-dim">
                    {v.detail}
                  </p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-xl border border-dashed border-line-strong p-6">
              <p className="label text-ink-dim">
                Sponsorship terms · point of contact
              </p>
              <p className="mt-3 text-sm leading-relaxed text-ink-faint">
                To be added by the LiveX team. This is where the real
                sponsorship tier, the deliverables, and the named point of
                contact go once there is something to commit to.
              </p>
            </div>
          </DocsSection>

          <DocsSection
            id="measurement-signals"
            eyebrow="College · TreeHacks"
            title="Measurement signals"
            accent="college"
          >
            <p className="body-measure text-ink-soft">
              We would name the signals to watch, not invent numbers. Each one
              says what a healthy read would indicate. No targets are set here on
              purpose.
            </p>
            <dl className="mt-8 grid gap-px overflow-hidden rounded-lg border border-line bg-line sm:grid-cols-2">
              {SIGNALS.map((s) => (
                <div key={s.signal} className="flex flex-col gap-2 bg-void p-5">
                  <dt className="font-mono text-sm text-college">{s.signal}</dt>
                  <dd className="text-sm leading-relaxed text-ink-dim">
                    {s.reads}
                  </dd>
                </div>
              ))}
            </dl>
          </DocsSection>

          {/* ==================== STANDARD ==================== */}
          <DocsSection
            id="standard-partners"
            eyebrow="Standard"
            title="Potential partners"
            accent="standard"
          >
            <div className="rounded-xl border border-dashed border-line-strong p-7">
              <p className="label-tight mb-3 text-standard">In exploration</p>
              <p className="body-measure text-ink-soft">
                Nothing here is committed yet. The Standard world is where
                commercial partners will go once a concept is real enough to
                write down. For now it is a placeholder, kept deliberately empty
                so it never reads as a deal that exists. When there is a partner
                worth naming, it lands here with its own reasoning, the same way
                TreeHacks does above.
              </p>
            </div>
          </DocsSection>
        </div>
      </DocsShell>
    </article>
  );
}
