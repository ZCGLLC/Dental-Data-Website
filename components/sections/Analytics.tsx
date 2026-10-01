"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { channels, clockLabel, distributionAt, ledger, sampleAt } from "@/data/analytics";
import { demo } from "@/data/demo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CanvasSlot } from "@/components/3d/CanvasSlot";
import type { RealityAxes } from "@/components/3d/RealityScene";
import { DemoNote } from "@/components/ui/DemoNote";
import { Metric } from "@/components/ui/Metric";

const RealityScene = dynamic(
  () => import("@/components/3d/RealityScene").then((mod) => mod.RealityScene),
  { ssr: false },
);

export function Analytics() {
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const time = useRef(0.64);
  const axes = useRef<RealityAxes>({ x: 0.5, y: 0.56, z: 0.42, t: 0.64, field: 0.7 });
  const [view, setView] = useState<RealityAxes>({ x: 0.5, y: 0.56, z: 0.42, t: 0.64, field: 0.7 });
  const [playing, setPlaying] = useState(true);
  const frame = sampleAt(view.t);
  const distribution = distributionAt(view.t);
  const fieldIndex = Math.round(view.field * frame.axial);

  useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    let stamp = last;
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      axes.current.t = (axes.current.t + delta * 0.035) % 1;
      time.current = axes.current.t;
      if (now - stamp > 180) {
        stamp = now;
        setView({ ...axes.current });
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  function setAxis(key: keyof RealityAxes, next: number) {
    axes.current = { ...axes.current, [key]: next };
    if (key === "t") {
      time.current = next;
      setPlaying(false);
    }
    setView({ ...axes.current });
  }

  const axesView: Array<{
    key: keyof RealityAxes;
    index: string;
    name: string;
    value: string;
  }> = [
    { key: "x", index: "01", name: "Width", value: `${((view.x - 0.5) * 8).toFixed(1)} mm` },
    { key: "y", index: "02", name: "Height", value: `${((view.y - 0.5) * 6).toFixed(1)} mm` },
    { key: "z", index: "03", name: "Depth", value: `${(18 + view.z * 22).toFixed(0)} mm` },
    { key: "t", index: "04", name: "Time", value: clockLabel(view.t) },
    { key: "field", index: "05", name: "Field", value: String(fieldIndex) },
  ];

  return (
    <>
    <section id="analytics" className="relative min-h-[100svh] bg-[#f3f1ec]">
      <div
        className="absolute inset-0"
        role="img"
        aria-label="A spatial study of a molar and a sensor chip inside a simulated field. Width, height, depth, time, and field can be moved."
      >
        <CanvasSlot
          eager
          className="absolute inset-0"
          fallback={<div className="h-full bg-[#f3f1ec]" />}
        >
          <RealityScene axes={axes} time={time} mobile={mobile} reduced={reduced} />
        </CanvasSlot>
      </div>
      <div className="pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-between px-5 pt-28 pb-6 md:px-12 md:pt-32 md:pb-10">
        <div className="flex items-start justify-between gap-6">
          <div className="max-w-xl">
            <p className="eyebrow">5D reality</p>
            <h2 className="display mt-4 text-[clamp(2.8rem,6.4vw,5.6rem)] uppercase">
              <span className="block">Inside</span>
              <span className="block">the field.</span>
            </h2>
          </div>
          <button
            type="button"
            onClick={() => setPlaying((value) => !value)}
            className="pointer-events-auto inline-flex h-12 items-center gap-2 rounded-full bg-porcelain px-5 text-[12px] tracking-[0.14em] text-ink uppercase"
            aria-pressed={playing}
          >
            {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
            {playing ? "Pause" : "Play"}
          </button>
        </div>
        <div className="grid items-end gap-4 lg:grid-cols-[minmax(0,440px)_1fr]">
          <div className="pointer-events-auto border border-black/10 bg-white/80 p-4 backdrop-blur-md md:p-5">
            <p className="text-[10px] tracking-[0.18em] text-silver uppercase">Five axes · simulated</p>
            <div className="mt-4 space-y-3">
              {axesView.map((axis) => (
                <label key={axis.key} className="grid grid-cols-[1.6rem_4.2rem_1fr_4.6rem] items-center gap-2">
                  <span className="num text-[10px] text-ice">{axis.index}</span>
                  <span className="text-[11px] tracking-[0.14em] uppercase">{axis.name}</span>
                  <input
                    type="range"
                    min={0}
                    max={1000}
                    value={Math.round(view[axis.key] * 1000)}
                    onChange={(event) => setAxis(axis.key, Number(event.target.value) / 1000)}
                    className="accent-[#1d6478]"
                    aria-valuetext={axis.value}
                  />
                  <span className="num text-right text-[12px]">{axis.value}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="pointer-events-none hidden justify-end md:flex">
            <div className="max-w-xs border border-black/10 bg-white/80 px-5 py-4 text-right backdrop-blur-md">
              <p className="num text-3xl">{frame.axial} N</p>
              <p className="mt-2 text-[11px] tracking-[0.16em] text-silver uppercase">
                Axial · {clockLabel(view.t)}
              </p>
              <p className="mt-4 text-sm leading-6 text-titanium">
                Width, height, and depth place the models. Time moves the day. Field is the simulated condition around the tooth.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section className="border-t border-black/10 bg-[#f3f1ec] py-16 md:py-24">
      <div className="shell">
        <div className="max-w-2xl">
          <p className="eyebrow">The record</p>
          <p className="lede mt-4">
            The same simulated day, read as numbers. Field index {fieldIndex} is the axial load scaled by the fifth axis.
          </p>
        </div>
        <div className="mt-10 grid gap-px bg-black/10 md:grid-cols-3 lg:grid-cols-6">
          <Readout label="Axial" value={`${frame.axial} N`} />
          <Readout label="Buccal-lingual" value={`${frame.buccal} N`} />
          <Readout label="Mesial-distal" value={`${frame.mesial} N`} />
          <Readout label="Strain" value={`${frame.strain} µε`} />
          <Readout label="Die temp" value={`${frame.temp.toFixed(1)}°C`} />
          <Readout label="Membrane" value={`${frame.membrane.toFixed(2)} mV`} />
        </div>

        <div className="mt-px grid gap-px bg-black/10 md:grid-cols-2">
          <Readout label="Field index" value={String(fieldIndex)} />
          <Readout label="Time" value={clockLabel(view.t)} />
        </div>

        <div className="mt-px grid gap-px bg-black/10 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {ledger.map((item) => (
            <Metric key={item.label} label={item.label} value={item.value} note={item.note} />
          ))}
        </div>

        <div className="mt-px grid gap-px bg-black/10 lg:grid-cols-[1.45fr_0.85fr]">
          <div className="bg-white p-5 md:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
              <p className="text-[12px] tracking-[0.16em] text-silver uppercase">
                Normalized channels
              </p>
              <ul className="flex flex-wrap gap-4">
                {channels.map((channel) => (
                  <li key={channel.id} className="flex items-center gap-2 text-[11px] text-titanium">
                    <span className="h-px w-4" style={{ background: channel.color }} />
                    {channel.label}
                  </li>
                ))}
              </ul>
            </div>
            <ChannelChart progress={view.t} />
          </div>
          <div className="bg-white p-5 md:p-6">
            <p className="text-[12px] tracking-[0.16em] text-silver uppercase">Load share</p>
            <ul className="mt-5 space-y-4">
              {distribution.map((item) => (
                <li key={item.label}>
                  <div className="flex items-baseline justify-between text-[11px] tracking-[0.14em] uppercase">
                    <span className="text-titanium">{item.label}</span>
                    <span className="num text-porcelain">{item.value.toFixed(1)}%</span>
                  </div>
                  <div className="mt-2 h-px bg-black/10">
                    <div className="h-px bg-ice" style={{ width: `${item.value}%` }} />
                  </div>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[12px] tracking-[0.16em] text-silver uppercase">Night log</p>
            <ul className="mt-3 divide-y divide-black/10">
              {demo.bruxism.map((event) => (
                <li key={event.time} className="flex items-center justify-between py-2.5">
                  <span className="num text-sm text-titanium">{event.time}</span>
                  <span className="num text-sm">{event.load}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mt-4">
          <DemoNote />
        </div>
      </div>
    </section>
    </>
  );
}

function Readout({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white px-4 py-4">
      <p className="num text-[10px] tracking-[0.16em] text-silver uppercase">{label}</p>
      <p className="num mt-2 text-2xl">{value}</p>
    </div>
  );
}

function ChannelChart({ progress }: { progress: number }) {
  const width = 720;
  const height = 180;
  const pad = 16;
  return (
    <svg viewBox={`0 0 ${width} ${height}`} className="h-auto w-full" role="img" aria-label="Normalized simulated channels across 24 hours">
      {[0.25, 0.5, 0.75].map((mark) => (
        <line
          key={mark}
          x1={pad}
          x2={width - pad}
          y1={pad + (1 - mark) * (height - pad * 2)}
          y2={pad + (1 - mark) * (height - pad * 2)}
          stroke="#141618"
          strokeOpacity="0.08"
        />
      ))}
      {channels.map((channel) => {
        const min = Math.min(...channel.values);
        const max = Math.max(...channel.values);
        const span = max - min || 1;
        const line = channel.values
          .map((value, index) => {
            const x = pad + (index / (channel.values.length - 1)) * (width - pad * 2);
            const y = pad + (1 - (value - min) / span) * (height - pad * 2);
            return `${x},${y}`;
          })
          .join(" ");
        return (
          <polyline
            key={channel.id}
            points={line}
            fill="none"
            stroke={channel.color}
            strokeWidth={channel.id === "axial" ? 1.7 : 1.15}
          />
        );
      })}
      <line
        x1={pad + progress * (width - pad * 2)}
        x2={pad + progress * (width - pad * 2)}
        y1={pad}
        y2={height - pad}
        stroke="#141618"
        strokeWidth="1"
      />
    </svg>
  );
}
