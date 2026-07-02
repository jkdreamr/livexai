"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";
import { ease } from "@/lib/motion";
import { SurfaceGlyph } from "@/components/ui/Surface";
import { Typewriter } from "@/components/skiper/Typewriter";
import type { GuideState } from "./LiveGuide";

const LiveGuide = dynamic(() => import("./LiveGuide").then((m) => m.LiveGuide), {
  ssr: false,
});

type Phase = "scan" | "checking" | "oriented" | "committed";

const METHODS = [
  { id: "scan", label: "Scan event QR pass", surface: "qr" as const },
  { id: "tap", label: "Tap mobile pass", surface: "mobile" as const },
  { id: "code", label: "Enter confirmation code", surface: "web" as const },
  { id: "staff", label: "Staff-assisted", surface: "physical" as const, fallback: true },
];

const ARRIVAL_STACK = [
  { label: "Badge & wristband", detail: "Zone A, to your left" },
  { label: "Meals & swag", detail: "Dinner 7:00 · swag at desk" },
  { label: "Opening session", detail: "Main stage · 8:30" },
  { label: "Nearest workshop", detail: "Intro to agents · Rm 2 · 9:15" },
  { label: "Team formation", detail: "12 builders near you" },
];

const PATHS = [
  { id: "team", label: "Find my team" },
  { id: "challenges", label: "Explore challenges" },
  { id: "now", label: "See what's happening now" },
  { id: "build", label: "Build an idea" },
  { id: "guide", label: "Meet the Builder Guide" },
];

const MOBILE_MESSAGE: Record<string, string> = {
  team: "Your first stop: team-formation wall by the main stage. 12 builders match your interests.",
  challenges: "Your first stop: the sponsor challenge area, based on your interest in AI + music.",
  now: "Happening now: opening keynote at 8:30, main stage. I'll remind you 10 minutes before.",
  build: "Let's frame your idea. Open the guide on your phone and tell me what you're thinking.",
  guide: "I'm with you for the weekend. Ask me anything — teams, tracks, demos, or where to eat.",
};

const OPS_SIGNALS = [
  "Attendee checked in",
  "Staff-assist available",
  "Arrival queue — flowing",
  "First destination selected",
  "QR → mobile continued",
];

const GUIDE_LINE: Record<Phase, string> = {
  scan: "Welcome to TreeHacks. Let's get you moving.",
  checking: "One moment — reading your pass.",
  oriented: "You're in. Your first move is ready.",
  committed: "Locked in. I'll carry this to your phone.",
};

const guideStateFor = (phase: Phase): GuideState =>
  phase === "scan" ? "idle" : phase === "committed" ? "committed" : "active";

