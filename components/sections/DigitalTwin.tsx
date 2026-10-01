"use client";

import dynamic from "next/dynamic";
import { twin } from "@/data/content";
import { demo } from "@/data/demo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DemoNote } from "@/components/ui/DemoNote";
import { CanvasSlot } from "@/components/3d/CanvasSlot";
import { ImplantSchematic } from "@/components/3d/ImplantSchematic";

const TwinScene = dynamic(
  () => import("@/components/3d/TwinScene").then((mod) => mod.TwinScene),
  { ssr: false },
);

const values: Record<(typeof twin.fields)[number], string> = {
  Manufacturer: "Unassigned",
  "Implant type": "Research geometry",
  Dimensions: "4.2 × 10 mm",
  "Placement date": "—",
  Restoration: demo.identity.restoration,
  "Clinical maintenance": "No clinical record",
  "Load history": "Demonstration series",
  "Sensor history": demo.identity.readout,
};

export function DigitalTwin() {
  const mobile = useMediaQuery("(max-width: 767px)");

  return (
    <section id="twin" className="border-t border-white/10 bg-[#08090b] py-28 md:py-36">
      <div className="shell">
        <Reveal>
          <SectionHeading eyebrow={twin.eyebrow} title={[...twin.title]} lede={twin.lede} />
        </Reveal>
        <div className="mt-14 grid gap-8 lg:grid-cols-[1.4fr_0.8fr]">
          <div className="relative min-h-[420px] border border-white/10 bg-[radial-gradient(ellipse_at_center,_#171c22_0%,_#08090b_70%)] md:min-h-[560px]">
            <div className="absolute top-4 left-4 z-10 flex gap-6 text-[10px] tracking-[0.18em] text-silver uppercase">
              <span>Physical study</span>
              <span>Holographic record</span>
            </div>
            <CanvasSlot
              className="absolute inset-0"
              fallback={
                <div className="grid h-full grid-cols-2 items-center">
                  <ImplantSchematic />
                  <ImplantSchematic className="opacity-50" />
                </div>
              }
            >
              <TwinScene mobile={mobile} />
            </CanvasSlot>
          </div>
          <Reveal>
            <dl className="divide-y divide-white/10 border-y border-white/10">
              {twin.fields.map((field) => (
                <div key={field} className="grid grid-cols-[1fr_1.1fr] gap-4 py-4">
                  <dt className="text-[12px] tracking-[0.14em] text-silver uppercase">{field}</dt>
                  <dd className="text-sm text-porcelain">{values[field]}</dd>
                </div>
              ))}
            </dl>
            <p className="mt-6 text-sm leading-6 text-titanium">{twin.note}</p>
            <DemoNote className="mt-4" />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
