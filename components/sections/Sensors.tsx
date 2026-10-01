"use client";

import { useState } from "react";
import { sensors, type SensorId } from "@/data/content";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DemoNote } from "@/components/ui/DemoNote";
import { Reveal } from "@/components/ui/Reveal";
import { cn } from "@/lib/utils";

export function Sensors({ heading = "h2" }: { heading?: "h1" | "h2" }) {
  const [active, setActive] = useState<SensorId>("bite");
  const metric = sensors.metrics.find((item) => item.id === active) ?? sensors.metrics[0];

  return (
    <section id="sensing" className="border-t border-black/10 bg-ink py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            as={heading}
            eyebrow={sensors.eyebrow}
            title={[...sensors.title]}
            lede={sensors.lede}
          />
        </Reveal>
        <div className="mt-16 grid gap-10 lg:grid-cols-[280px_1fr]">
          <div role="tablist" aria-label="Measurement studies" className="flex flex-row gap-2 overflow-x-auto lg:flex-col">
            {sensors.metrics.map((item) => {
              const selected = item.id === active;
              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  id={`tab-${item.id}`}
                  aria-selected={selected}
                  aria-controls="sensor-panel"
                  onClick={() => setActive(item.id)}
                  className={cn(
                    "shrink-0 border-b px-1 py-3 text-left text-[12px] tracking-[0.16em] uppercase lg:border-b-0 lg:border-l lg:px-4",
                    selected
                      ? "border-ice text-porcelain"
                      : "border-black/10 text-silver hover:text-porcelain",
                  )}
                >
                  {item.label}
                </button>
              );
            })}
          </div>
          <div
            role="tabpanel"
            id="sensor-panel"
            aria-labelledby={`tab-${metric.id}`}
            className="grid gap-8 border border-black/10 bg-white p-5 md:grid-cols-[1.1fr_0.9fr] md:p-8"
          >
            <SignalStage id={metric.id} />
            <div className="flex flex-col justify-between gap-8">
              <div>
                <p className="text-[12px] tracking-[0.18em] text-ice uppercase">{metric.label}</p>
                <p className="mt-4 text-sm leading-7 text-titanium">{metric.summary}</p>
              </div>
              <dl className="grid grid-cols-2 gap-x-6 gap-y-5">
                {metric.stats.map((stat) => (
                  <div key={stat.label}>
                    <dt className="num text-[10px] tracking-[0.16em] text-silver uppercase">
                      {stat.label}
                    </dt>
                    <dd className="num mt-2 text-2xl text-porcelain">{stat.value}</dd>
                  </div>
                ))}
              </dl>
              <DemoNote />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SignalStage({ id }: { id: SensorId }) {
  return (
    <svg viewBox="0 0 320 420" className="h-auto w-full" aria-hidden="true">
      <rect width="320" height="420" fill="#f7f6f4" />
      <g fill="none" stroke="#1c2128" strokeOpacity="0.85">
        <path
          d="M118 78h84c6 18 4 36-8 48-8 8-10 12-10 18H136c0-6-2-10-10-18-12-12-14-30-8-48z"
          fill="#efe8de"
        />
        <rect x="136" y="146" width="48" height="14" fill="#1a2228" stroke="#1d6478" />
        <path d="M146 164h28l8 46-6 14H144l-6-14z" fill="#c5ccd4" />
        <path d="M154 230h12v92l-4 14h-4l-4-14z" strokeOpacity="0.7" />
        <path d="M146 248h28M144 264h32M146 280h28M148 296h24" stroke="#5c6570" strokeOpacity="0.85" />
      </g>
      {id === "bite" ? <BiteOverlay /> : null}
      {id === "strain" ? <StrainOverlay /> : null}
      {id === "temperature" ? <TempOverlay /> : null}
      {id === "load" ? <LoadOverlay /> : null}
      {id === "bruxism" ? <BruxOverlay /> : null}
      {id === "identity" ? <IdentityOverlay /> : null}
    </svg>
  );
}

function BiteOverlay() {
  return (
    <g>
      <path d="M160 92v120" stroke="#1d6478" strokeDasharray="3 5" className="signal-flow" />
      <ellipse cx="160" cy="96" rx="26" ry="8" fill="#1d6478" opacity="0.35" />
      <ellipse cx="160" cy="124" rx="16" ry="6" fill="#1d6478" opacity="0.18" />
    </g>
  );
}

function StrainOverlay() {
  return (
    <g fill="none" stroke="#1d6478">
      <ellipse cx="160" cy="196" rx="22" ry="12" opacity="0.9" />
      <ellipse cx="160" cy="196" rx="14" ry="7" opacity="0.5" />
      <ellipse cx="160" cy="214" rx="10" ry="5" opacity="0.35" />
    </g>
  );
}

function TempOverlay() {
  return (
    <g>
      <defs>
        <radialGradient id="temp" cx="50%" cy="42%" r="40%">
          <stop offset="0%" stopColor="#1d6478" stopOpacity="0.28" />
          <stop offset="55%" stopColor="#1d6478" stopOpacity="0.2" />
          <stop offset="100%" stopColor="#1d6478" stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="160" cy="180" r="90" fill="url(#temp)" />
    </g>
  );
}

function LoadOverlay() {
    const points = [
    [138, 96],
    [182, 96],
    [148, 118],
    [174, 118],
  ];
  return (
    <g>
      {points.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="#1d6478" />
          <circle cx={x} cy={y} r="12" fill="none" stroke="#1d6478" opacity="0.5" />
        </g>
      ))}
    </g>
  );
}

function BruxOverlay() {
  return (
    <polyline
      fill="none"
      stroke="#1d6478"
      strokeWidth="1.4"
      points="40,340 70,340 84,300 98,340 130,340 146,286 162,340 200,340 214,292 230,340 280,340"
    />
  );
}

function IdentityOverlay() {
  return (
    <g className="num" fill="#141618" fontSize="11">
      <rect x="188" y="150" width="112" height="92" fill="#ffffff" stroke="#1d6478" />
      <text x="198" y="172">
        EI-SIM-30
      </text>
      <text x="198" y="192">
        TOOTH 30
      </text>
      <text x="198" y="212">
        RESEARCH
      </text>
      <text x="198" y="232">
        ZIRCONIA
      </text>
    </g>
  );
}
