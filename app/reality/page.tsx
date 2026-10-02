import type { Metadata } from "next";
import { Analytics } from "@/components/sections/Analytics";

export const metadata: Metadata = {
  title: "5D Reality",
  description:
    "A spatial study of a sensor-enabled dental restoration across width, height, depth, time, and a simulated field.",
};

export default function RealityPage() {
  return (
    <main id="main">
      <Analytics />
    </main>
  );
}
