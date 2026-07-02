import type { Metadata } from "next";
import { WORLDS } from "@/data/types";
import { getStrategiesByWorld } from "@/data/strategies";
import { StandardHero } from "@/components/standard/StandardHero";
import { FieldMap } from "@/components/standard/FieldMap";
import GradualBlur from "@/components/reactbits/GradualBlur";
import { WorldOutro } from "@/components/world/WorldOutro";

export const metadata: Metadata = {
  title: "Standard — Partner & Field Motion",
  description: WORLDS.standard.longThesis,
};

export default function StandardPage() {
  const strategies = getStrategiesByWorld("standard");

  return (
    <>
      <StandardHero />

      {/* The field. A relative parent so the premium blur fades this section
          into the void at its base. */}
      <section className="relative overflow-hidden pb-28 sm:pb-40">
        <div className="container-x">
          <FieldMap strategies={strategies} />
        </div>

        <GradualBlur
          target="parent"
          position="bottom"
          height="9rem"
          strength={2.4}
          divCount={6}
          curve="bezier"
        />
      </section>

      <WorldOutro from="standard" />
    </>
  );
}
