import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import { WorldOutro } from "@/components/world/WorldOutro";
import { StandardHeader } from "@/components/standard/StandardHeader";
import { StandardExploration } from "@/components/standard/StandardExploration";

export const metadata: Metadata = {
  title: "Standard — Partner & Field Motion",
  description: WORLDS.standard.longThesis,
};

export default function StandardPage() {
  return (
    <>
      <StandardHeader />
      <StandardExploration />
      <WorldOutro from="standard" />
    </>
  );
}
