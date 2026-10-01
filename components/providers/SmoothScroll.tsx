"use client";

import { ReactLenis } from "lenis/react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) return children;

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        lerp: 0.085,
        anchors: { offset: 0 },
        smoothWheel: true,
        wheelMultiplier: 0.9,
        touchMultiplier: 1,
      }}
    >
      {children}
    </ReactLenis>
  );
}
