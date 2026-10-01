"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { channels, clockLabel, distributionAt, ledger, sampleAt } from "@/data/analytics";
import { demo } from "@/data/demo";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CanvasSlot } from "@/components/3d/CanvasSlot";
import { DemoNote } from "@/components/ui/DemoNote";
import { Metric } from "@/components/ui/Metric";

const ModelStage = dynamic(
  () => import("@/components/3d/ModelStage").then((mod) => mod.ModelStage),
  { ssr: false },
);

export function Analytics() {
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const time = useRef(0.64);
  const [progress, setProgress] = useState(0.64);
  const [playing, setPlaying] = useState(true);
  const frame = sampleAt(progress);
  const distribution = distributionAt(progress);

  useEffect(() => {
    if (!playing || reduced) return;
    let raf = 0;
    let last = performance.now();
    let stamp = last;
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      time.current = (time.current + delta * 0.035) % 1;
      if (now - stamp > 180) {
        stamp = now;
        setProgress(time.current);
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [playing, reduced]);

  function scrub(next: number) {
    time.current = next;
    setProgress(next);
    setPlaying(false);
  }

  return (
    <section id="analytics" className="border-t border-black/10 bg-[#f3f1ec] py-16 md:py-24">
      <div className="shell">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">4D study</p>
            <h2 className="display mt-4 text-[clamp(2.6rem,6vw,5.2rem)] uppercase">
              <span className="block">A tooth.</span>
              <span className="block">A chip.</span>
              <span className="block">Read through time.</span>
            </h2>
            <p className="lede mt-6 max-w-xl">
              4D here means a three-dimensional model stepped across a simulated day. The tooth
              carries load through time. The chip carries the signal that would be read from it.
            </p>
          </div>
          <div className="flex items-end gap-6">
            <div>
              <p className="num text-[10px] tracking-[0.18em] text-silver uppercase">Cursor</p>
              <p className="num mt-2 text-3xl text-porcelain">{clockLabel(progress)}</p>
            </div>
            <button
              type="button"
              onClick={() => setPlaying((value) => !value)}
              className="inline-flex h-12 items-center gap-2 rounded-full bg-porcelain px-5 text-[12px] tracking-[0.14em] text-ink uppercase"
              aria-pressed={playing}
            >
              {playing ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
              {playing ? "Pause" : "Play"}
            </button>
          </div>
        </div>

        <div className="mt-10 grid gap-px bg-black/10 lg:grid-cols-2">
          <ModelPanel
            title="4D tooth"
            detail="Molar geometry, occlusal contacts, and a time ring."
            mode="tooth"
            time={time}
            mobile={mobile}
          />
          <ModelPanel
            title="4D chip"
            detail="Concept die, membrane, bond pads, and a swept load trace."
            mode="chip"
            time={time}
            mobile={mobile}
          />
        </div>

        <div className="grid gap-px bg-black/10 md:grid-cols-3 lg:grid-cols-6">
          <Readout label="Axial" value={`${frame.axial} N`} />
          <Readout label="Buccal-lingual" value={`${frame.buccal} N`} />
          <Readout label="Mesial-distal" value={`${frame.mesial} N`} />
          <Readout label="Strain" value={`${frame.strain} µε`} />
          <Readout label="Die temp" value={`${frame.temp.toFixed(1)}°C`} />
          <Readout label="Membrane" value={`${frame.membrane.toFixed(2)} mV`} />
        </div>

        <label className="mt-px block bg-white px-5 py-4">
          <span className="num text-[10px] tracking-[0.16em] text-silver uppercase">
            Time axis · 24 h simulated
          </span>
          <input
            type="range"
            min={0}
            max={1000}
            value={Math.round(progress * 1000)}
            onChange={(event) => scrub(Number(event.target.value) / 1000)}
            className="mt-3 w-full accent-[#1d6478]"
            aria-valuetext={clockLabel(progress)}
          />
        </label>

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
            <ChannelChart progress={progress} />
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
  );
}

function ModelPanel({
  title,
  detail,
  mode,
  time,
  mobile,
}: {
  title: string;
  detail: string;
  mode: "tooth" | "chip";
  time: React.RefObject<number>;
  mobile: boolean;
}) {
  return (
    <article className="bg-[#f7f6f4]">
      <div className="flex items-start justify-between gap-4 px-5 pt-5">
        <div>
          <h3 className="text-[12px] tracking-[0.18em] uppercase">{title}</h3>
          <p className="mt-2 max-w-xs text-sm leading-6 text-titanium">{detail}</p>
        </div>
        <p className="num text-[10px] tracking-[0.16em] text-ice uppercase">Model</p>
      </div>
      <div
        className="relative mt-4 h-[340px] md:h-[460px]"
        role="img"
        aria-label={title}
        style={{
          backgroundImage:
            "linear-gradient(to right, rgba(20,22,24,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,22,24,0.045) 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      >
        <CanvasSlot
          className="absolute inset-0"
          fallback={
            <div className="flex h-full items-center justify-center text-[11px] tracking-[0.18em] text-silver uppercase">
              {title}
            </div>
          }
        >
          <ModelStage mode={mode} time={time} mobile={mobile} />
        </CanvasSlot>
      </div>
    </article>
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
