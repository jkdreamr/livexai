"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * KitAnimatedIcons - three dark icon tiles with micro-interactions:
 *  (a) arrow that grows / nudges on hover
 *  (b) hamburger that morphs into an X on click
 *  (c) volume icon that toggles mute (slash animates in + shakes)
 */

const STROKE = "#eceef3";

function Tile({
  children,
  label,
  onClick,
  active,
}: {
  children: React.ReactNode;
  label: string;
  onClick?: () => void;
  active?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "cursor-target group relative flex h-24 w-24 flex-col items-center justify-center gap-3 rounded-xl border border-line bg-white/[0.03] transition-colors",
        "hover:border-line-strong hover:bg-white/[0.05]",
        active && "border-college/40"
      )}
    >
      <div className="flex h-8 w-8 items-center justify-center text-ink">
        {children}
      </div>
      <span className="label-tight text-ink-faint">{label}</span>
    </button>
  );
}

export default function KitAnimatedIcons() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const [muted, setMuted] = useState(false);

  return (
    <div className="flex w-full max-w-md flex-col items-center gap-5">
      <div className="flex items-center gap-4">
        {/* (a) Arrow - grows / nudges on hover */}
        <Tile label="hover">
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <motion.g
              initial={false}
              whileHover={reduced ? undefined : { x: 3, scale: 1.08 }}
              transition={{ type: "spring", stiffness: 400, damping: 18 }}
            >
              <path
                d="M4 12h13"
                stroke={STROKE}
                strokeWidth={1.75}
                strokeLinecap="round"
                className="origin-left transition-transform duration-300 group-hover:scale-x-110"
              />
              <path
                d="M12 6l6 6-6 6"
                stroke={STROKE}
                strokeWidth={1.75}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </motion.g>
          </svg>
        </Tile>

        {/* (b) Hamburger → X on click */}
        <Tile label="click" onClick={() => setOpen((v) => !v)} active={open}>
          <svg viewBox="0 0 24 24" fill="none" className="h-full w-full">
            <motion.path
              d="M4 7h16"
              stroke={STROKE}
              strokeWidth={1.75}
              strokeLinecap="round"
              animate={
                reduced
                  ? {}
                  : open
                    ? { rotate: 45, y: 5, x: 0 }
                    : { rotate: 0, y: 0 }
              }
              style={{ transformOrigin: "12px 7px" }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            />
            <motion.path
              d="M4 12h16"
              stroke={STROKE}
              strokeWidth={1.75}
              strokeLinecap="round"
              animate={reduced ? {} : { opacity: open ? 0 : 1, x: open ? -6 : 0 }}
              transition={{ duration: 0.18 }}
            />
            <motion.path
              d="M4 17h16"
              stroke={STROKE}
              strokeWidth={1.75}
              strokeLinecap="round"
              animate={
                reduced
                  ? {}
                  : open
                    ? { rotate: -45, y: -5, x: 0 }
                    : { rotate: 0, y: 0 }
              }
              style={{ transformOrigin: "12px 17px" }}
              transition={{ type: "spring", stiffness: 380, damping: 24 }}
            />
          </svg>
        </Tile>

        {/* (c) Volume mute toggle */}
        <Tile label="mute" onClick={() => setMuted((v) => !v)} active={muted}>
          <motion.svg
            viewBox="0 0 24 24"
            fill="none"
            className="h-full w-full"
            animate={
              reduced || !muted ? {} : { x: [0, -1.5, 1.5, -1, 0] }
            }
            transition={{ duration: 0.32 }}
          >
            <path
              d="M4 9v6h3l5 4V5L7 9H4z"
              stroke={STROKE}
              strokeWidth={1.6}
              strokeLinejoin="round"
              fill="none"
            />
            <AnimatePresence initial={false}>
              {!muted && (
                <motion.g
                  key="waves"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  <path
                    d="M16 9.5a3.5 3.5 0 010 5"
                    stroke={STROKE}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                  <path
                    d="M18.5 7a7 7 0 010 10"
                    stroke={STROKE}
                    strokeWidth={1.6}
                    strokeLinecap="round"
                  />
                </motion.g>
              )}
              {muted && (
                <motion.path
                  key="slash"
                  d="M16 9l5 6"
                  stroke="#7fead1"
                  strokeWidth={1.75}
                  strokeLinecap="round"
                  initial={reduced ? { pathLength: 1 } : { pathLength: 0 }}
                  animate={{ pathLength: 1 }}
                  exit={{ pathLength: 0 }}
                  transition={{ duration: 0.22 }}
                />
              )}
            </AnimatePresence>
          </motion.svg>
        </Tile>
      </div>

      <p className="label-tight text-ink-faint">hover / click the icons</p>
    </div>
  );
}
