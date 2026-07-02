"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Smartphone, MapPin } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * KitExpandable — one dark card (cult-ui "Expandable" style). Expands on hover
 * or click to reveal detail rows with a staggered blur-in and a small CTA.
 * Themed to a LiveX "Physical → Mobile handoff" surface.
 */

const DETAILS: { label: string; value: string }[] = [
  { label: "Trigger", value: "Court-side QR / NFC tap" },
  { label: "Latency", value: "< 400ms to live session" },
  { label: "State", value: "Seat, roster, replay carried over" },
];

export default function KitExpandable() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);

  const expand = () => setOpen(true);
  const collapse = () => setOpen(false);

  return (
    <motion.div
      layout={!reduced}
      onHoverStart={expand}
      onHoverEnd={collapse}
      onClick={() => setOpen((v) => !v)}
      transition={{ type: "spring", stiffness: 260, damping: 30 }}
      className={cn(
        "cursor-target panel group relative overflow-hidden rounded-2xl p-5",
        "min-h-[200px] w-[320px]",
        open && "w-[380px]"
      )}
    >
      {/* Ambient accent wash on expand */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="wash"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-college/10 blur-3xl"
          />
        )}
      </AnimatePresence>

      <motion.div layout={!reduced} className="relative flex flex-col gap-4">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/[0.03]">
              <MapPin className="h-4 w-4 text-college" strokeWidth={1.75} />
            </div>
            <ArrowUpRight className="h-4 w-4 text-ink-faint" strokeWidth={1.75} />
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-line bg-white/[0.03]">
              <Smartphone className="h-4 w-4 text-ink-soft" strokeWidth={1.75} />
            </div>
          </div>
          <span className="label-tight text-ink-faint">surface</span>
        </div>

        <div className="flex flex-col gap-1.5">
          <h3 className="font-display text-lg leading-tight text-ink">
            Physical → Mobile handoff
          </h3>
          <p className="text-sm leading-relaxed text-ink-soft">
            The moment a fan leaves their seat, the live surface follows them
            onto glass.
          </p>
        </div>

        <AnimatePresence>
          {open && (
            <motion.div
              key="details"
              initial={reduced ? false : { opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={reduced ? undefined : { opacity: 0, height: 0 }}
              transition={{ duration: 0.28 }}
              className="flex flex-col gap-2 overflow-hidden"
            >
              <div className="hairline my-1" />
              {DETAILS.map((d, i) => (
                <motion.div
                  key={d.label}
                  initial={
                    reduced
                      ? false
                      : { opacity: 0, filter: "blur(6px)", y: 6 }
                  }
                  animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                  transition={{ delay: reduced ? 0 : 0.06 + i * 0.07, duration: 0.3 }}
                  className="flex items-center justify-between"
                >
                  <span className="label-tight text-ink-dim">{d.label}</span>
                  <span className="font-mono text-xs text-ink-soft">
                    {d.value}
                  </span>
                </motion.div>
              ))}

              <motion.button
                type="button"
                initial={
                  reduced ? false : { opacity: 0, filter: "blur(6px)", y: 6 }
                }
                animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
                transition={{ delay: reduced ? 0 : 0.34, duration: 0.3 }}
                className="cursor-target mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-college/30 bg-college/10 px-3 py-2 text-college transition-colors hover:bg-college/15"
              >
                <span className="label-tight">Trace this handoff</span>
                <ArrowUpRight className="h-3.5 w-3.5" strokeWidth={2} />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.div>
  );
}
