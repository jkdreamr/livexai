"use client";

import { useCallback, useEffect, useState, type ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import { DocsNav } from "./DocsNav";
import { DOCS_OUTLINE, DOCS_SECTION_IDS } from "./nav";
import { useScrollSpy } from "./useScrollSpy";

/** Branches start expanded so the whole outline is visible on open. */
function initialOpenState(): Record<string, boolean> {
  const state: Record<string, boolean> = {};
  for (const world of DOCS_OUTLINE) {
    for (const branch of world.branches) state[branch.id] = true;
  }
  return state;
}

export function DocsShell({ children }: { children: ReactNode }) {
  const activeId = useScrollSpy(DOCS_SECTION_IDS);
  const [open, setOpen] = useState<Record<string, boolean>>(initialOpenState);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const reduced = useReducedMotion();

  const handleToggle = useCallback((branchId: string) => {
    setOpen((prev) => ({ ...prev, [branchId]: !(prev[branchId] ?? true) }));
  }, []);

  const scrollToId = useCallback(
    (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.scrollIntoView({
        behavior: reduced ? "auto" : "smooth",
        block: "start",
      });
    },
    [reduced]
  );

  const handleSelect = useCallback(
    (id: string) => {
      scrollToId(id);
      setDrawerOpen(false);
    },
    [scrollToId]
  );

  // Close the mobile drawer on Escape.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setDrawerOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawerOpen]);

  const nav = (
    <DocsNav
      activeId={activeId}
      open={open}
      onToggle={handleToggle}
      onSelect={handleSelect}
    />
  );

  return (
    <div className="container-x pt-24">
      <div className="lg:grid lg:grid-cols-[15.5rem_minmax(0,1fr)] lg:gap-14 xl:grid-cols-[17rem_minmax(0,1fr)]">
        {/* Desktop side-nav: sticky, own scroll */}
        <aside className="hidden lg:block">
          <div className="sticky top-24 max-h-[calc(100vh-8rem)] overflow-y-auto pr-3 pb-16">
            <p className="label mb-6 flex items-center gap-2 text-brand">
              <span className="size-1.5 rounded-full bg-brand" />
              Contents
            </p>
            {nav}
          </div>
        </aside>

        {/* Mobile disclosure */}
        <div className="lg:hidden">
          <button
            type="button"
            onClick={() => setDrawerOpen(true)}
            aria-expanded={drawerOpen}
            aria-controls="docs-drawer"
            className="cursor-target flex w-full items-center justify-between rounded-lg border border-line bg-charcoal px-4 py-3 text-left transition-colors hover:border-line-strong"
          >
            <span className="flex items-center gap-2.5">
              <span className="size-1.5 rounded-full bg-brand" />
              <span className="label text-brand">Contents</span>
            </span>
            <span className="label-tight text-ink-dim">Open outline</span>
          </button>
        </div>

        {/* Reading column */}
        <div className="min-w-0 pt-10 lg:pt-0">{children}</div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {drawerOpen && (
          <motion.div
            className="fixed inset-0 z-50 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduced ? 0 : 0.2 }}
          >
            <button
              type="button"
              aria-label="Close outline"
              onClick={() => setDrawerOpen(false)}
              className="absolute inset-0 bg-void/70 backdrop-blur-sm"
            />
            <motion.div
              id="docs-drawer"
              role="dialog"
              aria-label="Document outline"
              className="absolute inset-y-0 left-0 flex w-[min(20rem,86vw)] flex-col border-r border-line bg-abyss"
              initial={{ x: reduced ? 0 : "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: reduced ? 0 : "-100%" }}
              transition={{ duration: reduced ? 0 : 0.34, ease: ease.out }}
            >
              <div className="flex items-center justify-between border-b border-line px-5 py-4">
                <span className="label flex items-center gap-2 text-brand">
                  <span className="size-1.5 rounded-full bg-brand" />
                  Contents
                </span>
                <button
                  type="button"
                  onClick={() => setDrawerOpen(false)}
                  className={cn(
                    "cursor-target grid size-8 place-items-center rounded-md text-ink-dim transition-colors hover:bg-white/[0.04] hover:text-ink"
                  )}
                  aria-label="Close"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 6 6 18M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="flex-1 overflow-y-auto px-5 py-6">{nav}</div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
