"use client";

import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence, motion } from "framer-motion";
import { Pause, Play, Volume2, X } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion, useMounted } from "@/lib/hooks";

/**
 * KitVideoReveal - Skiper67-style clip-path reveal. A dark thumbnail carries a
 * mix-blend "Play" label that tracks the cursor; clicking expands a fullscreen
 * overlay from center (framer spring, circle clip-path) revealing an animated
 * mesh-gradient "media" with a faux mix-blend control bar and a close button.
 * No video asset - the shader stands in as the looping visual. Reduced-motion
 * swaps the spring for a plain fade and drops the tracking label motion.
 */

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

const MEDIA_COLORS = ["#07080b", "#0a2a55", "#0066ff", "#2f80ff", "#7fead1"];

function ShaderMedia({ animate }: { animate: boolean }) {
  if (animate) {
    return (
      <MeshGradient
        className="h-full w-full"
        colors={MEDIA_COLORS}
        distortion={0.9}
        swirl={0.75}
        speed={0.45}
        style={{ width: "100%", height: "100%" }}
      />
    );
  }
  return (
    <div
      className="h-full w-full"
      style={{
        background:
          "radial-gradient(80% 90% at 25% 20%, #0066ff 0%, transparent 50%)," +
          "radial-gradient(70% 80% at 85% 30%, #7fead1 0%, transparent 45%)," +
          "radial-gradient(90% 90% at 55% 110%, #2f80ff 0%, transparent 55%)," +
          "#07080b",
      }}
    />
  );
}

export default function KitVideoReveal() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(true);
  const [cursor, setCursor] = useState({ x: 0, y: 0, inside: false });
  const thumbRef = useRef<HTMLButtonElement>(null);

  const handleMove = (e: React.PointerEvent) => {
    if (reduced) return;
    const rect = thumbRef.current?.getBoundingClientRect();
    if (!rect) return;
    setCursor({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
      inside: true,
    });
  };

  return (
    <div className="w-full max-w-3xl">
      <div className="panel flex flex-col gap-6 rounded-2xl p-8">
        <div className="flex flex-col gap-1">
          <span className="label-tight text-ink-dim">Reveal</span>
          <h2 className="font-display text-2xl text-ink">Surface flythrough</h2>
          <p className="text-sm text-ink-soft">
            Hover the frame, then open the full field.
          </p>
        </div>

        {/* Thumbnail */}
        <button
          ref={thumbRef}
          type="button"
          onClick={() => {
            setOpen(true);
            setPlaying(true);
          }}
          onPointerMove={handleMove}
          onPointerEnter={() => setCursor((c) => ({ ...c, inside: true }))}
          onPointerLeave={() => setCursor((c) => ({ ...c, inside: false }))}
          className={cn(
            "cursor-target group relative aspect-[16/9] w-full overflow-hidden",
            "rounded-xl border border-line"
          )}
          aria-label="Play surface flythrough"
        >
          <div className="absolute inset-0">
            <ShaderMedia animate={animate} />
          </div>
          <div className="absolute inset-0 bg-void/40" aria-hidden />

          {/* Tracking Play label (mix-blend) */}
          <span
            className={cn(
              "pointer-events-none absolute z-10 flex items-center gap-2",
              "font-mono text-[11px] uppercase tracking-[0.2em]",
              "mix-blend-difference text-white",
              "transition-opacity duration-200",
              cursor.inside ? "opacity-100" : "opacity-70"
            )}
            style={
              cursor.inside && !reduced
                ? {
                    left: cursor.x,
                    top: cursor.y,
                    transform: "translate(-50%, -50%)",
                  }
                : { left: "50%", top: "50%", transform: "translate(-50%, -50%)" }
            }
          >
            <Play className="h-3.5 w-3.5 fill-current" />
            Play
          </span>
        </button>
      </div>

      {/* Fullscreen clip-path reveal */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[100] flex items-center justify-center bg-void"
            initial={
              reduced
                ? { opacity: 0 }
                : { clipPath: "circle(0% at 50% 50%)", opacity: 1 }
            }
            animate={
              reduced
                ? { opacity: 1 }
                : { clipPath: "circle(150% at 50% 50%)", opacity: 1 }
            }
            exit={
              reduced
                ? { opacity: 0 }
                : { clipPath: "circle(0% at 50% 50%)", opacity: 1 }
            }
            transition={
              reduced
                ? { duration: 0.2 }
                : { type: "spring", stiffness: 120, damping: 20 }
            }
          >
            {/* Media */}
            <div className="absolute inset-0">
              <ShaderMedia animate={animate && playing} />
            </div>
            <div className="absolute inset-0 bg-void/20" aria-hidden />

            {/* Close */}
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close"
              className={cn(
                "cursor-target absolute right-5 top-5 z-20 flex h-10 w-10 items-center justify-center",
                "rounded-full border border-white/20 bg-white/[0.06] text-white",
                "backdrop-blur transition-colors hover:bg-white/[0.14]"
              )}
            >
              <X className="h-5 w-5" />
            </button>

            {/* Caption */}
            <div className="pointer-events-none absolute left-6 top-6 z-20">
              <span className="label-tight text-white/70 mix-blend-difference">
                Surface Map / Live
              </span>
            </div>

            {/* Faux control bar (mix-blend) */}
            <div
              className={cn(
                "absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 items-center gap-4",
                "rounded-full border border-white/15 bg-black/30 px-4 py-2.5 backdrop-blur",
                "mix-blend-difference"
              )}
            >
              <button
                type="button"
                onClick={() => setPlaying((p) => !p)}
                aria-label={playing ? "Pause" : "Play"}
                className="cursor-target text-white"
              >
                {playing ? (
                  <Pause className="h-4 w-4 fill-current" />
                ) : (
                  <Play className="h-4 w-4 fill-current" />
                )}
              </button>
              <div className="h-1 w-40 overflow-hidden rounded-full bg-white/20 sm:w-64">
                <motion.div
                  className="h-full w-1/3 rounded-full bg-white"
                  animate={
                    animate && playing
                      ? { x: ["-100%", "300%"] }
                      : { x: "0%" }
                  }
                  transition={
                    animate && playing
                      ? { duration: 6, repeat: Infinity, ease: "linear" }
                      : { duration: 0 }
                  }
                />
              </div>
              <Volume2 className="h-4 w-4 text-white" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
