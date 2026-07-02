"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";
import { Chatbot } from "./Chatbot";
import type { AgentMood } from "./HoloAgent";

type StepId = "pass" | "school" | "gov" | "face";

const STEPS: { id: StepId; chip: string; title: string; action: string; hint: string }[] = [
  { id: "pass", chip: "QR pass", title: "Scan your QR pass", action: "Scan QR pass", hint: "Hold the code on your phone or badge up to the reader." },
  { id: "school", chip: "School ID", title: "Scan your school ID", action: "Scan school ID", hint: "Confirms you are a current student." },
  { id: "gov", chip: "Gov ID", title: "Scan your government ID", action: "Scan government ID", hint: "Confirms your legal identity." },
  { id: "face", chip: "Face", title: "Quick face scan", action: "Start face scan", hint: "Matches you to the ID you just scanned." },
];

const QR_CELLS = [
  [0, 0], [1, 0], [2, 0], [4, 0], [6, 0], [0, 1], [2, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [6, 2], [3, 3], [5, 3], [1, 3], [0, 4], [2, 4],
  [3, 4], [4, 4], [6, 4], [0, 5], [4, 5], [6, 5], [0, 6], [1, 6], [2, 6], [4, 6], [6, 6],
];

export function CheckInPanel({ setMood }: { setMood: (m: AgentMood) => void }) {
  const reduced = useReducedMotion();
  const [step, setStep] = useState(0); // 0..3 active, 4 = complete
  const [scanning, setScanning] = useState(false);
  const [help, setHelp] = useState(false);

  const done = step >= STEPS.length;
  const current = STEPS[Math.min(step, STEPS.length - 1)];

  // A scan runs, then the step completes and the flow advances.
  useEffect(() => {
    if (!scanning) return;
    setMood("scanning");
    const t = window.setTimeout(() => {
      setScanning(false);
      setMood("happy");
      setStep((s) => s + 1);
    }, reduced ? 250 : 1900);
    return () => window.clearTimeout(t);
  }, [scanning, reduced, setMood]);

  useEffect(() => {
    if (done) setMood("happy");
  }, [done, setMood]);

  const runScan = () => setScanning(true);
  const restart = () => {
    setStep(0);
    setScanning(false);
    setMood("idle");
  };

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <p className="label text-tree">Check in</p>
        <p className="label-tight text-ink-faint">4 steps · all required</p>
      </div>

      {/* progress chips */}
      <div className="mt-4 grid grid-cols-4 gap-2">
        {STEPS.map((s, i) => {
          const state = done || i < step ? "done" : i === step ? "active" : "pending";
          return (
            <div
              key={s.id}
              className={cn(
                "flex flex-col items-center gap-1.5 rounded-xl border px-1 py-2.5 text-center transition-colors",
                state === "active" && "border-tree/50 bg-tree/[0.08]",
                state === "done" && "border-tree/25 bg-tree/[0.03]",
                state === "pending" && "border-line"
              )}
            >
              <span
                className={cn(
                  "grid size-6 place-items-center rounded-full text-[11px] font-medium",
                  state === "active" && "bg-tree text-void",
                  state === "done" && "border border-tree/50 text-tree",
                  state === "pending" && "border border-line text-ink-faint"
                )}
              >
                {state === "done" ? (
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                ) : (
                  i + 1
                )}
              </span>
              <span className={cn("text-[11px] leading-none", state === "pending" ? "text-ink-faint" : "text-ink-soft")}>{s.chip}</span>
            </div>
          );
        })}
      </div>

      {/* active step / completion */}
      <div className="mt-5 min-h-[248px] rounded-2xl border border-line bg-black/25 p-6">
        <AnimatePresence mode="wait">
          {!done ? (
            <motion.div
              key={current.id + (scanning ? "-scan" : "")}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col items-center text-center"
            >
              {scanning ? (
                <Scanning kind={current.id} reduced={reduced} />
              ) : (
                <>
                  <p className="label-tight text-tree">Step {step + 1}</p>
                  <p className="mt-2 font-display text-xl text-ink">{current.title}</p>
                  <ScanTarget kind={current.id} />
                  <p className="mt-4 max-w-xs text-sm text-ink-dim">{current.hint}</p>
                  <button type="button" onClick={runScan} className="cursor-target mt-5 rounded-full bg-tree px-5 py-2 text-sm font-medium text-void transition-transform hover:scale-[1.03]">
                    {current.action}
                  </button>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center text-center">
              <motion.span initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="grid size-14 place-items-center rounded-full border-2 border-tree text-tree">
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
              </motion.span>
              <p className="mt-4 font-display text-2xl text-ink">You&rsquo;re checked in</p>
              <p className="mt-1.5 max-w-sm text-sm text-ink-dim">Pass, school ID, government ID, and face all confirmed. Your first move is ready whenever you are.</p>
              <div className="mt-4 flex flex-wrap justify-center gap-2">
                {STEPS.map((s) => (
                  <span key={s.id} className="inline-flex items-center gap-1.5 rounded-full border border-tree/25 bg-tree/[0.05] px-3 py-1 text-xs text-ink-soft">
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="var(--color-tree)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                    {s.chip}
                  </span>
                ))}
              </div>
              <button type="button" onClick={restart} className="cursor-target mt-5 label-tight text-ink-dim transition-colors hover:text-ink">
                Run it again
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* help + disclosure */}
      <div className="mt-4">
        <button
          type="button"
          onClick={() => setHelp((h) => !h)}
          className="cursor-target flex items-center gap-2 label-tight text-ink-dim transition-colors hover:text-ink"
        >
          <motion.span animate={{ rotate: help ? 90 : 0 }}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
          </motion.span>
          Need help checking in?
        </button>
        <AnimatePresence initial={false}>
          {help && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <div className="mt-3 rounded-2xl border border-line bg-black/25 p-4">
                <Chatbot context="check-in" seed="I can walk you through any step. Ask away." placeholder="Ask about check-in" onActivity={(t) => setMood(t ? "talking" : "idle")} />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <p className="mt-4 text-xs leading-relaxed text-ink-faint">
        Everything here is simulated. No biometric data is stored. Identity checks connect to the event registration once API keys are added.
      </p>
    </div>
  );
}

/* -- scan visuals ---------------------------------------------------------- */

function ScanTarget({ kind }: { kind: StepId }) {
  return (
    <div className="relative mt-4 h-32 w-56 overflow-hidden rounded-xl border border-tree/25 bg-tree/[0.03]">
      <CardArt kind={kind} />
      <Corners />
    </div>
  );
}

function Scanning({ kind, reduced }: { kind: StepId; reduced: boolean }) {
  return (
    <>
      <p className="label-tight text-grape">{kind === "face" ? "Reading face" : "Reading ID"}</p>
      <div className="relative mt-4 h-32 w-56 overflow-hidden rounded-xl border border-grape/35 bg-grape/[0.05]">
        <CardArt kind={kind} />
        <Corners violet />
        {!reduced && (
          <motion.div
            className="absolute inset-x-0 h-0.5 bg-grape shadow-[0_0_12px_var(--color-grape)]"
            initial={{ top: "8%" }}
            animate={{ top: ["8%", "92%", "8%"] }}
            transition={{ duration: 1.5, ease: "easeInOut", repeat: Infinity }}
          />
        )}
      </div>
      <p className="mt-4 text-sm text-ink-dim">Matching you to your registration&hellip;</p>
    </>
  );
}

function CardArt({ kind }: { kind: StepId }) {
  if (kind === "face") {
    return (
      <svg viewBox="0 0 120 120" className="h-full w-full text-tree/60" fill="none" stroke="currentColor" strokeWidth="1.4">
        <ellipse cx="60" cy="50" rx="24" ry="30" />
        <path d="M40 88 C46 76 74 76 80 88" />
        <circle cx="52" cy="48" r="1.6" fill="currentColor" />
        <circle cx="68" cy="48" r="1.6" fill="currentColor" />
      </svg>
    );
  }
  if (kind === "pass") {
    return (
      <div className="absolute inset-0 grid place-items-center">
        <svg viewBox="0 0 7 7" width="64" height="64" aria-hidden>
          {QR_CELLS.map(([x, y], i) => (
            <rect key={i} x={x} y={y} width="1" height="1" fill="var(--color-tree)" opacity="0.78" rx="0.1" />
          ))}
        </svg>
      </div>
    );
  }
  return (
    <div className="absolute inset-4 rounded-lg border border-tree/20">
      <div className="absolute left-3 top-3 h-8 w-8 rounded-full bg-tree/15" />
      <div className="absolute left-14 top-4 h-1.5 w-24 rounded bg-tree/20" />
      <div className="absolute left-14 top-8 h-1.5 w-16 rounded bg-tree/15" />
      <div className="absolute bottom-4 left-3 right-3 h-1.5 rounded bg-tree/10" />
    </div>
  );
}

function Corners({ violet }: { violet?: boolean }) {
  const c = violet ? "border-grape" : "border-tree";
  return (
    <>
      {[0, 1, 2, 3].map((i) => (
        <span
          key={i}
          className={cn(
            "absolute size-3.5",
            c,
            i === 0 && "left-2 top-2 border-l-2 border-t-2",
            i === 1 && "right-2 top-2 border-r-2 border-t-2",
            i === 2 && "bottom-2 left-2 border-b-2 border-l-2",
            i === 3 && "bottom-2 right-2 border-b-2 border-r-2"
          )}
        />
      ))}
    </>
  );
}
