"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { motion, useScroll, useTransform } from "framer-motion";
import { problem } from "@/data/content";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

export function Problem() {
  const ref = useRef<HTMLElement>(null);
  const ring = useRef<SVGCircleElement>(null);
  const reduced = usePrefersReducedMotion();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 75%", "center 40%"],
  });
  const glow = useTransform(scrollYProgress, [0, 1], [0.08, 1]);

  useEffect(() => {
    if (reduced || !ring.current) return;
    const tween = gsap.fromTo(
      ring.current,
      { strokeDashoffset: 520 },
      {
        strokeDashoffset: 0,
        duration: 2.4,
        ease: "power2.out",
        scrollTrigger: undefined,
        paused: true,
      },
    );
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) tween.play();
      },
      { threshold: 0.45 },
    );
    observer.observe(node);
    return () => {
      observer.disconnect();
      tween.kill();
    };
  }, [reduced]);

  return (
    <section ref={ref} id="problem" className="bg-ink py-28 md:py-40">
      <div className="shell grid items-center gap-16 lg:grid-cols-2">
        <Reveal>
          <SectionHeading eyebrow={problem.eyebrow} title={[...problem.title]} />
          <div className="mt-10 max-w-xl space-y-5 text-base leading-7 text-titanium">
            {problem.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="relative mx-auto aspect-[4/5] w-full max-w-md">
            <svg viewBox="0 0 360 460" className="h-full w-full" aria-hidden="true">
              <rect width="360" height="460" fill="#f7f6f4" />
              <g fill="#e7dfd4" stroke="#1c2128" strokeWidth="1">
                <path d="M180 70c42 0 70 26 78 60 6 22-4 42-20 56-10 8-16 16-16 28h-84c0-12-6-20-16-28-16-14-26-34-20-56 8-34 36-60 78-60z" />
                <rect x="150" y="214" width="60" height="18" />
                <path d="M158 244h44l12 78-10 24h-48l-10-24z" />
                <path d="M168 356h24v70l-8 16h-8l-8-16z" />
              </g>
              <motion.g style={{ opacity: glow }}>
                <circle
                  ref={ring}
                  cx="180"
                  cy="230"
                  r="82"
                  fill="none"
                  stroke="#1d6478"
                  strokeWidth="1"
                  strokeDasharray="520"
                  strokeDashoffset={reduced ? 0 : 520}
                />
                <circle cx="180" cy="168" r="3" fill="#1d6478" />
                <circle cx="180" cy="228" r="3" fill="#141618" />
                <circle cx="180" cy="292" r="3" fill="#1d6478" />
                <path
                  d="M180 168v124"
                  stroke="#1d6478"
                  strokeWidth="1"
                  strokeDasharray="4 6"
                />
                <text
                  x="206"
                  y="172"
                  fill="#141618"
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                >
                  LOAD
                </text>
                <text
                  x="206"
                  y="232"
                  fill="#141618"
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                >
                  STRAIN
                </text>
                <text
                  x="206"
                  y="296"
                  fill="#141618"
                  fontSize="11"
                  fontFamily="ui-monospace, monospace"
                >
                  TEMP
                </text>
              </motion.g>
            </svg>
            <p className="num absolute bottom-4 left-4 text-[10px] tracking-[0.18em] text-silver uppercase">
              Signal study · not a clinical image
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
