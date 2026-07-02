"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { Chatbot } from "./Chatbot";
import type { AgentMood } from "./HoloAgent";

type Accent = "tree" | "grape";

type Sponsor = {
  name: string;
  tag: string;
  accent: Accent;
  blurb: string;
  tracks: string[];
  prize: string;
  ideas: string[];
};

// Illustrative sample data.
const SPONSORS: Sponsor[] = [
  {
    name: "Northwind Cloud",
    tag: "Infra",
    accent: "tree",
    blurb: "Compute a lot of projects run on.",
    tracks: ["Edge compute", "Efficient pipeline"],
    prize: "Credits + fast-track interview",
    ideas: [
      "Shift work to the edge when the network drops.",
      "A live cost readout, priced per request.",
      "Keep an agent warm between questions.",
    ],
  },
  {
    name: "Cadence Labs",
    tag: "Dev tools",
    accent: "grape",
    blurb: "Tooling teams reach for at 3am.",
    tracks: ["Best DX", "Best CLI"],
    prize: "Hardware kit + mentor time",
    ideas: [
      "Scaffold a demo from one sentence.",
      "Review your diff before you push.",
      "A setup step that cleans up after itself.",
    ],
  },
  {
    name: "Meridian AI",
    tag: "Applied AI",
    accent: "tree",
    blurb: "Agents in real workflows, not slides.",
    tracks: ["Best agent", "Useful automation"],
    prize: "Pool split across the top three",
    ideas: [
      "Hold a task across three surfaces.",
      "Carry context from kiosk to phone.",
      "Resurface a week later with a nudge.",
    ],
  },
  {
    name: "Volt Robotics",
    tag: "Hardware",
    accent: "grape",
    blurb: "Robots for the dull, repeated work.",
    tracks: ["Best hardware", "Practical build"],
    prize: "A robotics kit for the team",
    ideas: [
      "Run the check-in line, hands free.",
      "Sense when a room is full.",
      "Deliver swag to the right table.",
    ],
  },
];

const ACCENT = {
  tree: {
    text: "text-tree",
    tile: "bg-tree/12 text-tree",
    chip: "border-tree/25 text-tree",
    ring: "border-tree/40",
    dot: "bg-tree",
    num: "bg-tree/15 text-tree",
  },
  grape: {
    text: "text-grape",
    tile: "bg-grape/12 text-grape",
    chip: "border-grape/25 text-grape",
    ring: "border-grape/40",
    dot: "bg-grape",
    num: "bg-grape/15 text-grape",
  },
} as const;

type Mode = { kind: "idle" } | { kind: "ask"; i: number } | { kind: "brainstorm"; i: number };

export function SponsorsPanel({ setMood }: { setMood: (m: AgentMood) => void }) {
  const [open, setOpen] = useState<number | null>(0);
  const [mode, setMode] = useState<Mode>({ kind: "idle" });

  return (
    <div className="grid gap-6 lg:grid-cols-[1.1fr_1fr]">
      {/* sponsor list */}
      <div className="flex flex-col gap-2">
        {SPONSORS.map((s, i) => {
          const expanded = open === i;
          const a = ACCENT[s.accent];
          return (
            <div
              key={s.name}
              className={cn(
                "rounded-xl border transition-colors",
                expanded ? cn(a.ring, "bg-white/[0.03]") : "border-line bg-white/[0.015] hover:border-line-strong"
              )}
            >
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                className="cursor-target flex w-full items-center gap-3 p-3.5 text-left"
              >
                <span className={cn("grid size-9 shrink-0 place-items-center rounded-lg font-display text-lg leading-none", a.tile)}>
                  {s.name[0]}
                </span>
                <span className="min-w-0 flex-1 truncate font-display text-lg text-ink">{s.name}</span>
                <span className={cn("shrink-0 rounded-full border px-2.5 py-0.5 label-tight", a.chip)}>{s.tag}</span>
                <motion.span animate={{ rotate: expanded ? 45 : 0 }} transition={{ duration: 0.3, ease: ease.out }} className="shrink-0 text-ink-dim">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                </motion.span>
              </button>
              <AnimatePresence initial={false}>
                {expanded && (
                  <motion.div key="body" initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.35, ease: ease.out }} className="overflow-hidden">
                    <div className="border-t border-line px-3.5 pb-3.5 pt-3">
                      <p className="text-sm text-ink-dim">{s.blurb}</p>
                      <div className="mt-3.5 grid gap-3.5 sm:grid-cols-2">
                        <div>
                          <p className="label-tight text-ink-faint">Tracks</p>
                          <ul className="mt-2 flex flex-col gap-1.5">
                            {s.tracks.map((t) => (
                              <li key={t} className="flex items-center gap-2 text-sm text-ink-soft">
                                <span className={cn("h-1 w-1 shrink-0 rounded-full", a.dot)} />
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
                      <div className="mt-4 flex items-center gap-4">
                        <button
                          type="button"
                          onClick={() => setMode({ kind: "ask", i })}
                          className={cn("cursor-target inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-xs font-medium text-void transition-transform active:scale-95", s.accent === "tree" ? "bg-tree" : "bg-grape")}
                        >
                          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
                          Ask {s.name.split(" ")[0]}
                        </button>
                        <button
                          type="button"
                          onClick={() => setMode({ kind: "brainstorm", i })}
                          className="cursor-target text-xs text-ink-dim transition-colors hover:text-ink"
                        >
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
        <p className="mt-1 label-tight text-ink-faint">Illustrative sample data.</p>
      </div>

      {/* context panel */}
      <div className="panel flex flex-col p-6 sm:p-7">
        <AnimatePresence mode="wait">
          {mode.kind === "idle" && (
            <motion.div key="idle" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex h-full flex-col items-center justify-center gap-3 text-center">
              <span className="grid size-10 place-items-center rounded-full border border-line text-ink-dim">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" /></svg>
              </span>
              <p className="max-w-[15rem] text-sm text-ink-dim">Open a sponsor, then ask the guide or brainstorm a build.</p>
            </motion.div>
          )}
          {mode.kind === "ask" && (
            <motion.div key={`ask${mode.i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex h-full flex-col">
              <p className={cn("label", ACCENT[SPONSORS[mode.i].accent].text)}>{SPONSORS[mode.i].name}</p>
              <div className="mt-4 flex-1">
                <Chatbot context={SPONSORS[mode.i].name} seed={`Ask me about ${SPONSORS[mode.i].name}, their tracks, or their prize.`} placeholder="Ask about this sponsor" onActivity={(t) => setMood(t ? "talking" : "idle")} />
              </div>
            </motion.div>
          )}
          {mode.kind === "brainstorm" && (
            <motion.div key={`bs${mode.i}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="flex flex-col">
              <p className={cn("label", ACCENT[SPONSORS[mode.i].accent].text)}>Ideas · {SPONSORS[mode.i].name}</p>
              <ul className="mt-4 flex flex-col gap-2">
                {SPONSORS[mode.i].ideas.map((idea, k) => (
                  <motion.li key={idea} initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: k * 0.08, duration: 0.4, ease: ease.out }} className="flex items-start gap-3 rounded-lg border border-line bg-white/[0.02] p-3 text-sm text-ink-soft">
                    <span className={cn("mt-0.5 grid size-5 shrink-0 place-items-center rounded-full text-[0.65rem]", ACCENT[SPONSORS[mode.i].accent].num)}>{k + 1}</span>
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
