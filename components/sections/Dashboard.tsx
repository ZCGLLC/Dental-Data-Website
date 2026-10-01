"use client";

import { useState } from "react";
import { brand } from "@/config/brand";
import { dashboardCopy } from "@/data/content";
import { dashboardMetrics } from "@/data/analytics";
import { demo, demoRanges } from "@/data/demo";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { DemoNote } from "@/components/ui/DemoNote";
import { Metric } from "@/components/ui/Metric";
import { TrendChart } from "@/components/ui/TrendChart";
import { cn } from "@/lib/utils";

const tabs = ["Overview", "Load", "Bruxism", "History", "Notes"] as const;

export function Dashboard() {
  const [tab, setTab] = useState<(typeof tabs)[number]>("Overview");
  const [range, setRange] = useState<(typeof demoRanges)[number]["id"]>("30");
  const series = demoRanges.find((item) => item.id === range)?.series ?? demo.load30;

  return (
    <section id="dashboard" className="bg-ink py-28 md:py-40">
      <div className="shell">
        <Reveal>
          <SectionHeading
            eyebrow={dashboardCopy.eyebrow}
            title={[...dashboardCopy.title]}
            lede={dashboardCopy.lede}
          />
        </Reveal>
        <Reveal className="mt-14">
          <div className="overflow-hidden border border-black/10 bg-white">
            <div className="flex flex-col gap-3 border-b border-black/10 px-5 py-4 md:flex-row md:items-center md:justify-between">
              <div>
                <p className="text-[11px] tracking-[0.2em] text-ice uppercase">Smart implant</p>
                <p className="mt-1 text-sm text-porcelain">Tooth #{demo.tooth}</p>
              </div>
              <p className="max-w-sm text-[11px] leading-5 tracking-[0.08em] text-silver uppercase">
                {brand.disclaimers.dashboard}
              </p>
            </div>
            <div className="flex gap-2 overflow-x-auto border-b border-black/10 px-4">
              {tabs.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setTab(item)}
                  className={cn(
                    "h-11 shrink-0 px-3 text-[12px] tracking-[0.14em] uppercase",
                    tab === item ? "text-porcelain" : "text-silver",
                  )}
                  aria-pressed={tab === item}
                >
                  {item}
                </button>
              ))}
            </div>
            <div className="grid gap-8 p-5 md:p-8 lg:grid-cols-[0.9fr_1.3fr]">
              <div className="grid grid-cols-2 gap-6">
                <Stat label="Sensor status" value={demo.sensorStatus} live />
                <Stat label="Peak load" value={demo.peakLoad} />
                <Stat label="Baseline" value={demo.baseline} />
                <Stat label="Temperature" value={demo.temperature} />
                <Stat label="Load change" value={demo.change} />
                <Stat label="Tooth" value={`#${demo.tooth}`} />
              </div>
              <div>
                {tab === "Bruxism" ? <BruxList /> : null}
                {tab === "History" ? <History /> : null}
                {tab === "Notes" ? <Notes /> : null}
                {tab === "Overview" || tab === "Load" ? (
                  <div>
                    <div className="mb-4 flex items-center justify-between gap-3">
                      <p className="text-[12px] tracking-[0.16em] text-silver uppercase">
                        {range}-day load trend
                      </p>
                      <div className="flex gap-2">
                        {demoRanges.map((item) => (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setRange(item.id)}
                            className={cn(
                              "h-8 px-2 text-[11px] tracking-[0.14em] uppercase",
                              range === item.id ? "text-porcelain" : "text-silver",
                            )}
                            aria-pressed={range === item.id}
                          >
                            {item.label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <TrendChart
                      series={series}
                      label={`Simulated ${range}-day load trend in newtons`}
                    />
                  </div>
                ) : null}
              </div>
            </div>
            <div className="grid grid-cols-2 gap-px border-t border-black/10 bg-black/10 md:grid-cols-4">
              {dashboardMetrics.map((item) => (
                <Metric key={item.label} label={item.label} value={item.value} note={item.note} />
              ))}
            </div>
            <div className="border-t border-black/10 px-5 py-3">
              <DemoNote />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Stat({ label, value, live = false }: { label: string; value: string; live?: boolean }) {
  return (
    <div>
      <p className="num text-[10px] tracking-[0.16em] text-silver uppercase">{label}</p>
      <p className="num mt-2 flex items-center gap-2 text-2xl">
        {live ? <span className="h-1.5 w-1.5 rounded-full bg-ice" /> : null}
        {value}
      </p>
    </div>
  );
}

function BruxList() {
  return (
    <ul className="divide-y divide-black/10">
      {demo.bruxism.map((event) => (
        <li key={event.time} className="flex items-center justify-between py-3">
          <span className="num text-sm text-titanium">{event.time}</span>
          <span className="num text-sm">{event.load}</span>
        </li>
      ))}
    </ul>
  );
}

function History() {
  const rows = [
    ["Record", demo.identity.record],
    ["Site", demo.identity.site],
    ["Platform", demo.identity.platform],
    ["Restoration", demo.identity.restoration],
    ["Placement", "No clinical record"],
    ["Maintenance", "No clinical record"],
    ["Load history", "Demonstration series"],
    ["Sensor history", demo.identity.readout],
  ];
  return (
    <dl className="divide-y divide-black/10">
      {rows.map(([label, value]) => (
        <div key={label} className="grid grid-cols-2 gap-4 py-3 text-sm">
          <dt className="text-silver">{label}</dt>
          <dd>{value}</dd>
        </div>
      ))}
    </dl>
  );
}

function Notes() {
  return (
    <div className="space-y-4 text-sm leading-7 text-titanium">
      <p>Demonstration notes. No patient record is connected to this interface.</p>
      <p>
        Simulated entry: a baseline load profile is shown so the workspace can be reviewed as a
        product concept.
      </p>
    </div>
  );
}
