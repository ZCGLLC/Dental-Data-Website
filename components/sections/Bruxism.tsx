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
    <section id="between" className="bg-[#eef3f5] py-28 md:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        <Reveal>
          <SectionHeading eyebrow={bruxism.eyebrow} title={[...bruxism.title]} lede={bruxism.lede} />
          <p className="mt-6 max-w-xl text-sm leading-7 text-silver">{bruxism.note}</p>
          <ul className="mt-10 divide-y divide-black/10 border-y border-black/10">
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
              <circle cx="200" cy="200" r="150" fill="none" stroke="#1c2128" strokeOpacity="0.12" />
              <circle cx="200" cy="200" r="112" fill="none" stroke="#1d6478" strokeOpacity="0.45" />
              <path
                d="M70 250c40-36 90-52 130-52s90 16 130 52"
                fill="none"
                stroke="#5c6570"
                strokeOpacity="0.7"
              />
              <path
                d="M118 232h18l6 22h-30zM160 220h18l6 28h-30zM206 214h22l6 34h-34zM258 226h18l6 24h-30z"
                fill="#f7f4ee"
                stroke="#1c2128"
                strokeWidth="1"
              />
              <circle cx="217" cy="214" r={8 + active * 3} fill="#1d6478" opacity="0.9" />
              <text
                x="200"
                y="168"
                textAnchor="middle"
                fill="#141618"
                fontSize="28"
                fontFamily="ui-monospace, monospace"
              >
                {event?.load}
              </text>
              <text
                x="200"
                y="148"
                textAnchor="middle"
                fill="#1d6478"
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
