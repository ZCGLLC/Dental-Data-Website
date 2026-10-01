import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Science } from "@/components/sections/Science";
import { Biology } from "@/components/sections/Biology";

export const metadata: Metadata = pageMeta.science;

export default function SciencePage() {
  return (
    <main id="main" className="pt-24">
      <Science heading="h1" />
      <Biology />
    </main>
  );
}
