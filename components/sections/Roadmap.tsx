"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { roadmap } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Roadmap() {
  return (
    <section id="roadmap" className="bg-ink">
      <div className="roadmap-stack py-28 md:hidden">
        <Stack />
      </div>
      <div className="roadmap-pin hidden md:block">
        <Pinned />
      </div>
    </section>
  );
}

function Stack() {
  return (
    <div className="shell">
      <SectionHeading eyebrow={roadmap.eyebrow} title={[...roadmap.title]} lede={roadmap.lede} />
      <ol className="mt-14 space-y-10">
        {roadmap.phases.map((phase) => (
          <li key={phase.index} className="border-t border-black/10 pt-6">
            <Phase phase={phase} />
          </li>
        ))}
      </ol>
    </div>
  );
}

function Pinned() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const x = useTransform(scrollYProgress, [0, 1], ["0%", "-68%"]);

  return (
    <div ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 flex h-[100svh] flex-col justify-center overflow-hidden">
        <div className="shell">
          <SectionHeading eyebrow={roadmap.eyebrow} title={[...roadmap.title]} lede={roadmap.lede} />
        </div>
        <motion.ol style={{ x }} className="mt-14 flex w-[220%] gap-6 pl-[max(2.5rem,calc((100%-1440px)/2))]">
          {roadmap.phases.map((phase) => (
            <li
              key={phase.index}
              className="w-[28rem] shrink-0 border-t border-black/10 pt-8"
            >
              <Phase phase={phase} />
            </li>
          ))}
        </motion.ol>
      </div>
    </div>
  );
}

function Phase({ phase }: { phase: (typeof roadmap.phases)[number] }) {
  return (
    <article>
      <p className="num text-[11px] tracking-[0.2em] text-ice">Phase {phase.index}</p>
      <h3 className="display mt-4 text-4xl uppercase">{phase.title}</h3>
      <ul className="mt-6 space-y-2 text-sm text-titanium">
        {phase.items.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </article>
  );
}
