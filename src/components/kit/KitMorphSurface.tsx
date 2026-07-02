"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp, MessageSquarePlus } from "lucide-react";
import { cn } from "@/lib/cn";
import { useMounted, useReducedMotion } from "@/lib/hooks";

/**
 * Morph surface: a collapsed pill that springs open into an input surface
 * (text field + send), and collapses back. Compact and self-contained.
 */
export default function KitMorphSurface() {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open && mounted && !reduced) inputRef.current?.focus();
  }, [open, mounted, reduced]);

  function send() {
    const v = value.trim();
    if (!v) return;
    console.log("[LiveX feedback]", v);
    setValue("");
    setOpen(false);
  }

  const spring = reduced
    ? { duration: 0 }
    : { type: "spring" as const, stiffness: 380, damping: 32, mass: 0.8 };

  return (
    <div className="flex min-h-[200px] w-full items-center justify-center p-8">
      <motion.div
        layout
        transition={spring}
        className={cn(
          "flex items-center overflow-hidden rounded-full border bg-charcoal",
          open ? "border-line-strong" : "border-line"
        )}
        style={{ width: open ? 340 : 156, height: 44 }}
      >
        <AnimatePresence mode="wait" initial={false}>
          {!open ? (
            <motion.button
              key="pill"
              type="button"
              onClick={() => setOpen(true)}
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.12 }}
              className="cursor-target flex h-full w-full items-center justify-center gap-2 px-4 text-sm text-ink-soft transition-colors hover:text-ink"
              whileTap={reduced ? undefined : { scale: 0.97 }}
            >
              <MessageSquarePlus
                className="size-4 text-college"
                strokeWidth={1.75}
              />
              Send feedback
            </motion.button>
          ) : (
            <motion.div
              key="input"
              initial={reduced ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: reduced ? 0 : 0.16, delay: reduced ? 0 : 0.06 }}
              className="flex h-full w-full items-center gap-2 pl-4 pr-1.5"
            >
              <input
                ref={inputRef}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                  if (e.key === "Escape") setOpen(false);
                }}
                placeholder="How's the surface reading?"
                className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink placeholder:text-ink-faint focus:outline-none"
              />
              <button
                type="button"
                onClick={send}
                disabled={!value.trim()}
                aria-label="Send"
                className={cn(
                  "cursor-target grid size-8 shrink-0 place-items-center rounded-full transition-colors",
                  value.trim()
                    ? "bg-college text-void hover:bg-college/90"
                    : "cursor-not-allowed bg-white/[0.05] text-ink-faint"
                )}
              >
                <ArrowUp className="size-4" strokeWidth={2} />
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
