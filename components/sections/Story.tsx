"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { brand } from "@/config/brand";
import { hero, parts, type PartId } from "@/data/content";
import { storyController } from "@/lib/story";
import { useLenis } from "lenis/react";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import { MagneticButton } from "@/components/ui/MagneticButton";
import { ImplantSchematic } from "@/components/3d/ImplantSchematic";
import { CanvasSlot } from "@/components/3d/CanvasSlot";

const StoryScene = dynamic(
  () => import("@/components/3d/StoryScene").then((mod) => mod.StoryScene),
  { ssr: false },
);

export function Story() {
  const ref = useRef<HTMLElement>(null);
  const hover = useRef<PartId | null>(null);
  const [active, setActive] = useState<PartId | null>(null);
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const lenis = useLenis();
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.08, 0.2], [1, 1, 0]);
  const labelOpacity = useTransform(scrollYProgress, [0.34, 0.46, 0.7, 0.8], [0, 1, 1, 0]);

  useEffect(() => {
    storyController.scrollToProgress = (progress: number) => {
      const node = ref.current;
      if (!node) return;
      const start = node.getBoundingClientRect().top + window.scrollY;
      const travel = node.offsetHeight - window.innerHeight;
      const destination = start + travel * progress;
      if (lenis) lenis.scrollTo(destination, { duration: 1.35 });
      else window.scrollTo({ top: destination, behavior: "smooth" });
    };
    return () => {
      storyController.scrollToProgress = null;
    };
  }, [lenis]);

  if (reduced) {
    return (
      <section id="technology" className="bg-ink px-5 pt-28 pb-20 md:px-12">
        <div className="shell grid items-end gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">{brand.disclaimers.research}</p>
            <h1 className="display mt-6 text-[clamp(3.3rem,8vw,6.4rem)] uppercase">
              {hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="lede mt-6 max-w-md">{hero.lede}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton href="/technology">{brand.cta.explore}</MagneticButton>
              <MagneticButton href="/#partners" variant="ghost">
                {brand.cta.partner}
              </MagneticButton>
            </div>
          </div>
          <ImplantSchematic exploded className="mx-auto h-[520px] max-w-md" />
        </div>
      </section>
    );
  }

  return (
    <section id="technology" ref={ref} className="relative h-[340vh] bg-ink md:h-[520vh]">
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        <div
          className="absolute inset-0"
          role="img"
          aria-label="A research visualization of a sensor-enabled dental implant rotating in space, then separating into crown, sensor layer, smart abutment, implant fixture, and bone."
        >
          <CanvasSlot
            eager
            className="absolute inset-0"
            fallback={
              <div className="flex h-full items-center justify-center bg-[radial-gradient(ellipse_at_center,_#1a1e24_0%,_#070708_62%)]">
                <ImplantSchematic className="h-[70%] max-w-sm" exploded />
              </div>
            }
          >
            <StoryScene
              progress={scrollYProgress}
              hover={hover}
              reduced={reduced}
              mobile={mobile}
              onHover={(part) => {
                hover.current = part;
                setActive(part);
              }}
            />
          </CanvasSlot>
        </div>

        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] h-[68%] bg-gradient-to-t from-ink via-ink/92 to-transparent md:hidden" />
        <motion.div
          style={{ opacity: heroOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 pt-24 pb-8 md:px-12 md:pt-28 md:pb-14"
        >
          <p className="eyebrow">{brand.disclaimers.research}</p>
          <div className="max-w-3xl bg-ink pt-2 md:bg-transparent md:pt-0">
            <h1 className="display text-[clamp(3.3rem,8.6vw,7.6rem)] uppercase">
              {hero.title.map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </h1>
            <p className="lede mt-6 max-w-md text-[15px] md:text-base">{hero.lede}</p>
            <div className="pointer-events-auto mt-8 flex flex-col gap-3 sm:flex-row">
              <MagneticButton
                href="/#technology"
                onClick={(event) => {
                  event.preventDefault();
                  storyController.scrollToProgress?.(0.48);
                }}
              >
                {brand.cta.explore}
              </MagneticButton>
              <MagneticButton href="/#partners" variant="ghost">
                {brand.cta.partner}
              </MagneticButton>
            </div>
          </div>
          <p className="num text-[10px] tracking-[0.22em] text-silver uppercase">Scroll</p>
        </motion.div>

        <motion.div
          style={{ opacity: labelOpacity }}
          className="pointer-events-none absolute inset-0 z-10 hidden md:block"
        >
          <div className="shell flex h-full items-center justify-between">
            <ul className="max-w-xs space-y-8">
              {parts.slice(0, 3).map((part) => (
                <PartLabel key={part.id} part={part} active={active} />
              ))}
            </ul>
            <ul className="max-w-xs space-y-8 text-right">
              {parts.slice(3).map((part) => (
                <PartLabel key={part.id} part={part} active={active} align="right" />
              ))}
            </ul>
          </div>
        </motion.div>

        <motion.div
          style={{ opacity: labelOpacity }}
          className="absolute inset-x-0 bottom-0 z-10 px-5 pb-6 md:hidden"
        >
          <p className="num text-[10px] tracking-[0.18em] text-ice uppercase">
            {active
              ? parts.find((part) => part.id === active)?.name
              : "Crown · Sensor · Abutment · Implant · Bone"}
          </p>
          <p className="mt-2 text-sm text-titanium">
            {active
              ? parts.find((part) => part.id === active)?.line
              : "The assembly separates as you scroll."}
          </p>
        </motion.div>
      </div>
    </section>
  );
}

function PartLabel({
  part,
  active,
  align = "left",
}: {
  part: (typeof parts)[number];
  active: PartId | null;
  align?: "left" | "right";
}) {
  const hot = !active || active === part.id;
  return (
    <li className={align === "right" ? "ml-auto" : ""} style={{ opacity: hot ? 1 : 0.35 }}>
      <p className="num text-[10px] tracking-[0.2em] text-ice">{part.index}</p>
      <p className="mt-2 text-[12px] tracking-[0.18em] uppercase">{part.name}</p>
      <p className="mt-2 text-sm leading-6 text-titanium">{part.line}</p>
      {active === part.id ? (
        <p className="mt-3 text-sm leading-6 text-silver">{part.detail}</p>
      ) : null}
    </li>
  );
}
