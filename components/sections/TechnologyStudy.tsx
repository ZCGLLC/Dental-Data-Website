"use client";

import dynamic from "next/dynamic";
import { useRef, useState } from "react";
import { parts, technologyPage, type PartId } from "@/data/content";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CanvasSlot } from "@/components/3d/CanvasSlot";
import { ImplantSchematic } from "@/components/3d/ImplantSchematic";
import { cn } from "@/lib/utils";

const StudyScene = dynamic(
  () => import("@/components/3d/StudyScene").then((mod) => mod.StudyScene),
  { ssr: false },
);

export function TechnologyStudy() {
  const explode = useRef(0.35);
  const hover = useRef<PartId | null>(null);
  const [amount, setAmount] = useState(0.35);
  const [active, setActive] = useState<PartId | null>(null);
  const mobile = useMediaQuery("(max-width: 767px)");
  const reduced = usePrefersReducedMotion();
  const part = parts.find((item) => item.id === active);

  return (
    <section className="bg-ink pb-24">
      <div className="shell grid gap-8 lg:grid-cols-[1fr_320px]">
        <div className="relative min-h-[520px] border border-black/10 bg-white md:min-h-[680px]">
          <CanvasSlot
            className="absolute inset-0"
            fallback={<ImplantSchematic className="p-8" exploded />}
          >
            <StudyScene
              explode={explode}
              hover={hover}
              mobile={mobile}
              reduced={reduced}
              onHover={(next) => {
                hover.current = next;
                setActive(next);
              }}
            />
          </CanvasSlot>
        </div>
        <div>
          <p className="eyebrow">Assembly study</p>
          <p className="mt-4 text-sm leading-7 text-titanium">
            Drag to orbit. Separate the stack to see where sensing is intended to live.
          </p>
          <label className="mt-8 block">
            <span className="num text-[10px] tracking-[0.16em] text-silver uppercase">
              Separation {Math.round(amount * 100)}%
            </span>
            <input
              type="range"
              min={0}
              max={1}
              step={0.01}
              value={amount}
              onChange={(event) => {
                const value = Number(event.target.value);
                explode.current = value;
                setAmount(value);
              }}
              className="mt-3 w-full accent-[#1d6478]"
            />
          </label>
          <ul className="mt-8 space-y-2">
            {parts.map((item) => (
              <li key={item.id}>
                <button
                  type="button"
                  onClick={() => {
                    const next = active === item.id ? null : item.id;
                    hover.current = next;
                    setActive(next);
                  }}
                  className={cn(
                    "w-full border-b border-black/10 py-3 text-left",
                    active === item.id ? "text-porcelain" : "text-silver",
                  )}
                >
                  <span className="num mr-3 text-[10px] tracking-[0.16em] text-ice">
                    {item.index}
                  </span>
                  {item.name}
                </button>
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm leading-6 text-titanium">
            {part?.detail ?? technologyPage.lede}
          </p>
        </div>
      </div>
      <div className="shell mt-16 grid gap-8 md:grid-cols-2">
        {technologyPage.points.map((point) => (
          <article key={point.title} className="border-t border-black/10 pt-5">
            <h2 className="text-2xl">{point.title}</h2>
            <p className="mt-3 text-sm leading-7 text-titanium">{point.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
