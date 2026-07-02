"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { HoloAgent, type AgentMood } from "./HoloAgent";
import { CheckInPanel } from "./CheckInPanel";
import { SponsorsPanel } from "./SponsorsPanel";
import { EventsPanel } from "./EventsPanel";

type View = "hub" | "checkin" | "sponsors" | "events";

const TABS: { id: View; label: string; desc: string }[] = [
  { id: "checkin", label: "Check in", desc: "Verify and get your pass" },
  { id: "sponsors", label: "Sponsors", desc: "Companies, tracks, prizes" },
  { id: "events", label: "Events", desc: "Schedule and directions" },
];

const GREETING: Record<View, string> = {
  hub: "Welcome to TreeHacks. What do you need?",
  checkin: "Let us get you checked in.",
  sponsors: "Here are the sponsors. Ask me about any of them.",
  events: "Here is what is on. I will show you the way.",
};

export function GuideConsole() {
  const [view, setView] = useState<View>("hub");
  const [mood, setMood] = useState<AgentMood>("idle");

  const go = (v: View) => {
    setView(v);
    setMood("talking");
    window.setTimeout(() => setMood("idle"), 650);
  };

  return (
    <div className="overflow-hidden rounded-2xl border border-brand/25 bg-[#060a13]">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <span className="label-tight text-brand">LiveX Builder Guide</span>
        <span className="label-tight text-ink-faint">Live prototype</span>
      </div>

      <div className="grid lg:grid-cols-[300px_minmax(0,1fr)]">
        {/* agent + nav */}
        <div className="border-b border-line lg:border-b-0 lg:border-r">
          <div className="h-52 sm:h-60">
            <HoloAgent mood={mood} />
          </div>
          <div className="px-5 pb-6">
            <AnimatePresence mode="wait">
              <motion.p
                key={view}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="min-h-[3.25rem] text-center font-display text-lg leading-snug text-ink"
              >
                {GREETING[view]}
              </motion.p>
            </AnimatePresence>
            <div className="mt-3 flex flex-col gap-2">
              {TABS.map((t) => {
                const on = view === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => go(t.id)}
                    className={cn(
                      "cursor-target flex items-center justify-between gap-3 rounded-xl border px-4 py-3 text-left transition-colors",
                      on ? "border-brand/50 bg-brand/[0.08]" : "border-line hover:border-brand/30 hover:bg-white/[0.02]"
                    )}
                  >
                    <span>
                      <span className={cn("block text-sm", on ? "text-brand" : "text-ink")}>{t.label}</span>
                      <span className="text-xs text-ink-dim">{t.desc}</span>
                    </span>
                    <motion.span animate={{ x: on ? 2 : 0 }} className="text-ink-dim">
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
                    </motion.span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* view */}
        <div className="min-h-[440px] p-5 sm:p-7">
          <AnimatePresence mode="wait">
            {view === "hub" && (
              <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex h-full flex-col justify-center">
                <p className="text-display fluid-h3 max-w-md text-balance text-ink">What are you here to build?</p>
                <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                  Pick one and the guide takes it from there. It remembers what you chose and carries it onto your phone.
                </p>
                <div className="mt-7 grid gap-3 sm:grid-cols-3">
                  {TABS.map((t, i) => (
                    <motion.button
                      key={t.id}
                      type="button"
                      onClick={() => go(t.id)}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.08 * i, duration: 0.4, ease: ease.out }}
                      className="cursor-target group rounded-xl border border-line bg-white/[0.02] p-4 text-left transition-colors hover:border-brand/45 hover:bg-white/[0.04]"
                    >
                      <span className="block font-display text-lg text-ink group-hover:text-brand">{t.label}</span>
                      <span className="mt-1 block text-xs text-ink-dim">{t.desc}</span>
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
            {view === "checkin" && (
              <motion.div key="ci" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <CheckInPanel setMood={setMood} />
              </motion.div>
            )}
            {view === "sponsors" && (
              <motion.div key="sp" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <SponsorsPanel setMood={setMood} />
              </motion.div>
            )}
            {view === "events" && (
              <motion.div key="ev" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
                <EventsPanel />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
