import type { Metadata } from "next";
import { getStrategyBySlug } from "@/data/strategies";
import { TreeHacksHero } from "@/components/treehacks/TreeHacksHero";
import { GuideConsole } from "@/components/treehacks/GuideConsole";

const strategy = getStrategyBySlug("treehacks-builder-guide")!;

export const metadata: Metadata = {
  title: "TreeHacks x LiveX AI, the Builder Guide",
  description: strategy.oneLineThesis,
};

export default function TreeHacksPage() {
  const brand = strategy.brand!;

  return (
    <article
      style={
        {
          // The TreeHacks page wears the event's own palette (vibrant green +
          // cosmic purple). Re-point the brand tokens so the whole demo shifts
          // from LiveX blue to TreeHacks green without touching every class.
          "--color-brand": brand.accent,
          "--color-brand-deep": brand.accentDeep,
          "--color-college": brand.accent,
          "--color-college-deep": brand.accentDeep,
        } as React.CSSProperties
      }
    >
      <TreeHacksHero accent={brand.accent} brandName={brand.name} />

      <section className="container-x pb-28 pt-2 sm:pt-6">
        <GuideConsole />
      </section>
    </article>
  );
}
