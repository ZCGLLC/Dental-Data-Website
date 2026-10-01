"use client";

import { useEffect, useRef } from "react";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export function CursorField() {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = usePrefersReducedMotion();
  const fine = useMediaQuery("(pointer: fine)");

  useEffect(() => {
    if (reduced || !fine || !ref.current) return;
    const node = ref.current;
    let x = window.innerWidth / 2;
    let y = window.innerHeight / 3;
    let cx = x;
    let cy = y;
    let frame = 0;

    const onMove = (event: PointerEvent) => {
      x = event.clientX;
      y = event.clientY;
      node.style.opacity = "1";
    };

    const tick = () => {
      cx += (x - cx) * 0.08;
      cy += (y - cy) * 0.08;
      node.style.transform = `translate3d(${cx - 180}px, ${cy - 180}px, 0)`;
      frame = requestAnimationFrame(tick);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    frame = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("pointermove", onMove);
      cancelAnimationFrame(frame);
    };
  }, [reduced, fine]);

  if (reduced || !fine) return null;

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed left-0 top-0 z-[5] h-[360px] w-[360px] rounded-full opacity-0"
      style={{
        background:
          "radial-gradient(circle, rgba(142,197,212,0.16) 0%, rgba(142,197,212,0.04) 42%, transparent 70%)",
      }}
    />
  );
}
