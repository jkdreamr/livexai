"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMounted, useReducedMotion } from "@/lib/hooks";

/**
 * Floating panel (cult-ui style): a trigger that morphs open into a small
 * dark note composer, then morphs closed. Fully self-contained.
 */
export default function KitFloatingPanel() {
  const [open, setOpen] = useState(false);
  const [note, setNote] = useState("");
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (open && mounted && !reduced) textareaRef.current?.focus();
  }, [open, mounted, reduced]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  function submit() {
    // eslint-disable-next-line no-console
    console.log("[LiveX note]", note.trim());
    setNote("");
    setOpen(false);
  }

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 420, damping: 34, mass: 0.7 };

  return (
    <div className="flex min-h-[240px] w-full items-center justify-center p-8">
      <motion.div layout className="relative">
        <AnimatePresence mode="popLayout" initial={false}>
          {!open ? (
            <motion.button
              key="trigger"
              type="button"
              layoutId="kit-floating-panel"
              onClick={() => setOpen(true)}
              className="cursor-target group flex items-center gap-2 rounded-xl border border-line bg-charcoal px-4 py-2.5 text-sm text-ink-soft transition-colors hover:border-line-strong hover:text-ink"
              transition={spring}
              whileTap={reduced ? undefined : { scale: 0.97 }}
            >
              <motion.span layout="position" className="flex items-center gap-2">
                <Plus className="size-4 text-college" strokeWidth={1.75} />
                Add a note
              </motion.span>
            </motion.button>
          ) : (
            <motion.div
              key="panel"
              layoutId="kit-floating-panel"
              transition={spring}
              className="panel w-[320px] overflow-hidden rounded-2xl p-4 shadow-2xl shadow-black/40"
            >
              <motion.div
                initial={reduced ? false : { opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: reduced ? 0 : 0.08, duration: 0.2 }}
              >
                <div className="mb-2 flex items-center justify-between">
                  <span className="label-tight text-ink-dim">Surface note</span>
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-target -mr-1 rounded-md p-1 text-ink-dim transition-colors hover:text-ink"
                    aria-label="Close"
                  >
                    <X className="size-4" strokeWidth={1.75} />
                  </button>
                </div>
                <textarea
                  ref={textareaRef}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder="Annotate a surface, flag a signal…"
                  rows={3}
                  className="w-full resize-none rounded-lg border border-line bg-void/60 px-3 py-2 text-sm text-ink placeholder:text-ink-faint focus:border-college/50 focus:outline-none"
                />
                <div className="mt-3 flex items-center justify-end gap-2">
                  <button
                    type="button"
                    onClick={() => setOpen(false)}
                    className="cursor-target rounded-lg px-3 py-1.5 text-sm text-ink-dim transition-colors hover:text-ink"
                  >
                    Close
                  </button>
                  <button
                    type="button"
                    onClick={submit}
                    disabled={!note.trim()}
                    className={cn(
                      "cursor-target rounded-lg px-3 py-1.5 text-sm font-medium transition-colors",
                      note.trim()
                        ? "bg-college text-void hover:bg-college/90"
                        : "cursor-not-allowed bg-white/[0.04] text-ink-faint"
                    )}
                  >
                    Submit
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
