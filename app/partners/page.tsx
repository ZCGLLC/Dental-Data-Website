import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Partnerships } from "@/components/sections/Partnerships";
import { Platform } from "@/components/sections/Platform";

export const metadata: Metadata = pageMeta.partners;

export default function PartnersPage() {
  return (
    <main id="main" className="pt-24">
      <Partnerships heading="h1" />
      <Platform />
    </main>
  );
}
