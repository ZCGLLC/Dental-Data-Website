import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Investors } from "@/components/sections/Investors";
import { Roadmap } from "@/components/sections/Roadmap";

export const metadata: Metadata = pageMeta.investors;

export default function InvestorsPage() {
  return (
    <main id="main" className="pt-24">
      <Investors heading="h1" />
      <Roadmap />
    </main>
  );
}
