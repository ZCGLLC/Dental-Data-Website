import { Story } from "@/components/sections/Story";
import { Analytics } from "@/components/sections/Analytics";
import { Problem } from "@/components/sections/Problem";
import { Sensors } from "@/components/sections/Sensors";
import { DigitalTwin } from "@/components/sections/DigitalTwin";
import { Dashboard } from "@/components/sections/Dashboard";
import { Bruxism } from "@/components/sections/Bruxism";
import { Biology } from "@/components/sections/Biology";
import { Roadmap } from "@/components/sections/Roadmap";
import { Platform } from "@/components/sections/Platform";
import { Partnerships } from "@/components/sections/Partnerships";
import { Clinicians } from "@/components/sections/Clinicians";
import { Researchers } from "@/components/sections/Researchers";
import { Investors } from "@/components/sections/Investors";
import { Science } from "@/components/sections/Science";
import { Company } from "@/components/sections/Company";
import { Contact } from "@/components/sections/Contact";
import { Closing } from "@/components/sections/Closing";

export default function HomePage() {
  return (
    <main id="main">
      <Story />
      <Analytics />
      <Problem />
      <Sensors />
      <DigitalTwin />
      <Dashboard />
      <Bruxism />
      <Biology />
      <Roadmap />
      <Platform />
      <Partnerships />
      <Clinicians />
      <Researchers />
      <Investors />
      <Science />
      <Company />
      <Contact />
      <Closing />
    </main>
  );
}
