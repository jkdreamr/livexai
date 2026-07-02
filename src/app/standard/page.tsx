import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import {
  getStrategiesByWorld,
  countByWorld,
  surfacesForWorld,
} from "@/data/strategies";
import { WorldHero } from "@/components/world/WorldHero";
import { StrategyField, type NodeLayout } from "@/components/world/StrategyField";
import { WorldOutro } from "@/components/world/WorldOutro";

export const metadata: Metadata = {
  title: "Standard — Partner & Field Motion",
  description: WORLDS.standard.longThesis,
};

/** Architectural placement — more aligned, weighted, deliberate. */
const POSITIONS: Record<string, NodeLayout> = {
  "sports-fan-experience": { x: 23, y: 34, size: 78 },
  "creator-interactive-campaigns": { x: 64, y: 26, size: 64 },
  "retail-hospitality-concierge": { x: 30, y: 72, size: 64 },
  "enterprise-experience-sprints": { x: 72, y: 64, size: 72 },
};

export default function StandardPage() {
  const world = WORLDS.standard;
  const strategies = getStrategiesByWorld("standard");

  return (
    <>
      <WorldHero
        world={world}
        count={countByWorld("standard")}
        surfaces={surfacesForWorld("standard")}
        accent="standard"
      />
      <section className="py-10 sm:py-14">
        <StrategyField
          strategies={strategies}
          positions={POSITIONS}
          accent="standard"
          temperament="architectural"
        />
      </section>
      <WorldOutro from="standard" />
    </>
  );
}
