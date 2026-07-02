import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import { getStrategiesByWorld } from "@/data/strategies";
import { CollegeHero } from "@/components/college/CollegeHero";
import {
  SignalField,
  type NodePlacement,
} from "@/components/college/SignalField";
import { WorldOutro } from "@/components/world/WorldOutro";

export const metadata: Metadata = {
  title: "College — Campus & Builder Motion",
  description: WORLDS.college.longThesis,
};

/**
 * Kinetic constellation placement. The flagship (`treehacks-builder-guide`)
 * sits largest and most prominent; the others orbit loosely with room below
 * each for its label + hover reveal.
 */
const PLACEMENTS: Record<string, NodePlacement> = {
  "treehacks-builder-guide": { x: 27, y: 44, size: 128 },
  "university-builder-program": { x: 66, y: 28, size: 78 },
  "campus-ambassador-network": { x: 78, y: 63, size: 74 },
  "innovation-labs-fellowships": { x: 43, y: 74, size: 72 },
};

export default function CollegePage() {
  const strategies = getStrategiesByWorld("college");

  return (
    <>
      <CollegeHero />

      <section className="pb-20 pt-4 sm:pb-28">
        <SignalField strategies={strategies} placements={PLACEMENTS} />
      </section>

      <WorldOutro from="college" />
    </>
  );
}
