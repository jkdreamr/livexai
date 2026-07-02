"use client";

import dynamic from "next/dynamic";

const TargetCursor = dynamic(
  () => import("@/components/reactbits/TargetCursor"),
  { ssr: false }
);

/** Site-wide targeting cursor. Locks its brackets onto `.cursor-target`
 *  elements; hides itself on touch devices. */
export function Cursor() {
  return (
    <TargetCursor
      targetSelector=".cursor-target"
      spinDuration={4}
      hideDefaultCursor
      cursorColor="#eceef3"
    />
  );
}
