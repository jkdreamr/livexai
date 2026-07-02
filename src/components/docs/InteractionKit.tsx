import { cn } from "@/lib/cn";
import KitHeroColorPanels from "@/components/kit/KitHeroColorPanels";
import KitDockDemo from "@/components/kit/KitDockDemo";
import KitAnimatedIcons from "@/components/kit/KitAnimatedIcons";
import KitKeyboard from "@/components/kit/KitKeyboard";
import KitMetalButton from "@/components/kit/KitMetalButton";
import KitVideoReveal from "@/components/kit/KitVideoReveal";
import KitExpandable from "@/components/kit/KitExpandable";
import KitFloatingPanel from "@/components/kit/KitFloatingPanel";
import KitMorphSurface from "@/components/kit/KitMorphSurface";

/**
 * The interaction kit — a live gallery of every Batch-2 effect, ready to pull
 * into a concept. (The magnifying dock also runs as the site nav.)
 */
function Cell({
  label,
  span,
  children,
}: {
  label: string;
  span?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-line bg-abyss/40",
        span && "lg:col-span-2"
      )}
    >
      <div className="flex items-center justify-between border-b border-line px-4 py-2.5">
        <span className="label-tight text-ink-dim">{label}</span>
      </div>
      <div className="flex flex-1 items-center justify-center p-6">
        {children}
      </div>
    </div>
  );
}

export function InteractionKit() {
  return (
    <div className="grid gap-4 lg:grid-cols-2">
      <Cell label="Hero color panels · shader" span>
        <KitHeroColorPanels />
      </Cell>
      <Cell label="Magnifying dock">
        <KitDockDemo />
      </Cell>
      <Cell label="Animated icons">
        <KitAnimatedIcons />
      </Cell>
      <Cell label="Keyboard" span>
        <KitKeyboard />
      </Cell>
      <Cell label="Metal buttons">
        <KitMetalButton />
      </Cell>
      <Cell label="Video reveal">
        <KitVideoReveal />
      </Cell>
      <Cell label="Expandable card">
        <KitExpandable />
      </Cell>
      <Cell label="Floating panel">
        <KitFloatingPanel />
      </Cell>
      <Cell label="Morph surface">
        <KitMorphSurface />
      </Cell>
    </div>
  );
}
