"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";
import { Chatbot } from "./Chatbot";
import type { AgentMood } from "./HoloAgent";

type Method = "qr" | "school" | "gov" | "face";

const METHODS: { id: Method; label: string; desc: string }[] = [
  { id: "qr", label: "Show entry QR", desc: "Your pass for the desk" },
  { id: "school", label: "Scan school ID", desc: "Confirm you are a student" },
  { id: "gov", label: "Scan government ID", desc: "Confirm your identity" },
  { id: "face", label: "Face scan", desc: "Match you to your registration" },
];

const QR_CELLS = [
  [0, 0], [1, 0], [2, 0], [4, 0], [6, 0], [0, 1], [2, 1], [4, 1], [5, 1], [6, 1],
  [0, 2], [1, 2], [2, 2], [3, 2], [6, 2], [3, 3], [5, 3], [1, 3], [0, 4], [2, 4],
  [3, 4], [4, 4], [6, 4], [0, 5], [4, 5], [6, 5], [0, 6], [1, 6], [2, 6], [4, 6], [6, 6],
];

export function CheckInPanel({ setMood }: { setMood: (m: AgentMood) => void }) {
  const reduced = useReducedMotion();
  const [method, setMethod] = useState<Method | null>(null);
  const [stage, setStage] = useState<"select" | "scanning" | "done">("select");

  useEffect(() => {
    if (stage !== "scanning") return;
    setMood("scanning");
    const t = setTimeout(() => {
      setStage("done");
      setMood("happy");
    }, reduced ? 300 : 2200);
    return () => clearTimeout(t);
  }, [stage, reduced, setMood]);

  const choose = (m: Method) => {
    setMethod(m);
    setStage(m === "qr" ? "done" : "scanning");
  };
  const reset = () => {
    setMethod(null);
    setStage("select");
    setMood("idle");
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[1.15fr_1fr]">
      {/* left: methods + result */}
      <div className="panel p-6 sm:p-7">
        <AnimatePresence mode="wait">
          {stage === "select" && (
            <motion.div key="select" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.3 }}>
              <p className="label text-brand">Check in</p>
              <p className="mt-2 text-sm text-ink-soft">Pick how you want to verify. Everything here is simulated.</p>
              <div className="mt-5 grid gap-2.5 sm:grid-cols-2">
                {METHODS.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => choose(m.id)}
                    className="cursor-target group flex flex-col items-start gap-1 rounded-xl border border-line bg-white/[0.02] p-4 text-left transition-colors hover:border-brand/45 hover:bg-white/[0.04]"
                  >
                    <span className="text-sm text-ink group-hover:text-brand">{m.label}</span>
                    <span className="text-xs text-ink-dim">{m.desc}</span>
                  </button>
                ))}
              </div>
              <p className="mt-5 text-xs leading-relaxed text-ink-faint">
                No biometric data is stored. Identity checks connect to the event registration once API keys are added.
              </p>
            </motion.div>
          )}

          {stage === "scanning" && method && (
            <motion.div key="scan" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="flex flex-col items-center py-6">
              <p className="label text-brand">{method === "face" ? "Reading face" : "Reading ID"}</p>
              <div className="relative mt-5 h-40 w-64 overflow-hidden rounded-xl border border-brand/30 bg-brand/[0.04]">
                {method === "face" ? (
                  <svg viewBox="0 0 120 120" className="h-full w-full text-brand/70" fill="none" stroke="currentColor" strokeWidth="1.4">
                    <ellipse cx="60" cy="52" rx="26" ry="32" />
                    <path d="M40 90 C46 78 74 78 80 90" />
                  </svg>
                ) : (
                  <div className="absolute inset-4 rounded-lg border border-brand/25">
                    <div className="absolute left-3 top-3 h-8 w-8 rounded-full bg-brand/15" />
                    <div className="absolute left-14 top-4 h-1.5 w-24 rounded bg-brand/20" />
                    <div className="absolute left-14 top-8 h-1.5 w-16 rounded bg-brand/15" />
                    <div className="absolute bottom-4 left-3 right-3 h-1.5 rounded bg-brand/10" />
                  </div>
                )}
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className={cn("absolute size-4 border-brand", i === 0 && "left-2 top-2 border-l-2 border-t-2", i === 1 && "right-2 top-2 border-r-2 border-t-2", i === 2 && "bottom-2 left-2 border-b-2 border-l-2", i === 3 && "bottom-2 right-2 border-b-2 border-r-2")} />
                ))}
                {!reduced && (
                  <motion.div className="absolute inset-x-0 h-0.5 bg-cyan-200/80 shadow-[0_0_10px_#7fead1]" initial={{ top: 0 }} animate={{ top: ["6%", "94%", "6%"] }} transition={{ duration: 1.6, ease: "easeInOut", repeat: Infinity }} />
                )}
              </div>
              <p className="mt-4 text-sm text-ink-dim">Matching you to your registration…</p>
            </motion.div>
          )}

          {stage === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex flex-col items-center py-4 text-center">
              {method === "qr" ? (
                <>
                  <p className="label text-brand">Your entry pass</p>
                  <div className="mt-5 rounded-xl border border-line bg-white p-3">
                    <svg viewBox="0 0 7 7" width="132" height="132" aria-label="Entry QR code">
                      {QR_CELLS.map(([x, y], i) => (
                        <rect key={i} x={x} y={y} width="1" height="1" fill="#07080b" rx="0.12" />
                      ))}
                    </svg>
                  </div>
                  <p className="mt-4 text-sm text-ink-soft">Show this at the desk. It carries your registration.</p>
                </>
              ) : (
                <>
                  <motion.div initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: "spring", stiffness: 260, damping: 18 }} className="grid size-14 place-items-center rounded-full border-2 border-brand text-brand">
                    <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6 9 17l-5-5" /></svg>
                  </motion.div>
                  <p className="mt-4 font-display text-xl text-ink">You are checked in</p>
                  <p className="mt-1.5 max-w-xs text-sm text-ink-dim">Identity confirmed. Your first move is ready whenever you are.</p>
                </>
              )}
              <button type="button" onClick={reset} className="cursor-target mt-5 label-tight text-ink-dim transition-colors hover:text-ink">
                Try another method
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* right: help chat */}
      <div className="panel flex flex-col p-6 sm:p-7">
        <p className="label text-ink-dim">Need help checking in?</p>
        <div className="mt-4 flex-1">
          <Chatbot context="check-in" seed="I can help you check in. Ask me anything, or pick a method on the left." placeholder="Ask about check-in" onActivity={(t) => setMood(t ? "talking" : "idle")} />
        </div>
      </div>
    </div>
  );
}
