import type { Metadata } from "next";
import { technologyPage } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { TechnologyStudy } from "@/components/sections/TechnologyStudy";
import { Analytics } from "@/components/sections/Analytics";
import { Sensors } from "@/components/sections/Sensors";

export const metadata: Metadata = {
  title: technologyPage.title,
  description: technologyPage.description,
};

export default function TechnologyPage() {
  return (
    <main id="main" className="pt-28">
      <div className="shell pb-12">
        <SectionHeading
          as="h1"
          eyebrow={technologyPage.eyebrow}
          title={[...technologyPage.headline]}
          lede={technologyPage.lede}
        />
      </div>
      <TechnologyStudy />
      <Analytics />
      <Sensors />
    </main>
  );
}
