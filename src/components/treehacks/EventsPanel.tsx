"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/cn";
import { ease } from "@/lib/motion";
import { HoloMap, type RoomId } from "./HoloMap";

type Status = "now" | "soon" | "later";
type Ev = { id: string; name: string; when: string; room: RoomId; status: Status; walk: string; dir: string };

const EVENTS: Ev[] = [
  { id: "opening", name: "Opening ceremony", when: "Now", room: "stage", status: "now", walk: "1 min walk", dir: "Straight ahead, past check-in. Main Stage is on your left." },
  { id: "team", name: "Team formation", when: "In 20 min", room: "sponsor", status: "soon", walk: "2 min walk", dir: "Left side, near the entrance. Sponsor Bay is the open room." },
  { id: "agents", name: "Workshop: building agents", when: "6:30 PM", room: "wsA", status: "later", walk: "2 min walk", dir: "Right along the top corridor. Workshop A is at the end." },
  { id: "dinner", name: "Dinner", when: "7:00 PM", room: "dining", status: "later", walk: "3 min walk", dir: "Far right corner. Follow the crowd." },
  { id: "demo", name: "Demo practice", when: "9:15 PM", room: "wsB", status: "later", walk: "2 min walk", dir: "Middle of the floor, just past the sponsor bay." },
];

const STATUS: Record<Status, { label: string; cls: string }> = {
  now: { label: "Happening now", cls: "text-brand" },
  soon: { label: "Starts soon", cls: "text-cyan-200" },
  later: { label: "Later", cls: "text-ink-faint" },
};

export function EventsPanel() {
  const [sel, setSel] = useState<string>("opening");
  const active = EVENTS.find((e) => e.id === sel)!;

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_1.1fr]">
      {/* schedule */}
      <div>
        <p className="label text-brand">Live schedule</p>
        <ul className="mt-4 flex flex-col">
          {EVENTS.map((e) => {
            const on = e.id === sel;
            return (
              <li key={e.id}>
                <button
                  type="button"
                  onClick={() => setSel(e.id)}
                  className={cn(
                    "cursor-target flex w-full items-center justify-between gap-4 border-b border-line py-3.5 text-left transition-colors",
                    on ? "text-ink" : "text-ink-soft hover:text-ink"
                  )}
                >
                  <span className="flex items-center gap-3">
                    {e.status === "now" ? (
                      <motion.span className="size-2 rounded-full bg-brand" animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.4, repeat: Infinity }} />
                    ) : (
                      <span className={cn("size-2 rounded-full", e.status === "soon" ? "bg-cyan-300/70" : "bg-line-strong")} />
                    )}
                    <span>
                      <span className="block text-sm">{e.name}</span>
                      <span className={cn("label-tight", STATUS[e.status].cls)}>{STATUS[e.status].label}</span>
                    </span>
                  </span>
                  <span className="shrink-0 label-tight text-ink-dim">{e.when}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </div>

      {/* map + directions */}
      <div className="panel flex flex-col p-5 sm:p-6">
        <div className="min-h-[240px] flex-1">
          <HoloMap target={active.room} />
        </div>
        <motion.div key={active.id} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: ease.out }} className="mt-4 border-t border-line pt-4">
          <div className="flex items-center justify-between">
            <p className="font-display text-lg text-ink">{active.name}</p>
            <span className="label-tight text-brand">{active.walk}</span>
          </div>
          <p className="mt-1.5 text-sm text-ink-dim">{active.dir}</p>
        </motion.div>
      </div>
    </div>
  );
}
