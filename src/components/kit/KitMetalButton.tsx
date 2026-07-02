"use client";

import { ArrowRight, Compass } from "lucide-react";
import { MetalFx } from "metal-fx";
import { cn } from "@/lib/cn";
import { useReducedMotion, useMounted } from "@/lib/hooks";

/**
 * KitMetalButton - liquid-metal buttons wrapped with metal-fx's animated
 * chromatic ring. Dark-themed. Reduced-motion pauses the shader (one static
 * frame stays painted). If metal-fx fails to mount cleanly it still degrades
 * to a solid dark pill because our own styling lives on the child element.
 */

export default function KitMetalButton() {
  const mounted = useMounted();
  const reduced = useReducedMotion();
  const paused = !mounted || reduced;

  return (
    <div className="w-full max-w-3xl">
      <div className="panel flex flex-col gap-6 rounded-2xl p-8">
        <div className="flex flex-col gap-1">
          <span className="label-tight text-ink-dim">Interaction</span>
          <h2 className="font-display text-2xl text-ink">Liquid-metal actions</h2>
          <p className="text-sm text-ink-soft">
            Chromatic ring rendered on a shared WebGL surface.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-5">
          {/* Primary pill */}
          <MetalFx
            variant="button"
            preset="chromatic"
            theme="dark"
            paused={paused}
          >
            <button
              type="button"
              className={cn(
                "cursor-target inline-flex items-center gap-2 rounded-full",
                "bg-charcoal px-6 py-3 text-sm font-medium text-ink",
                "transition-colors hover:bg-white/[0.06]"
              )}
            >
              Deploy surface
              <ArrowRight className="h-4 w-4 text-college" />
            </button>
          </MetalFx>

          {/* Secondary pill */}
          <MetalFx
            variant="button"
            preset="silver"
            theme="dark"
            paused={paused}
          >
            <button
              type="button"
              className={cn(
                "cursor-target inline-flex items-center rounded-full",
                "bg-white/[0.03] px-6 py-3",
                "font-mono text-[11px] uppercase tracking-[0.14em] text-ink-soft",
                "transition-colors hover:text-ink"
              )}
            >
              Preview
            </button>
          </MetalFx>

          {/* Icon button */}
          <MetalFx
            variant="circle"
            preset="chromatic"
            theme="dark"
            paused={paused}
          >
            <button
              type="button"
              aria-label="Recenter map"
              className={cn(
                "cursor-target inline-flex h-12 w-12 items-center justify-center rounded-full",
                "bg-charcoal text-ink transition-colors hover:text-college"
              )}
            >
              <Compass className="h-5 w-5" />
            </button>
          </MetalFx>
        </div>
      </div>
    </div>
  );
}
