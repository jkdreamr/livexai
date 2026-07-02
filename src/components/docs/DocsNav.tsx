"use client";

import { useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { spring, ease } from "@/lib/motion";
import { useReducedMotion } from "@/lib/hooks";
import {
  DOCS_OUTLINE,
  type DocsAccent,
  type DocsWorldNode,
} from "./nav";

interface DocsNavProps {
  activeId: string | null;
  /** Which branch ids are expanded. */
  open: Record<string, boolean>;
  onToggle: (branchId: string) => void;
  onSelect: (leafId: string) => void;
}

const ACCENT_TEXT: Record<DocsAccent, string> = {
  brand: "text-brand",
  college: "text-college",
  standard: "text-standard",
};

const ACCENT_DOT: Record<DocsAccent, string> = {
  brand: "bg-brand",
  college: "bg-college",
  standard: "bg-standard",
};

export function DocsNav({ activeId, open, onToggle, onSelect }: DocsNavProps) {
  return (
    <nav aria-label="Document outline" className="flex flex-col gap-8">
      {DOCS_OUTLINE.map((world) => (
        <WorldGroup
          key={world.id}
          world={world}
          activeId={activeId}
          open={open}
          onToggle={onToggle}
          onSelect={onSelect}
        />
      ))}
    </nav>
  );
}

function WorldGroup({
  world,
  activeId,
  open,
  onToggle,
  onSelect,
}: { world: DocsWorldNode } & DocsNavProps) {
  return (
    <div>
      <div className="mb-3 flex items-center gap-2.5 px-1">
        <span className={cn("size-1.5 rounded-full", ACCENT_DOT[world.accent])} />
        <span className={cn("label-tight", ACCENT_TEXT[world.accent])}>
          {world.label}
        </span>
        <span className="label-tight text-ink-faint">· {world.note}</span>
      </div>

      <ul className="flex flex-col gap-0.5">
        {world.branches.map((branch) => {
          const isOpen = open[branch.id] ?? true;
          return (
            <li key={branch.id}>
              <BranchToggle
                label={branch.label}
                isOpen={isOpen}
                accent={world.accent}
                onClick={() => onToggle(branch.id)}
              />
              <ChildList
                isOpen={isOpen}
                accent={world.accent}
                items={branch.children}
                activeId={activeId}
                onSelect={onSelect}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function BranchToggle({
  label,
  isOpen,
  accent,
  onClick,
}: {
  label: string;
  isOpen: boolean;
  accent: DocsAccent;
  onClick: () => void;
}) {
  const reduced = useReducedMotion();
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={isOpen}
      className="cursor-target group flex w-full items-center gap-2 rounded-md px-1 py-1.5 text-left transition-colors hover:bg-white/[0.03]"
    >
      <motion.span
        aria-hidden
        animate={{ rotate: isOpen ? 90 : 0 }}
        transition={reduced ? { duration: 0 } : { duration: 0.24, ease: ease.out }}
        className="grid size-4 shrink-0 place-items-center text-ink-faint group-hover:text-ink-dim"
      >
        <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="m9 18 6-6-6-6" />
        </svg>
      </motion.span>
      <span
        className={cn(
          "font-display text-[0.95rem] text-ink-soft transition-colors group-hover:text-ink",
          isOpen && ACCENT_TEXT[accent]
        )}
      >
        {label}
      </span>
    </button>
  );
}

function ChildList({
  isOpen,
  accent,
  items,
  activeId,
  onSelect,
}: {
  isOpen: boolean;
  accent: DocsAccent;
  items: { id: string; label: string }[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion();

  const content = (
    <ul className="ml-[0.55rem] flex flex-col border-l border-line py-1 pl-3">
      {items.map((leaf) => (
        <LeafItem
          key={leaf.id}
          leaf={leaf}
          accent={accent}
          isActive={activeId === leaf.id}
          onSelect={onSelect}
        />
      ))}
    </ul>
  );

  if (reduced) {
    return isOpen ? content : null;
  }

  return (
    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          key="children"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            height: { duration: 0.32, ease: ease.out },
            opacity: { duration: 0.22, ease: ease.out },
          }}
          className="overflow-hidden"
        >
          {content}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function LeafItem({
  leaf,
  accent,
  isActive,
  onSelect,
}: {
  leaf: { id: string; label: string };
  accent: DocsAccent;
  isActive: boolean;
  onSelect: (id: string) => void;
}) {
  const reduced = useReducedMotion();
  const handleClick = useCallback(() => onSelect(leaf.id), [leaf.id, onSelect]);

  return (
    <li className="relative">
      {isActive && (
        <motion.span
          layoutId="docs-active-indicator"
          aria-hidden
          className={cn(
            "absolute -left-[13px] top-1/2 h-4 w-0.5 -translate-y-1/2 rounded-full",
            ACCENT_DOT[accent]
          )}
          transition={
            reduced ? { duration: 0 } : spring.snappy
          }
        />
      )}
      <button
        type="button"
        onClick={handleClick}
        aria-current={isActive ? "true" : undefined}
        className={cn(
          "cursor-target block w-full rounded-md px-2 py-1.5 text-left text-[0.82rem] leading-snug transition-colors",
          isActive
            ? "bg-white/[0.04] text-ink"
            : "text-ink-dim hover:bg-white/[0.02] hover:text-ink-soft"
        )}
      >
        {leaf.label}
      </button>
    </li>
  );
}
