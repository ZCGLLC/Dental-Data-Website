"use client";

import { useState } from "react";
import { bruxism } from "@/data/content";
import { demo } from "@/data/demo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DemoNote } from "@/components/ui/DemoNote";
import { cn } from "@/lib/utils";

export function Bruxism() {
  const [active, setActive] = useState(0);
  const event = demo.bruxism[active];

  return (
    <section id="between" className="bg-[#07090d] py-28 md:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading eyebrow={bruxism.eyebrow} title={[...bruxism.title]} lede={bruxism.lede} />
          <p className="mt-6 max-w-xl text-sm leading-7 text-silver">{bruxism.note}</p>
          <ul className="mt-10 divide-y divide-white/10 border-y border-white/10">
            {demo.bruxism.map((item, index) => (
              <li key={item.time}>
                <button
                  type="button"
                  onClick={() => setActive(index)}
                  className={cn(
                    "flex w-full items-center justify-between py-4 text-left",
                    index === active ? "text-porcelain" : "text-silver",
                  )}
                  aria-pressed={index === active}
                >
                  <span className="num text-sm">{item.time}</span>
                  <span className="num text-sm">{item.load}</span>
                </button>
              </li>
            ))}
          </ul>
          <DemoNote className="mt-5" />
        </Reveal>
        <Reveal delay={0.08}>
          <div className="relative mx-auto aspect-square w-full max-w-lg">
            <svg viewBox="0 0 400 400" className="h-full w-full" aria-hidden="true">
              <circle cx="200" cy="200" r="150" fill="none" stroke="#d7e4ee" strokeOpacity="0.18" />
              <circle cx="200" cy="200" r="112" fill="none" stroke="#8ec5d4" strokeOpacity="0.25" />
              <path
                d="M70 250c40-36 90-52 130-52s90 16 130 52"
                fill="none"
                stroke="#c5c8ce"
                strokeOpacity="0.45"
              />
              <path
                d="M118 232h18l6 22h-30zM160 220h18l6 28h-30zM206 214h22l6 34h-34zM258 226h18l6 24h-30z"
                fill="#f3f0ea"
                opacity="0.8"
              />
              <circle cx="217" cy="214" r={8 + active * 3} fill="#8ec5d4" opacity="0.85" />
              <text
                x="200"
                y="168"
                textAnchor="middle"
                fill="#f3f0ea"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
              >
                {event?.load}
              </text>
              <text
                x="200"
                y="148"
                textAnchor="middle"
                fill="#8ec5d4"
                fontSize="11"
                letterSpacing="2"
              >
                {event?.time}
              </text>
            </svg>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
