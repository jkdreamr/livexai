"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import type { AgentMood } from "./HoloAgent";
import { CheckInPanel } from "./CheckInPanel";
import { SponsorsPanel } from "./SponsorsPanel";
import { EventsPanel } from "./EventsPanel";

const HoloKiosk = dynamic(() => import("./HoloKiosk"), {
  ssr: false,
  loading: () => <KioskFallback />,
});

type View = "hub" | "checkin" | "sponsors" | "events";

const TABS: { id: Exclude<View, "hub">; label: string; desc: string }[] = [
  { id: "checkin", label: "Check in", desc: "Verify and collect your pass" },
  { id: "sponsors", label: "Sponsors", desc: "Companies, tracks, prizes" },
  { id: "events", label: "Events", desc: "Schedule and directions" },
];

const GREETING: Record<View, string> = {
  hub: "Hi. I'm the LiveX guide. Tell me what you need and I'll take it from there.",
  checkin: "Let's get you checked in. Four quick steps.",
  sponsors: "Here are the sponsors. Ask me about any of them.",
  events: "Here's what's on. I'll point you to it.",
};

const MOOD_LABEL: Record<AgentMood, string> = {
  idle: "Listening",
  talking: "Speaking",
  scanning: "Scanning",
  happy: "All set",
};

function KioskFallback() {
  return (
    <div className="flex h-full w-full items-center justify-center">
      <div className="relative h-64 w-28 rounded-full border border-brand/25 bg-brand/[0.03]">
        <div className="absolute -bottom-1 left-1/2 h-2 w-24 -translate-x-1/2 rounded-full bg-brand/40 blur-[3px]" />
        <div className="absolute inset-x-4 top-1/3 h-14 animate-pulse rounded-full bg-brand/10" />
      </div>
    </div>
  );
}

export function GuideConsole() {
  const [view, setView] = useState<View>("hub");
  const [mood, setMood] = useState<AgentMood>("idle");

  const go = (v: View) => {
    setView(v);
    if (v !== "checkin") {
      setMood("talking");
      window.setTimeout(() => setMood("idle"), 700);
    }
  };

  return (
    <div className="relative overflow-hidden rounded-3xl border border-brand/20 bg-[#080c12]">
      {/* palette wash */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
        style={{
          background:
            "radial-gradient(60% 55% at 22% 30%, rgba(47,224,138,0.10), transparent 60%), radial-gradient(50% 50% at 90% 90%, rgba(157,123,255,0.10), transparent 60%)",
        }}
      />

      <div className="relative flex items-center justify-between border-b border-line px-5 py-3.5">
        <span className="flex items-center gap-2">
          <LiveXMark />
          <span className="label-tight text-ink">LiveX Builder Guide</span>
        </span>
        <span className="flex items-center gap-2">
          <span className="size-1.5 animate-pulse rounded-full bg-tree" />
          <span className="label-tight text-ink-dim">Live prototype</span>
        </span>
      </div>

      <div className="relative grid lg:grid-cols-[minmax(0,410px)_minmax(0,1fr)]">
        {/* stage: the hologram kiosk */}
        <div className="flex flex-col border-b border-line lg:border-b-0 lg:border-r">
          <div className="flex items-center justify-between px-5 pt-4">
            <span className="label-tight text-tree">LiveX AI</span>
            <span className="label-tight text-ink-faint">On-site guide</span>
          </div>

          <div className="relative h-[380px] sm:h-[440px] lg:h-[500px]">
            <HoloKiosk mood={mood} />
            <span className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 label-tight text-ink-faint">
              Drag to look around
            </span>
          </div>

          <div className="px-5 pb-6">
            <div className="mb-2 flex items-center gap-2">
              <span className={cn("size-1.5 rounded-full", mood === "scanning" ? "bg-grape" : "bg-tree")} />
              <span className="label-tight text-ink-dim">{MOOD_LABEL[mood]}</span>
            </div>
            <AnimatePresence mode="wait">
              <motion.p
                key={view}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.3 }}
                className="min-h-[3.5rem] font-display text-lg leading-snug text-ink"
              >
                {GREETING[view]}
              </motion.p>
            </AnimatePresence>
          </div>
        </div>

        {/* interaction */}
        <div className="flex min-h-[500px] flex-col p-5 sm:p-7">
          {/* segmented control */}
          <div className="flex items-center justify-between gap-3">
            <div className="relative flex rounded-full border border-line bg-black/30 p-1">
              {TABS.map((t) => {
                const on = view === t.id;
                return (
                  <button
                    key={t.id}
                    type="button"
                    onClick={() => go(t.id)}
                    className={cn(
                      "cursor-target relative rounded-full px-3.5 py-1.5 text-xs transition-colors sm:px-4",
                      on ? "text-void" : "text-ink-dim hover:text-ink"
                    )}
                  >
                    {on && (
                      <motion.span
                        layoutId="seg-active"
                        className="absolute inset-0 rounded-full bg-tree"
                        transition={{ type: "spring", stiffness: 380, damping: 32 }}
                      />
                    )}
                    <span className="relative z-10 font-medium">{t.label}</span>
                  </button>
                );
              })}
            </div>
            <AnimatePresence>
              {view !== "hub" && (
                <motion.button
                  type="button"
                  onClick={() => setView("hub")}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="cursor-target label-tight text-ink-dim transition-colors hover:text-ink"
                >
                  Overview
                </motion.button>
              )}
            </AnimatePresence>
          </div>

          <div className="mt-6 flex-1">
            <AnimatePresence mode="wait">
              {view === "hub" && (
                <motion.div key="hub" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="flex h-full flex-col justify-center">
                  <p className="text-display fluid-h3 max-w-md text-balance text-ink">What are you here to do?</p>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-soft">
                    Pick one and the guide runs it with you. It keeps what you chose and carries it onto your phone.
                  </p>
                  <div className="mt-7 grid gap-3 sm:grid-cols-3">
                    {TABS.map((t, i) => (
                      <motion.button
                        key={t.id}
                        type="button"
                        onClick={() => go(t.id)}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.06 * i, duration: 0.4, ease: ease.out }}
                        className="cursor-target group rounded-2xl border border-line bg-white/[0.02] p-4 text-left transition-colors hover:border-tree/45 hover:bg-white/[0.04]"
                      >
                        <span className="block font-display text-lg text-ink transition-colors group-hover:text-tree">{t.label}</span>
                        <span className="mt-1 block text-xs leading-relaxed text-ink-dim">{t.desc}</span>
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
    </div>
  );
}

/** Small LiveX-style chevron mark. Original, not a logo reproduction. */
function LiveXMark() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M4 5l6 14 6-14" stroke="var(--color-tree)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M14 5l6 7-6 7" stroke="var(--color-grape)" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" opacity="0.85" />
    </svg>
  );
}
