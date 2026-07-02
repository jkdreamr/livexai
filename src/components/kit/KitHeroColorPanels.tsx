"use client";

import dynamic from "next/dynamic";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/cn";
import { useReducedMotion, useMounted } from "@/lib/hooks";

/**
 * KitHeroColorPanels — a compact editorial hero panel whose backdrop is an
 * animated mesh-gradient shader (paper-design), veiled behind a dark scrim so
 * the heading stays crisp. Reduced-motion → static gradient, no WebGL loop.
 */

const MeshGradient = dynamic(
  () => import("@paper-design/shaders-react").then((m) => m.MeshGradient),
  { ssr: false }
);

const PANEL_COLORS = ["#07080b", "#0a2a55", "#0066ff", "#2f80ff", "#7fead1"];

export default function KitHeroColorPanels() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const animate = mounted && !reduced;

  return (
    <div className="w-full max-w-3xl">
      <div className="relative overflow-hidden rounded-2xl border border-line bg-void">
        {/* Shader backdrop */}
        <div className="absolute inset-0" aria-hidden>
          {animate ? (
            <MeshGradient
              className="h-full w-full"
              colors={PANEL_COLORS}
              distortion={0.85}
              swirl={0.6}
              speed={0.35}
              style={{ width: "100%", height: "100%" }}
            />
          ) : (
            <div
              className="h-full w-full"
              style={{
                background:
                  "radial-gradient(120% 140% at 18% 12%, #0066ff 0%, transparent 46%)," +
                  "radial-gradient(90% 120% at 88% 8%, #7fead1 0%, transparent 40%)," +
                  "radial-gradient(120% 120% at 60% 120%, #2f80ff 0%, transparent 55%)," +
                  "#07080b",
              }}
            />
          )}
        </div>

        {/* Readability veils */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(180deg, rgba(7,8,11,0.35) 0%, rgba(7,8,11,0.72) 62%, rgba(7,8,11,0.94) 100%)",
          }}
          aria-hidden
        />
        <div className="absolute inset-0 bg-void/25" aria-hidden />

        {/* Content */}
        <div className="relative flex flex-col gap-5 p-8 sm:p-11">
          <span className="label-tight text-college">Surface Map</span>
          <h2 className="max-w-lg font-display text-3xl leading-[1.08] text-ink sm:text-4xl">
            Map the surfaces where demand actually lives.
          </h2>
          <p className="max-w-md text-sm leading-relaxed text-ink-soft">
            LiveX renders every touchpoint as a navigable field — so strategy
            reads like terrain, not a slide.
          </p>
          <div className="pt-1">
            <button
              type="button"
              className={cn(
                "cursor-target group inline-flex items-center gap-2 rounded-full",
                "border border-college/40 bg-college/10 px-4 py-2",
                "font-mono text-[11px] uppercase tracking-[0.14em] text-college",
                "transition-colors hover:bg-college/20"
              )}
            >
              Explore the map
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
