import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Researchers } from "@/components/sections/Researchers";
import { Science } from "@/components/sections/Science";

export const metadata: Metadata = pageMeta.research;

export default function ResearchPage() {
  return (
    <main id="main" className="pt-24">
      <Researchers heading="h1" />
      <Science />
    </main>
  );
}
