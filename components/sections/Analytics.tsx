"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef } from "react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { CanvasSlot } from "@/components/3d/CanvasSlot";
import type { RealityAxes } from "@/components/3d/RealityScene";

const RealityScene = dynamic(
  () => import("@/components/3d/RealityScene").then((mod) => mod.RealityScene),
  { ssr: false },
);

export function Analytics() {
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const time = useRef(0.64);
  const axes = useRef<RealityAxes>({ x: 0.5, y: 0.56, z: 0.42, t: 0.64, field: 0.62 });

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      axes.current.t = (axes.current.t + delta * 0.035) % 1;
      time.current = axes.current.t;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section id="analytics" className="relative h-[100svh] bg-[#f7fbfe]">
      <div
        className="absolute inset-0"
        role="img"
        aria-label="5D reality. A molar and a sensor chip in a white field with blue shade."
      >
        <CanvasSlot eager className="absolute inset-0" fallback={<div className="h-full bg-[#f7fbfe]" />}>
          <RealityScene axes={axes} time={time} mobile={mobile} reduced={reduced} />
        </CanvasSlot>
      </div>
      <div className="pointer-events-none relative z-10 px-5 pt-28 md:px-12 md:pt-32">
        <h2 className="display text-[clamp(3.6rem,8vw,7rem)] uppercase text-porcelain">
          <span className="block">5D</span>
          <span className="block">reality.</span>
        </h2>
      </div>
    </section>
  );
}
