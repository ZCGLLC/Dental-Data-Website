import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Company } from "@/components/sections/Company";
import { Closing } from "@/components/sections/Closing";

export const metadata: Metadata = pageMeta.company;

export default function CompanyPage() {
  return (
    <main id="main" className="pt-24">
      <Company heading="h1" />
      <Closing />
    </main>
  );
}
