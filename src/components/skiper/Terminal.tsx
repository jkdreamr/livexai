"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/cn";
import { useReducedMotion } from "@/lib/hooks";

/**
 * Terminal (adapted from Skiper UI). Types each command, reveals its outputs,
 * then moves on. Reduced motion renders the whole session statically.
 */
export function Terminal({
  commands,
  outputs = {},
  typingSpeed = 42,
  delayBetweenCommands = 1000,
  title = "livex · surface-map",
  className,
}: {
  commands: string[];
  outputs?: Record<number, string[]>;
  typingSpeed?: number;
  delayBetweenCommands?: number;
  title?: string;
  className?: string;
}) {
  const reduced = useReducedMotion();
  const [cmdIdx, setCmdIdx] = useState(0);
  const [charIdx, setCharIdx] = useState(0);
  const [showOutput, setShowOutput] = useState(false);

  useEffect(() => {
    if (reduced || cmdIdx >= commands.length) return;
    const cmd = commands[cmdIdx];
    if (charIdx < cmd.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), typingSpeed);
      return () => clearTimeout(t);
    }
    if (!showOutput) {
      const t = setTimeout(() => setShowOutput(true), 120);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => {
      setCmdIdx((i) => i + 1);
      setCharIdx(0);
      setShowOutput(false);
    }, delayBetweenCommands);
    return () => clearTimeout(t);
  }, [charIdx, cmdIdx, showOutput, commands, typingSpeed, delayBetweenCommands, reduced]);

  const rows: { i: number; typed: string; showOut: boolean; current: boolean }[] = [];
  for (let i = 0; i < commands.length; i++) {
    const done = reduced || i < cmdIdx;
    const isCurrent = !reduced && i === cmdIdx;
    if (!done && !isCurrent) break;
    rows.push({
      i,
      typed: done ? commands[i] : commands[i].slice(0, charIdx),
      showOut: done || (isCurrent && showOutput),
      current: isCurrent,
    });
  }

  return (
    <div className={cn("panel-inset overflow-hidden font-mono text-[0.82rem]", className)}>
      <div className="flex items-center gap-1.5 border-b border-line px-4 py-2.5">
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="size-2.5 rounded-full bg-white/15" />
        <span className="ml-3 label-tight text-ink-faint">{title}</span>
      </div>
      <div className="p-4 leading-relaxed sm:p-5">
        {rows.map((r) => (
          <div key={r.i} className="mb-2 last:mb-0">
            <div className="flex gap-2">
              <span className="select-none text-college">$</span>
              <span className="text-ink">
                {r.typed}
                {r.current && !r.showOut && (
                  <span className="ml-0.5 inline-block h-3.5 w-1.5 animate-pulse bg-ink align-middle" />
                )}
              </span>
            </div>
            {r.showOut &&
              (outputs[r.i] ?? []).map((line, j) => (
                <div key={j} className="pl-4 text-ink-dim">
                  {line}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
