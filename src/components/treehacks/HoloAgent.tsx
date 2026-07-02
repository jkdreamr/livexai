"use client";

import { useEffect, useRef } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "framer-motion";
import { useMounted, useReducedMotion } from "@/lib/hooks";

export type AgentMood = "idle" | "talking" | "scanning" | "happy";

/**
 * The Builder Guide, drawn as a projected holographic person (a bust that
 * dissolves into a projector beam). Not a photoreal face. It breathes, drifts,
 * runs scanlines, and reacts to what the visitor is doing. Tilts with the
 * pointer for depth. Static under reduced motion.
 */
export function HoloAgent({ mood = "idle" }: { mood?: AgentMood }) {
  const reduced = useReducedMotion();
  const mounted = useMounted();
  const live = mounted && !reduced;
  const wrap = useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const rotX = useSpring(useTransform(my, [-1, 1], [8, -8]), {
    stiffness: 120,
    damping: 18,
  });
  const rotY = useSpring(useTransform(mx, [-1, 1], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });

  useEffect(() => {
    if (!live) return;
    const onMove = (e: PointerEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      mx.set(((e.clientX - r.left) / r.width) * 2 - 1);
      my.set(((e.clientY - r.top) / r.height) * 2 - 1);
    };
    window.addEventListener("pointermove", onMove);
    return () => window.removeEventListener("pointermove", onMove);
  }, [live, mx, my]);

  const active = mood === "talking" || mood === "scanning";

  return (
    <div ref={wrap} className="relative flex h-full w-full items-center justify-center" style={{ perspective: 700 }}>
      {/* projector floor glow */}
      <div
        aria-hidden
        className="absolute bottom-6 h-10 w-48 rounded-[100%] blur-xl"
        style={{ background: "radial-gradient(ellipse, rgba(47,128,255,0.5), transparent 70%)" }}
      />

      <motion.div
        style={live ? { rotateX: rotX, rotateY: rotY, transformStyle: "preserve-3d" } : undefined}
        animate={live ? { y: [0, -8, 0] } : undefined}
        transition={{ duration: 5, ease: "easeInOut", repeat: Infinity }}
        className="relative"
      >
        <svg viewBox="0 0 220 260" width="240" height="284" className="overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="holoFade" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#8fc4ff" stopOpacity="0.95" />
              <stop offset="55%" stopColor="#3f8bff" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#3f8bff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="holoFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgba(63,139,255,0.16)" />
              <stop offset="100%" stopColor="rgba(63,139,255,0)" />
            </linearGradient>
            <radialGradient id="holoCore" cx="50%" cy="34%" r="60%">
              <stop offset="0%" stopColor="rgba(143,196,255,0.5)" />
              <stop offset="100%" stopColor="transparent" />
            </radialGradient>
          </defs>

          {/* core aura */}
          <ellipse cx="110" cy="96" rx="78" ry="96" fill="url(#holoCore)" />

          {/* bust: head + shoulders, dissolving downward */}
          <g fill="url(#holoFill)" stroke="url(#holoFade)" strokeWidth="1.6" strokeLinejoin="round">
            <circle cx="110" cy="72" r="34" />
            <path d="M52 236 C52 168 80 132 110 132 C140 132 168 168 168 236 Z" />
            {/* shoulder collar line */}
            <path d="M74 172 C90 156 130 156 146 172" fill="none" strokeWidth="1.2" opacity="0.7" />
          </g>

          {/* listening ring at the head */}
          <motion.circle
            cx="110"
            cy="72"
            r="44"
            fill="none"
            stroke="#7fead1"
            strokeWidth="1"
            strokeDasharray="3 8"
            opacity={0.6}
            animate={live ? { rotate: 360 } : undefined}
            transition={{ duration: 18, ease: "linear", repeat: Infinity }}
            style={{ transformOrigin: "110px 72px" }}
          />

          {/* voice pulse when talking / scan bar when scanning */}
          {live && active && (
            <motion.rect
              x="46"
              width="128"
              height={mood === "scanning" ? 2.5 : 1.6}
              fill={mood === "scanning" ? "#7fead1" : "#8fc4ff"}
              opacity="0.85"
              initial={{ y: 40 }}
              animate={{ y: mood === "scanning" ? [40, 230, 40] : [96, 150, 96] }}
              transition={{ duration: mood === "scanning" ? 2.4 : 1.1, ease: "easeInOut", repeat: Infinity }}
            />
          )}
        </svg>

        {/* scanline overlay */}
        {live && (
          <motion.div
            aria-hidden
            className="pointer-events-none absolute inset-0"
            style={{
              backgroundImage:
                "repeating-linear-gradient(0deg, rgba(143,196,255,0.10) 0px, rgba(143,196,255,0.10) 1px, transparent 2px, transparent 4px)",
              maskImage: "linear-gradient(180deg, black 60%, transparent)",
              WebkitMaskImage: "linear-gradient(180deg, black 60%, transparent)",
            }}
            animate={{ backgroundPositionY: [0, 4] }}
            transition={{ duration: 0.5, ease: "linear", repeat: Infinity }}
          />
        )}
      </motion.div>
    </div>
  );
}
