"use client";

import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { PartId } from "@/data/content";
import { ImplantModel } from "@/components/3d/ImplantModel";
import { Studio } from "@/components/3d/Studio";

function StudyContent({
  explode,
  hover,
  onHover,
  reduced,
  mobile,
}: {
  explode: React.RefObject<number>;
  hover: React.RefObject<PartId | null>;
  onHover?: (part: PartId | null) => void;
  reduced: boolean;
  mobile: boolean;
}) {
  return (
    <>
      <Studio quality={mobile ? "low" : "high"} />
      <ImplantModel explode={explode} hover={hover} onHover={onHover} reduced={reduced} />
      <OrbitControls
        enablePan={false}
        autoRotate={!reduced}
        autoRotateSpeed={0.45}
        minDistance={3.4}
        maxDistance={9}
        minPolarAngle={0.7}
        maxPolarAngle={1.7}
        target={[0, 0.05, 0]}
      />
    </>
  );
}

export function StudyScene(props: {
  explode: React.RefObject<number>;
  hover: React.RefObject<PartId | null>;
  onHover?: (part: PartId | null) => void;
  reduced: boolean;
  mobile: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0.35, 0.35, 4.8], fov: 30, near: 0.1, far: 40 }}
      dpr={props.mobile ? [1, 1.25] : [1, 1.7]}
      gl={{ antialias: true, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <color attach="background" args={["#0b0c0e"]} />
      <StudyContent {...props} />
    </Canvas>
  );
}
