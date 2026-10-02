"use client";

import dynamic from "next/dynamic";
import { useEffect, useRef, useState } from "react";
import { brand } from "@/config/brand";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import { usePrefersReducedMotion } from "@/hooks/usePrefersReducedMotion";
import {
  AbutmentBody,
  AbutmentPocket,
  BoneRidge,
  CoilBond,
  CrownSeat,
  LayerStack,
  MembraneDie,
  MolarCrown,
  ParallelScrew,
  PremolarCrown,
  SealedPuck,
  TaperedScrew,
} from "@/components/3d/StudyPieces";

const PieceScene = dynamic(
  () => import("@/components/3d/StudyScenes").then((mod) => mod.PieceScene),
  { ssr: false },
);

const InsertionScene = dynamic(
  () => import("@/components/3d/StudyScenes").then((mod) => mod.InsertionScene),
  { ssr: false },
);

const sensorStages = [
  {
    label: "Membrane die",
    detail: "Strain and temperature sites on one face.",
    Piece: MembraneDie,
  },
  {
    label: "Coil bond",
    detail: "A short-range antenna joined to the die.",
    Piece: CoilBond,
  },
  {
    label: "Layer stack",
    detail: "Ceramic base, coil, die, and lid — still apart.",
    Piece: LayerStack,
  },
  {
    label: "Sealed insert",
    detail: "Those layers closed into one handleable insert.",
    Piece: SealedPuck,
  },
] as const;

const stackPieces = [
  {
    label: "Molar crown",
    detail: "An occlusal form under study.",
    Piece: MolarCrown,
  },
  {
    label: "Premolar crown",
    detail: "A smaller clinical shape.",
    Piece: PremolarCrown,
  },
  {
    label: "Crown seat",
    detail: "The underside that closes over the insert.",
    Piece: CrownSeat,
  },
  {
    label: "Abutment",
    detail: "The body between crown and screw.",
    Piece: AbutmentBody,
  },
  {
    label: "Abutment pocket",
    detail: "An open well sized for the insert.",
    Piece: AbutmentPocket,
  },
  {
    label: "Parallel screw",
    detail: "A conventional fixture shape.",
    Piece: ParallelScrew,
  },
  {
    label: "Tapered screw",
    detail: "A second conventional fixture shape.",
    Piece: TaperedScrew,
  },
  {
    label: "Bone ridge",
    detail: "The jaw form the screw is designed to explore.",
    Piece: BoneRidge,
  },
] as const;

function LiveCanvas({
  eager = false,
  className,
  children,
}: {
  eager?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [on, setOn] = useState(eager);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => setOn(Boolean(entry?.isIntersecting)),
      { rootMargin: "280px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className={className}>
      {on ? children : <div className="h-full bg-[#f7fbfe]" />}
    </div>
  );
}

function ModelCard({
  label,
  detail,
  eager = false,
  time,
  mobile,
  reduced,
  children,
}: {
  label: string;
  detail: string;
  eager?: boolean;
  time: React.RefObject<number>;
  mobile: boolean;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <figure>
      <LiveCanvas
        eager={eager}
        className="h-[220px] border border-[#d3e4ef] bg-[#f7fbfe] md:h-[260px]"
      >
        <PieceScene time={time} mobile={mobile} reduced={reduced}>
          {children}
        </PieceScene>
      </LiveCanvas>
      <figcaption className="mt-3">
        <p className="text-[11px] tracking-[0.16em] text-porcelain uppercase">{label}</p>
        <p className="mt-1 text-sm leading-6 text-titanium">{detail}</p>
      </figcaption>
    </figure>
  );
}

export function Analytics() {
  const reduced = usePrefersReducedMotion();
  const mobile = useMediaQuery("(max-width: 767px)");
  const time = useRef(0.5);

  useEffect(() => {
    if (reduced) return;
    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const delta = Math.min(0.05, (now - last) / 1000);
      last = now;
      time.current = (time.current + delta * 0.09) % 1;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [reduced]);

  return (
    <section
      id="analytics"
      className="relative bg-[#f7fbfe] bg-[radial-gradient(ellipse_at_12%_0%,#e7f3fb_0%,transparent_46%),radial-gradient(ellipse_at_88%_30%,#e3f1f8_0%,transparent_40%)]"
    >
      <div className="shell pb-24 pt-28 md:pt-32">
        <h2 className="display text-[clamp(3.4rem,7vw,6.4rem)] uppercase text-porcelain">
          <span className="block">5D</span>
          <span className="block">reality.</span>
        </h2>
        <p className="lede mt-6 max-w-xl">
          Every piece of the restoration, each in its own model. Width, height, depth, a turning
          day, and a pale field around the part.
        </p>

        <div id="sensor" className="mt-14">
          <p className="eyebrow">Sensor</p>
          <h3 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] uppercase text-porcelain">
            How the insert is made.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-titanium">
            A research sequence. The die, a short-range coil, and a ceramic seal become one
            handleable insert. The order of the parts is the study — not a fabrication recipe.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {sensorStages.map((stage) => (
              <ModelCard
                key={stage.label}
                label={stage.label}
                detail={stage.detail}
                eager
                time={time}
                mobile={mobile}
                reduced={reduced}
              >
                <stage.Piece />
              </ModelCard>
            ))}
          </div>
        </div>

        <div className="mt-16">
          <p className="eyebrow">Input</p>
          <h3 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] uppercase text-porcelain">
            How it is seated.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-titanium">
            The insert lowers into the abutment pocket. The crown closes over it. The screw below
            stays a conventional titanium fixture.
          </p>
          <LiveCanvas eager className="mt-8 h-[68vh] min-h-[420px] border border-[#d3e4ef] bg-[#f7fbfe]">
            <InsertionScene time={time} mobile={mobile} reduced={reduced} />
          </LiveCanvas>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-titanium">
            Open, then seated, then covered. The blue ring marks the pocket mouth. Electronics
            stay in the crown and abutment so an osseointegrated screw can remain in place.
          </p>
        </div>

        <div className="mt-20">
          <p className="eyebrow">Stack</p>
          <h3 className="display mt-4 text-[clamp(2rem,4vw,3.4rem)] uppercase text-porcelain">
            Every piece.
          </h3>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-titanium">
            Crown, abutment, screw, and bone, studied as separate models. Connection shapes are
            generic.
          </p>
          <div className="mt-8 grid grid-cols-2 gap-x-4 gap-y-8 lg:grid-cols-4">
            {stackPieces.map((piece) => (
              <ModelCard
                key={piece.label}
                label={piece.label}
                detail={piece.detail}
                time={time}
                mobile={mobile}
                reduced={reduced}
              >
                <piece.Piece />
              </ModelCard>
            ))}
          </div>
        </div>

        <p className="mt-16 max-w-2xl text-xs leading-6 text-silver">{brand.disclaimers.science}</p>
      </div>
    </section>
  );
}
