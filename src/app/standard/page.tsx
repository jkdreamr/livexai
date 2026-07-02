import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import { StandardHeader } from "@/components/standard/StandardHeader";
import { StandardExploration } from "@/components/standard/StandardExploration";

export const metadata: Metadata = {
  title: "Standard · Potential Partners",
  description: WORLDS.standard.longThesis,
};

export default function StandardPage() {
  return (
    <>
      <StandardHeader />
      <StandardExploration />
    </>
  );
}
