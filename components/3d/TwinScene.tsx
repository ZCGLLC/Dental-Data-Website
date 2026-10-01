"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { ImplantModel } from "@/components/3d/ImplantModel";
import { Studio } from "@/components/3d/Studio";
import type { PartId } from "@/data/content";

function LinkStream() {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.children.forEach((child, index) => {
      const t = (state.clock.elapsedTime * 0.18 + index / 8) % 1;
      child.position.x = -1.55 + t * 3.1;
      child.position.y = Math.sin(t * Math.PI) * 0.28;
    });
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 8 }).map((_, index) => (
        <mesh key={index}>
          <sphereGeometry args={[0.025, 10, 10]} />
          <meshBasicMaterial color="#9fd4e4" transparent opacity={0.85} />
        </mesh>
      ))}
    </group>
  );
}

function TwinContent({ mobile }: { mobile: boolean }) {
  const explode = useRef(0);
  const hover = useRef<PartId | null>(null);
  const left = useRef<THREE.Group>(null);
  const right = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (left.current) left.current.rotation.y += delta * 0.18;
    if (right.current) right.current.rotation.y += delta * 0.18;
    const shift = mobile ? 0 : state.pointer.x * 0.08;
    state.camera.position.x = THREE.MathUtils.damp(state.camera.position.x, shift, 2, delta);
    state.camera.lookAt(0, 0, 0);
  });

  return (
    <>
      <Studio quality={mobile ? "low" : "high"} />
      <LinkStream />
      <group ref={left} position={[-1.15, -0.2, 0]} scale={0.85}>
        <ImplantModel explode={explode} hover={hover} />
      </group>
      <group ref={right} position={[1.15, -0.2, 0]} scale={0.85}>
        <ImplantModel explode={explode} hover={hover} wire />
      </group>
    </>
  );
}

export function TwinScene({ mobile }: { mobile: boolean }) {
  return (
    <Canvas
      camera={{ position: [0, 0.15, mobile ? 6.4 : 5.4], fov: 32, near: 0.1, far: 40 }}
      dpr={mobile ? [1, 1.2] : [1, 1.6]}
      gl={{ antialias: !mobile, alpha: true, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.setClearColor(0x000000, 0);
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.05;
      }}
    >
      <TwinContent mobile={mobile} />
    </Canvas>
  );
}
