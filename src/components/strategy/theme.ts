import type { VisualTheme, World } from "@/data/types";

export type Accent = "college" | "standard";

/**
 * Each visualTheme carries an accent (which world's light it uses) and a
 * motif (a backdrop temperament) so no two detail pages feel identical while
 * staying in one system.
 */
export const THEME: Record<
  VisualTheme,
  { accent: Accent; motif: string; note: string }
> = {
  constellation: { accent: "college", motif: "constellation", note: "Dense network of orbiting signals" },
  orbit: { accent: "college", motif: "orbit", note: "Concentric cohorts in motion" },
  network: { accent: "college", motif: "network", note: "Distributed human interface" },
  lab: { accent: "college", motif: "lab", note: "Quiet formation-stage grid" },
  arena: { accent: "standard", motif: "arena", note: "Crowd energy, structured" },
  stage: { accent: "standard", motif: "stage", note: "A single lit focal point" },
  concourse: { accent: "standard", motif: "concourse", note: "Architectural wayfinding" },
  sprint: { accent: "standard", motif: "sprint", note: "A deliberate operating timeline" },
};

export const accentFor = (world: World): Accent =>
  world === "college" ? "college" : "standard";

/** Literal class strings (kept literal so Tailwind JIT can see them). */
export function accentClasses(accent: Accent) {
  if (accent === "college") {
    return {
      text: "text-college",
      textDeep: "text-college-deep",
      bg: "bg-college",
      bgSoft: "bg-college/10",
      border: "border-college/40",
      ring: "ring-college/30",
      dot: "bg-college",
      glow: "shadow-[0_0_50px_-12px_var(--color-college)]",
      gradient: "from-college/25",
      stroke: "var(--color-college)",
    };
  }
  return {
    text: "text-standard",
    textDeep: "text-standard-deep",
    bg: "bg-standard",
    bgSoft: "bg-standard/10",
    border: "border-standard/40",
    ring: "ring-standard/30",
    dot: "bg-standard",
    glow: "shadow-[0_0_50px_-12px_var(--color-standard)]",
    gradient: "from-standard/25",
    stroke: "var(--color-standard)",
  };
}