export function ArrivalSignal({ accent = "#42c58a" }: { accent?: string }) {
  const reduced = useReducedMotion();
  const [phase, setPhase] = useState<Phase>("scan");
  const [method, setMethod] = useState<string | null>(null);
  const [path, setPath] = useState<string | null>(null);
  const [ops, setOps] = useState(false);

  useEffect(() => {
    if (phase !== "checking") return;
    const t = setTimeout(() => setPhase("oriented"), 1400);
    return () => clearTimeout(t);
  }, [phase]);

  const start = (id: string) => {
    setMethod(id);
    setPhase("checking");
  };
  const choose = (id: string) => {
    setPath(id);
    setPhase("committed");
  };
  const reset = () => {
    setPhase("scan");
    setMethod(null);
    setPath(null);
  };

  return (
    <div className="panel relative overflow-hidden">
      {/* header */}
      <div className="flex items-center justify-between gap-4 border-b border-line px-6 py-4 sm:px-8">
        <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
          <span className="label-tight text-college">Arrival Signal</span>
          <span className="label-tight text-ink-faint">Prototype registration data</span>
        </div>
        <button
          type="button"
          onClick={() => setOps((v) => !v)}
          aria-pressed={ops}
          className={cn(
            "cursor-target rounded-full border px-3 py-1.5 label-tight transition-colors",
            ops ? "border-college/50 text-college" : "border-line-strong text-ink-dim hover:text-ink"
          )}
        >
          Operations Lens
        </button>
      </div>

      <div className="grid gap-8 p-6 sm:p-10 lg:grid-cols-[1.1fr_1fr] lg:gap-12">
        {/* Guide */}
        <div className="relative flex min-h-[320px] flex-col items-center justify-center">
          <div className="relative h-64 w-full max-w-sm">
            {reduced ? (
              <StaticGuide state={guideStateFor(phase)} accent={accent} />
            ) : (
              <LiveGuide state={guideStateFor(phase)} accent={accent} />
            )}
          </div>
          <AnimatePresence mode="wait">
            <motion.p
              key={phase}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.4, ease: ease.out }}
              className="mt-2 text-center font-display text-lg text-ink"
            >
              {GUIDE_LINE[phase]}
            </motion.p>
          </AnimatePresence>
        </div>

        {/* Interaction */}
        <div className="flex flex-col justify-center">
          <AnimatePresence mode="wait">
            {phase === "scan" && (
              <StepBlock key="scan" label="Check in">
                <div className="grid gap-2.5">
                  {METHODS.map((m) => (
                    <button
                      key={m.id}
                      type="button"
                      onClick={() => start(m.id)}
                      className="cursor-target group flex items-center gap-3 rounded-lg border border-line bg-white/[0.02] px-4 py-3 text-left transition-colors hover:border-college/40 hover:bg-white/[0.04]"
                    >
                      <span className="text-ink-dim transition-colors group-hover:text-college">
                        <SurfaceGlyph surface={m.surface} size={18} />
                      </span>
                      <span className="flex-1 text-sm text-ink-soft group-hover:text-ink">
                        {m.label}
                      </span>
                      {m.fallback && (
                        <span className="label-tight text-ink-faint">fallback</span>
                      )}
                    </button>
                  ))}
                </div>
                <p className="mt-4 text-xs leading-relaxed text-ink-faint">
                  No facial recognition or biometrics. Manual lookup, no-smartphone,
                  and low-connectivity paths are always available.
                </p>
              </StepBlock>
            )}

            {phase === "checking" && (
              <StepBlock key="checking" label="Reading pass">
                <div className="flex items-center gap-3 text-ink-soft">
                  <span className="size-2 animate-pulse rounded-full bg-college" />
                  <span className="text-sm">
                    Signal entering the guide — {method === "staff" ? "staff-assisted" : "self-service"}…
                  </span>
                </div>
              </StepBlock>
            )}

            {phase === "oriented" && (
              <StepBlock key="oriented" label="You're in — first moves">
                <ul className="grid gap-2">
                  {ARRIVAL_STACK.map((item, i) => (
                    <motion.li
                      key={item.label}
                      initial={reduced ? false : { opacity: 0, x: 12 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.05 * i, duration: 0.4, ease: ease.out }}
                      className="flex items-baseline justify-between gap-4 border-b border-line py-2"
                    >
                      <span className="text-sm text-ink">{item.label}</span>
                      <span className="text-right text-xs text-ink-dim">{item.detail}</span>
                    </motion.li>
                  ))}
                </ul>
                <p className="label-tight mt-5 text-ink-faint">Choose your first move</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {PATHS.map((p) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => choose(p.id)}
                      className="cursor-target rounded-full border border-line-strong px-3.5 py-1.5 text-xs text-ink-soft transition-colors hover:border-college/50 hover:text-college"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </StepBlock>
            )}

            {phase === "committed" && path && (
              <StepBlock key="committed" label="Build signal → your phone">
                <div className="flex items-start gap-4">
                  <div className="w-24 shrink-0 rounded-xl border border-line-strong bg-abyss p-2">
                    <div className="rounded-lg bg-white/[0.04] p-2.5">
                      <div className="flex items-center gap-1.5">
                        <span className="size-1.5 rounded-full bg-college" />
                        <span className="text-[0.55rem] text-ink-soft">Checked in</span>
                      </div>
                      <p className="mt-2 text-[0.6rem] font-medium leading-tight text-ink">
                        {PATHS.find((p) => p.id === path)?.label}
                      </p>
                      <p className="mt-1.5 text-[0.5rem] leading-tight text-ink-dim">
                        <Typewriter
                          texts={[MOBILE_MESSAGE[path]]}
                          typingSpeed={22}
                          loop={false}
                        />
                      </p>
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm leading-relaxed text-ink-soft">
                      Your arrival signal became a{" "}
                      <span className="text-college">build signal</span> — intent,
                      preserved, waiting on your phone. Nothing re-typed.
                    </p>
                    <button
                      type="button"
                      onClick={reset}
                      className="cursor-target mt-5 inline-flex items-center gap-2 label-tight text-ink-dim transition-colors hover:text-ink"
                    >
                      Replay arrival
                      <span aria-hidden>↺</span>
                    </button>
                  </div>
                </div>
              </StepBlock>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Operations Lens overlay */}
      <AnimatePresence>
        {ops && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="absolute inset-0 z-20 flex flex-col justify-end bg-void/85 backdrop-blur-sm"
          >
            <div className="border-t border-college/20 p-6 sm:p-10">
              <p className="label text-college">Operations Lens · event pulse</p>
              <div className="mt-6 grid gap-4 sm:grid-cols-5">
                {OPS_SIGNALS.map((sig, i) => (
                  <div key={sig} className="flex flex-col gap-3">
                    <div className="relative h-14 overflow-hidden rounded-lg border border-line bg-white/[0.02]">
                      <PulseBars index={i} reduced={reduced} />
                    </div>
                    <span className="text-xs leading-snug text-ink-dim">{sig}</span>
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOps(false)}
                className="cursor-target mt-8 label-tight text-ink-dim transition-colors hover:text-ink"
              >
                Close lens
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function StepBlock({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -12 }}
      transition={{ duration: 0.4, ease: ease.out }}
    >
      <p className="label mb-5 text-ink-dim">{label}</p>
      {children}
    </motion.div>
  );
}

function PulseBars({ index, reduced }: { index: number; reduced: boolean }) {
  return (
    <div className="absolute inset-0 flex items-end gap-1 p-2">
      {Array.from({ length: 7 }).map((_, i) => (
        <motion.span
          key={i}
          className="flex-1 rounded-sm bg-college/60"
          initial={{ height: "20%" }}
          animate={
            reduced
              ? { height: `${30 + ((i * 13 + index * 7) % 60)}%` }
              : { height: [`${20 + ((i * 11) % 40)}%`, `${40 + ((i * 17 + index * 9) % 55)}%`, `${20 + ((i * 11) % 40)}%`] }
          }
          transition={
            reduced
              ? undefined
              : { duration: 1.8 + (i % 3) * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.12 }
          }
        />
      ))}
    </div>
  );
}

function StaticGuide({ state, accent }: { state: GuideState; accent: string }) {
  const glow = state === "active" ? 0.9 : state === "committed" ? 0.7 : 0.4;
  return (
    <svg viewBox="0 0 200 200" className="h-full w-full" aria-hidden>
      <g stroke={accent} fill="none">
        <circle cx="100" cy="100" r="60" strokeWidth="0.6" opacity={0.4} />
        <circle cx="100" cy="100" r="42" strokeWidth="0.8" opacity={0.6} />
        <circle cx="100" cy="100" r="24" strokeWidth="1" opacity={glow} />
      </g>
      <circle cx="100" cy="100" r="10" fill={accent} opacity={glow} />
    </svg>
  );
}
