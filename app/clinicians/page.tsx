import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Clinicians } from "@/components/sections/Clinicians";
import { Dashboard } from "@/components/sections/Dashboard";
import { Bruxism } from "@/components/sections/Bruxism";

export const metadata: Metadata = pageMeta.clinicians;

export default function CliniciansPage() {
  return (
    <main id="main" className="pt-24">
      <Clinicians heading="h1" />
      <Dashboard />
      <Bruxism />
    </main>
  );
}
