"use client";

import { useEffect } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useMounted, useReducedMotion } from "@/lib/hooks";
import { accentClasses, type Accent } from "./theme";

/**
 * The core LiveX moment: context leaves a physical presence, resolves into a
 * QR, and re-materialises inside a phone - without losing the selected intent.
 * Driven by one looping clock (0→1) so every element stays in sync. Under
 * reduced motion it renders the *arrived* end-state statically.
 */
function MiniQR({ color }: { color: string }) {
  // A legible QR-like module pattern (not a real code - illustrative).
  const cells = [
    [0, 0], [1, 0], [2, 0], [4, 0], [5, 0], [6, 0],
    [0, 1], [2, 1], [4, 1], [6, 1],
    [0, 2], [1, 2], [2, 2], [4, 2], [5, 2], [6, 2],
    [3, 3], [1, 3],
    [0, 4], [2, 4], [3, 4], [6, 4], [4, 4],
    [0, 5], [4, 5], [6, 5],
    [0, 6], [1, 6], [2, 6], [3, 6], [5, 6], [6, 6],
  ];
  return (
    <svg viewBox="0 0 7 7" className="size-full" aria-hidden>
      {cells.map(([x, y], i) => (
        <rect key={i} x={x} y={y} width="1" height="1" fill={color} rx="0.15" />
      ))}
    </svg>
  );
}

export function SurfaceTransfer({
  accent,
  intent = "Find a team",
  context = "3 open teams match your idea",
  className,
}: {
  accent: Accent;
  intent?: string;
  context?: string;
  className?: string;
}) {
  const a = accentClasses(accent);
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduced;

  const t = useMotionValue(0);
  useEffect(() => {
    if (!live) return;
    const controls = animate(t, 1, {
      duration: 4.4,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [live, t]);

  // Derived timelines (clamped 0..1 clock)
  const particleLeft = useTransform(t, [0.12, 0.52], ["29%", "71%"], {
    clamp: true,
  });
  const particleOpacity = useTransform(
    t,
    [0.08, 0.14, 0.48, 0.56],
    [0, 1, 1, 0]
  );
  const emitGlow = useTransform(t, [0.05, 0.14, 0.24], [0.3, 1, 0.4]);
  const qrGlow = useTransform(t, [0.26, 0.36, 0.46], [0.35, 1, 0.5]);
  const phoneFill = useTransform(t, [0.52, 0.62], [0, 1], { clamp: true });
  const phoneChip = useTransform(t, [0.56, 0.66], [0, 1], { clamp: true });
  const phoneBg = useTransform(
    phoneFill,
    [0, 1],
    ["rgba(255,255,255,0)", "rgba(255,255,255,0.05)"]
  );

  // Static end-state values under reduced motion.
  const s = live
    ? {}
    : { emit: 0.6, qr: 0.8, filled: 1, chip: 1 };

  return (
    <div
      className={`panel relative overflow-hidden px-5 py-10 sm:px-10 sm:py-14 ${className ?? ""}`}
    >
      {/* faint accent floor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2 opacity-[0.06] blur-2xl"
        style={{ background: a.stroke }}
      />

      <div className="relative flex items-center justify-between gap-2">
        {/* ---- Physical presence ---- */}
        <figure className="flex w-[28%] flex-col items-center gap-4">
          <motion.div
            className="relative grid h-24 w-10 place-items-end sm:h-28"
            style={{ opacity: live ? emitGlow : s.emit }}
          >
            <div
              className="absolute inset-x-0 bottom-0 top-2 rounded-full blur-md"
              style={{
                background: `linear-gradient(to top, ${a.stroke}, transparent)`,
                opacity: 0.5,
              }}
            />
            <div
              className="relative h-full w-1.5 justify-self-center rounded-full"
              style={{ background: `linear-gradient(to top, ${a.stroke}, transparent)` }}
            />
            <span
              className="absolute left-1/2 top-0 size-2 -translate-x-1/2 rounded-full"
              style={{ background: a.stroke, boxShadow: `0 0 12px ${a.stroke}` }}
            />
          </motion.div>
          <figcaption className="text-center">
            <p className="label-tight text-ink-dim">Physical guide</p>
            <span
              className="mt-2 inline-block rounded-full border px-2.5 py-1 text-[0.7rem] text-ink-soft"
              style={{ borderColor: a.stroke }}
            >
              {intent}
            </span>
          </figcaption>
        </figure>

        {/* ---- Path + QR ---- */}
        <div className="relative flex flex-1 flex-col items-center">
          <div className="relative flex w-full items-center">
            <span className="h-px flex-1 bg-line" />
            <motion.div
              className="mx-2 grid size-11 place-items-center rounded-md border p-1.5 sm:size-14"
              style={{
                borderColor: a.stroke,
                opacity: live ? qrGlow : s.qr,
                boxShadow: `0 0 20px -6px ${a.stroke}`,
              }}
            >
              <MiniQR color={a.stroke} />
            </motion.div>
            <span className="h-px flex-1 bg-line" />
          </div>
          <p className="label-tight mt-4 text-ink-faint">Handoff · scan</p>

          {/* Travelling signal */}
          {live && (
            <motion.span
              aria-hidden
              className="absolute top-0 size-2.5 rounded-full"
              style={{
                left: particleLeft,
                opacity: particleOpacity,
                background: a.stroke,
                boxShadow: `0 0 14px ${a.stroke}`,
                translateX: "-50%",
              }}
            />
          )}
        </div>

        {/* ---- Mobile ---- */}
        <figure className="flex w-[28%] flex-col items-center gap-4">
          <motion.div
            className="relative h-24 w-[3.2rem] rounded-[0.8rem] border border-line-strong bg-abyss p-1.5 sm:h-28 sm:w-16"
            style={{
              boxShadow: `0 0 0 1px rgba(255,255,255,0.02)`,
            }}
          >
            <motion.div
              className="flex h-full w-full flex-col items-center justify-center gap-1.5 rounded-[0.55rem] p-1"
              style={{
                background: live ? phoneBg : "rgba(255,255,255,0.05)",
              }}
            >
              <motion.span
                className="rounded-full px-1.5 py-0.5 text-center text-[0.55rem] leading-tight text-ink"
                style={{
                  opacity: live ? phoneChip : s.chip,
                  border: `1px solid ${a.stroke}`,
                }}
              >
                {intent}
              </motion.span>
              <motion.span
                className="px-1 text-center text-[0.5rem] leading-tight text-ink-dim"
                style={{ opacity: live ? phoneChip : s.chip }}
              >
                {context}
              </motion.span>
            </motion.div>
          </motion.div>
          <figcaption className="text-center">
            <p className="label-tight text-ink-dim">On phone</p>
            <p className="mt-2 text-[0.7rem] text-ink-faint">Intent preserved</p>
          </figcaption>
        </figure>
      </div>
    </div>
  );
}
