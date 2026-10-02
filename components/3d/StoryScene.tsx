"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MotionValue } from "framer-motion";
import * as THREE from "three";
import type { PartId } from "@/data/content";
import { ImplantModel } from "@/components/3d/ImplantModel";
import { Studio } from "@/components/3d/Studio";

function SceneContent({
  progress,
  hover,
  onHover,
  reduced,
  mobile,
}: {
  progress: MotionValue<number>;
  hover: React.RefObject<PartId | null>;
  onHover?: (part: PartId | null) => void;
  reduced: boolean;
  mobile: boolean;
}) {
  const explode = useRef(0);
  const group = useRef<THREE.Group>(null);
  const spin = useRef(0.5);

  useFrame((state, delta) => {
    const p = reduced ? 0 : progress.get();
    let targetExplode = 0;
    let zoom = mobile ? 8.6 : 7.1;

    if (p < 0.16) {
      targetExplode = 0;
      zoom = (mobile ? 7.3 : 6.3) - (p / 0.16) * 0.35;
    } else if (p < 0.46) {
      targetExplode = (p - 0.16) / 0.3;
      zoom = (mobile ? 6.9 : 6.05) + targetExplode * (mobile ? 1.5 : 1.8);
    } else if (p < 0.74) {
      targetExplode = 1;
      zoom = mobile ? 8.6 : 7.9;
    } else {
      targetExplode = Math.max(0, 1 - (p - 0.74) / 0.2);
      zoom = (mobile ? 8.6 : 7.9) - (1 - targetExplode) * 1.1;
    }

    explode.current = THREE.MathUtils.damp(explode.current, targetExplode, 3.2, delta);
    if (!reduced) spin.current += delta * 0.15;
    if (group.current) {
      const px = reduced || mobile ? 0 : state.pointer.x;
      const py = reduced || mobile ? 0 : state.pointer.y;
      group.current.rotation.y = spin.current + px * 0.25;
      group.current.rotation.x = 0.18 - py * 0.07;
      group.current.position.y = reduced
        ? 0
        : Math.sin(state.clock.elapsedTime * 0.5) * 0.03;
    }

    const px = reduced || mobile ? 0 : state.pointer.x;
    const py = reduced || mobile ? 0 : state.pointer.y;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, px * 0.38, 2, delta);
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.02 + py * 0.18,
      2,
      delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, zoom, 2.2, delta);
    state.camera.lookAt(mobile ? 0 : 0.55, mobile ? -0.55 : 0.05, 0);
  });

  return (
    <>
      <color attach="background" args={["#f7fbfe"]} />
      <Studio quality={mobile ? "low" : "high"} />
      <group ref={group} position={[mobile ? 0 : 0.45, mobile ? 0.55 : -0.28, 0]} scale={mobile ? 0.62 : 1}>
        <ImplantModel
          explode={explode}
          hover={hover}
          onHover={onHover}
          reduced={reduced}
        />
      </group>
    </>
  );
}

export function StoryScene({
  progress,
  hover,
  onHover,
  reduced,
  mobile,
}: {
  progress: MotionValue<number>;
  hover: React.RefObject<PartId | null>;
  onHover?: (part: PartId | null) => void;
  reduced: boolean;
  mobile: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0.15, 0.05, 6.4], fov: 28, near: 0.1, far: 40 }}
      dpr={mobile ? [1, 1.25] : [1, 1.7]}
      gl={{
        antialias: true,
        alpha: false,
        powerPreference: "high-performance",
      }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 0.96;
      }}
    >
      <SceneContent
        progress={progress}
        hover={hover}
        onHover={onHover}
        reduced={reduced}
        mobile={mobile}
      />
    </Canvas>
  );
}
