"use client";

import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import { Studio } from "@/components/3d/Studio";
import { ToothModel } from "@/components/3d/ToothModel";
import { ChipModel } from "@/components/3d/ChipModel";

export function ModelStage({
  mode,
  time,
  mobile,
}: {
  mode: "tooth" | "chip";
  time: React.RefObject<number>;
  mobile: boolean;
}) {
  const tooth = mode === "tooth";
  return (
    <Canvas
      camera={{
        position: tooth ? [1.15, 0.72, 2.7] : [1.35, 1.25, 2.15],
        fov: tooth ? 28 : 30,
        near: 0.1,
        far: 40,
      }}
      dpr={mobile ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.02;
        camera.lookAt(0, tooth ? -0.05 : 0.08, 0);
      }}
    >
      <color attach="background" args={["#f7f6f4"]} />
      <Studio quality={mobile ? "low" : "high"} />
      {tooth ? <ToothModel time={time} /> : <ChipModel time={time} />}
    </Canvas>
  );
}
