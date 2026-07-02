import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import { getStrategiesByWorld } from "@/data/strategies";
import { CollegeHeader } from "@/components/college/CollegeHeader";
import { FlagshipFeature } from "@/components/college/FlagshipFeature";

export const metadata: Metadata = {
  title: "College · Campus & Students",
  description: WORLDS.college.longThesis,
};

export default function CollegePage() {
  const strategies = getStrategiesByWorld("college");
  const flagship = strategies[0];

  return (
    <>
      <CollegeHeader />
      {flagship && <FlagshipFeature strategy={flagship} />}
    </>
  );
}
