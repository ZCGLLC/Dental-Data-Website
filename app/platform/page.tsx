import type { Metadata } from "next";
import { pageMeta } from "@/data/content";
import { Platform } from "@/components/sections/Platform";
import { Roadmap } from "@/components/sections/Roadmap";

export const metadata: Metadata = pageMeta.platform;

export default function PlatformPage() {
  return (
    <main id="main" className="pt-24">
      <Platform heading="h1" />
      <Roadmap />
    </main>
  );
}
