"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { Chatbot } from "./Chatbot";
import type { AgentMood } from "./HoloAgent";

type Sponsor = {
  name: string;
  tag: string;
  blurb: string;
  tracks: string[];
  prize: string;
  ideas: string[];
};

// Sample data. Not real companies, tracks, prizes, or commitments.
const SPONSORS: Sponsor[] = [
  {
    name: "Northwind Cloud",
    tag: "Infrastructure",
    blurb: "Runs the compute a lot of hackathon projects sit on.",
    tracks: ["Best use of edge compute", "Most efficient pipeline"],
    prize: "Credits + a fast-track interview (illustrative)",
    ideas: [
      "A build that shifts work to the edge when the network drops.",
      "A cost dashboard that shows the price of each request in real time.",
      "A cold-start killer that keeps an agent warm between questions.",
    ],
  },
  {
    name: "Cadence Labs",
    tag: "Developer tools",
    blurb: "Makes the tooling teams reach for at three in the morning.",
    tracks: ["Best developer experience", "Best command-line tool"],
    prize: "Hardware kit + mentor time (illustrative)",
    ideas: [
      "A CLI that scaffolds a whole demo from one sentence.",
      "A local agent that reviews your diff before you push.",
      "A setup step that removes itself once it is done.",
    ],
  },
  {
    name: "Meridian AI",
    tag: "Applied AI",
    blurb: "Ships agents into real workflows, not slideware.",
    tracks: ["Best agent build", "Most useful automation"],
    prize: "Prize pool split across the top three (illustrative)",
    ideas: [
      "An agent that remembers a task across three surfaces.",
      "A handoff that carries context from a kiosk to a phone.",
      "A follow-up that reappears a week later with the right nudge.",
    ],
  },
  {
    name: "Volt Robotics",
    tag: "Hardware",
    blurb: "Builds robots that take on the dull, repeated work.",
    tracks: ["Best hardware hack", "Most practical build"],
    prize: "A robotics kit for the team (illustrative)",
    ideas: [
      "A robot that runs the check-in line so staff do not have to.",
      "A sensor that tells the guide when a room is full.",
      "A small mover that delivers swag to the right table.",
    ],
  },
];

type Mode = { kind: "idle" } | { kind: "ask"; i: number } | { kind: "brainstorm"; i: number };

export function SponsorsPanel({ setMood }: { setMood: (m: AgentMood) => void }) {
  const [open, setOpen] = useState<number | null>(0);
  const [mode, setMode] = useState<Mode>({ kind: "idle" });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* sponsor list */}
      <div className="flex flex-col gap-2.5">
        {SPONSORS.map((s, i) => {
          const expanded = open === i;
          return (
            <div key={s.name} className={cn("rounded-xl border transition-colors", expanded ? "border-brand/40 bg-white/[0.03]" : "border-line bg-white/[0.015]")}>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="cursor-target flex w-full items-center justify-between gap-4 p-4 text-left"
              >
                <span>
                  <span className="font-display text-lg text-ink">{s.name}</span>
                  <span className="ml-3 label-tight text-ink-faint">{s.tag}</span>
                  <span className="mt-1 block text-sm text-ink-dim">{s.blurb}</span>
                </span>
                <motion.span animate={{ rotate: expanded ? 45 : 0 }} className="shrink-0 text-ink-dim">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: ease.out }} className="overflow-hidden">
                    <div className="border-t border-line p-4">
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div>
                          <p className="label-tight text-ink-faint">Tracks</p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {s.tracks.map((t) => (
                              <li key={t} className="flex items-start gap-2 text-sm text-ink-soft">
                                <span className="mt-1.5 h-px w-3 shrink-0 bg-brand" />
                                {t}
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div>
                          <p className="label-tight text-ink-faint">Prize</p>
                          <p className="mt-2 text-sm text-ink-soft">{s.prize}</p>
                        </div>
                      </div>
                      <div className="mt-4 flex flex-wrap gap-2">
                        <button type="button" onClick={() => setMode({ kind: "ask", i })} className="cursor-target rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-brand/50 hover:text-brand">
                          Ask about {s.name.split(" ")[0]}
                        </button>
                        <button type="button" onClick={() => setMode({ kind: "brainstorm", i })} className="cursor-target rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-brand/50 hover:text-brand">
                          Brainstorm ideas
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          );
        })}
        <p className="mt-1 text-xs text-ink-faint">Sample sponsor data. Not real companies, tracks, or commitments.</p>
      </div>

      {/* context panel */}
      <div className="panel flex flex-col p-6 sm:p-7">
        <AnimatePresence mode="wait">
          {mode.kind === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center text-center">
              <p className="max-w-xs text-sm text-ink-dim">Open a sponsor to see its tracks and prize, then ask the guide about it or brainstorm a build.</p>
            </motion.div>
          )}
          {mode.kind === "ask" && (
            <motion.div key={`ask${mode.i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex h-full flex-col">
              <p className="label text-brand">{SPONSORS[mode.i].name}</p>
              <div className="mt-4 flex-1">
                <Chatbot context={SPONSORS[mode.i].name} seed={`Ask me about ${SPONSORS[mode.i].name}, their tracks, or their prize.`} placeholder="Ask about this sponsor" onActivity={(t) => setMood(t ? "talking" : "idle")} />
              </div>
            </motion.div>
          )}
          {mode.kind === "brainstorm" && (
            <motion.div key={`bs${mode.i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col">
              <p className="label text-brand">Ideas for {SPONSORS[mode.i].name}</p>
              <p className="mt-2 text-sm text-ink-dim">Starting points, matched to their tracks. A live model would tailor these to you.</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {SPONSORS[mode.i].ideas.map((idea, k) => (
                  <motion.li key={idea} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.08, duration: 0.4, ease: ease.out }} className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] p-3 text-sm text-ink-soft">
                    <span className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-full bg-brand/15 text-[0.65rem] text-brand">{k + 1}</span>
                    {idea}
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
