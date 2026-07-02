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
  title: "College — Campus & Builder Motion",
  description: WORLDS.college.longThesis,
};

/** Loose, kinetic constellation — the flagship node sits largest. */
const POSITIONS: Record<string, NodeLayout> = {
  "treehacks-builder-guide": { x: 25, y: 46, size: 96 },
  "university-builder-program": { x: 65, y: 27, size: 60 },
  "campus-ambassador-network": { x: 77, y: 62, size: 58 },
  "innovation-labs-fellowships": { x: 42, y: 75, size: 58 },
};

export default function CollegePage() {
  const world = WORLDS.college;
  const strategies = getStrategiesByWorld("college");

  return (
    <>
      <WorldHero
        world={world}
        count={countByWorld("college")}
        surfaces={surfacesForWorld("college")}
        accent="college"
      />
      <section className="py-10 sm:py-14">
        <StrategyField
          strategies={strategies}
          positions={POSITIONS}
          accent="college"
          temperament="kinetic"
        />
      </section>
      <WorldOutro from="college" />
    </>
  );
}
