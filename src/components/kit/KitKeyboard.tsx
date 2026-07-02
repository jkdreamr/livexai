"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Volume2, VolumeX } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * KitKeyboard — a compact interactive keyboard. Keycaps depress on click and
 * when the matching physical key is pressed. Optional subtle WebAudio click,
 * default muted, never plays under reduced motion.
 */

const ROWS: string[][] = [
  ["Q", "W", "E", "R", "T", "Y"],
  ["A", "S", "D", "F", "G", "H"],
  ["L", "I", "V", "E", "X"],
];

// The "LIVEX" keys get a faint accent tint.
const ACCENT = new Set(["L", "I", "V", "E", "X"]);

export default function KitKeyboard() {
  const reduced = useReducedMotion();
  const [pressed, setPressed] = useState<Set<string>>(new Set());
  const [muted, setMuted] = useState(true);
  const audioCtxRef = useRef<AudioContext | null>(null);

  const click = useCallback(() => {
    if (muted || reduced) return;
    try {
      let ctx = audioCtxRef.current;
      if (!ctx) {
        const AC =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext })
            .webkitAudioContext;
        ctx = new AC();
        audioCtxRef.current = ctx;
      }
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "triangle";
      osc.frequency.setValueAtTime(720, now);
      osc.frequency.exponentialRampToValueAtTime(180, now + 0.05);
      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.07);
      osc.connect(gain).connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.08);
    } catch {
      /* audio not available — silent */
    }
  }, [muted, reduced]);

  const down = useCallback(
    (key: string) => {
      setPressed((prev) => {
        if (prev.has(key)) return prev;
        const next = new Set(prev);
        next.add(key);
        return next;
      });
      click();
    },
    [click]
  );

  const up = useCallback((key: string) => {
    setPressed((prev) => {
      if (!prev.has(key)) return prev;
      const next = new Set(prev);
      next.delete(key);
      return next;
    });
  }, []);

  const allKeys = ROWS.flat();

  useEffect(() => {
    const valid = new Set(allKeys);
    const onDown = (e: KeyboardEvent) => {
      if (e.repeat) return;
      const k = e.key.toUpperCase();
      if (valid.has(k)) down(k);
    };
    const onUp = (e: KeyboardEvent) => {
      const k = e.key.toUpperCase();
      if (valid.has(k)) up(k);
    };
    window.addEventListener("keydown", onDown);
    window.addEventListener("keyup", onUp);
    return () => {
      window.removeEventListener("keydown", onDown);
      window.removeEventListener("keyup", onUp);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [down, up]);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-4">
      <div className="panel flex flex-col gap-1.5 rounded-2xl p-3">
        {ROWS.map((row, ri) => (
          <div key={ri} className="flex justify-center gap-1.5">
            {row.map((key) => {
              const isDown = pressed.has(key);
              const accent = ACCENT.has(key);
              return (
                <motion.button
                  key={key}
                  type="button"
                  aria-pressed={isDown}
                  onPointerDown={() => down(key)}
                  onPointerUp={() => up(key)}
                  onPointerLeave={() => up(key)}
                  animate={
                    reduced
                      ? {}
                      : { y: isDown ? 2 : 0, scale: isDown ? 0.97 : 1 }
                  }
                  transition={{ type: "spring", stiffness: 600, damping: 30 }}
                  className={cn(
                    "cursor-target relative flex h-11 w-11 items-center justify-center rounded-lg border font-mono text-sm select-none",
                    "border-line bg-white/[0.03] text-ink-soft",
                    "before:absolute before:inset-x-1 before:top-0.5 before:h-1/3 before:rounded-t-md before:bg-gradient-to-b before:from-white/[0.08] before:to-transparent before:content-['']",
                    isDown
                      ? "shadow-none"
                      : "shadow-[0_3px_0_0_rgba(0,0,0,0.5)]",
                    accent && "text-college"
                  )}
                >
                  {key}
                </motion.button>
              );
            })}
          </div>
        ))}
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={() => setMuted((m) => !m)}
          className="cursor-target flex items-center gap-1.5 rounded-md border border-line px-2.5 py-1 text-ink-dim transition-colors hover:border-line-strong hover:text-ink-soft"
        >
          {muted ? (
            <VolumeX className="h-3.5 w-3.5" strokeWidth={1.75} />
          ) : (
            <Volume2 className="h-3.5 w-3.5 text-college" strokeWidth={1.75} />
          )}
          <span className="label-tight">{muted ? "sound off" : "sound on"}</span>
        </button>
        <p className="label-tight text-ink-faint">
          type on your keyboard
        </p>
      </div>
    </div>
  );
}
