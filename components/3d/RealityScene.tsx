"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";
import { sampleAt } from "@/data/analytics";
import { ToothModel } from "@/components/3d/ToothModel";
import { ChipModel } from "@/components/3d/ChipModel";

export type RealityAxes = {
  x: number;
  y: number;
  z: number;
  t: number;
  field: number;
};

const FIELD_COUNT = 64;

function Field({
  axes,
  mobile,
}: {
  axes: React.RefObject<RealityAxes>;
  mobile: boolean;
}) {
  const count = mobile ? 42 : FIELD_COUNT;
  const shell = useRef<THREE.Mesh>(null);
  const inner = useRef<THREE.Mesh>(null);
  const cloud = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const golden = index * 2.399963;
        const y = 1 - (index / Math.max(1, count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        return {
          x: Math.cos(golden) * ring,
          y: y * 0.72,
          z: Math.sin(golden) * ring,
        };
      }),
    [count],
  );

  useLayoutEffect(() => {
    if (!cloud.current) return;
    seeds.forEach((seed, index) => {
      dummy.position.set(seed.x, seed.y, seed.z);
      dummy.scale.setScalar(0.03);
      dummy.updateMatrix();
      cloud.current?.setMatrixAt(index, dummy.matrix);
    });
    cloud.current.instanceMatrix.needsUpdate = true;
  }, [dummy, seeds]);

  useFrame(() => {
    const field = axes.current?.field ?? 0.6;
    const load = sampleAt(axes.current?.t ?? 0).axial / 347;
    const radius = 0.9 + field * 1.35;
    if (shell.current) shell.current.scale.setScalar(radius);
    if (inner.current) inner.current.scale.setScalar(radius * 0.62);
    if (!cloud.current) return;
    seeds.forEach((seed, index) => {
      const pulse = 0.85 + load * 0.35;
      dummy.position.set(seed.x * radius * pulse, seed.y * radius * pulse, seed.z * radius * pulse);
      dummy.scale.setScalar(0.018 + load * 0.02);
      dummy.updateMatrix();
      cloud.current?.setMatrixAt(index, dummy.matrix);
    });
    cloud.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh ref={shell}>
        <sphereGeometry args={[1, 24, 16]} />
        <meshBasicMaterial color="#7eb6d4" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh ref={inner}>
        <sphereGeometry args={[1, 16, 10]} />
        <meshBasicMaterial color="#b7d4e6" wireframe transparent opacity={0.16} />
      </mesh>
      <instancedMesh ref={cloud} args={[undefined, undefined, count]}>
        <sphereGeometry args={[1, 8, 8]} />
        <meshBasicMaterial color="#5aa4c4" transparent opacity={0.45} />
      </instancedMesh>
    </group>
  );
}

function World({
  axes,
  time,
  mobile,
  reduced,
}: {
  axes: React.RefObject<RealityAxes>;
  time: React.RefObject<number>;
  mobile: boolean;
  reduced: boolean;
}) {
  const world = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    const current = axes.current;
    if (!current) return;
    const px = reduced || mobile ? 0 : state.pointer.x;
    const py = reduced || mobile ? 0 : state.pointer.y;
    const depth = mobile ? 4.6 : 4.9;
    state.camera.position.x = THREE.MathUtils.damp(
      state.camera.position.x,
      (mobile ? 0 : 0.15) + px * 0.28,
      2.4,
      delta,
    );
    state.camera.position.y = THREE.MathUtils.damp(
      state.camera.position.y,
      0.38 + py * 0.18,
      2.4,
      delta,
    );
    state.camera.position.z = THREE.MathUtils.damp(state.camera.position.z, depth, 2.4, delta);
    state.camera.lookAt(mobile ? 0 : 0.2, 0.02, 0);
    if (world.current) {
      world.current.position.x = (current.x - 0.5) * 1.7;
      world.current.position.y = (current.y - 0.5) * 0.95;
    }
  });

  return (
    <>
      <color attach="background" args={["#f7fbfe"]} />
      <hemisphereLight args={["#ffffff", "#c5dff0", 0.95]} />
      <ambientLight intensity={0.55} color="#f3f8fc" />
      <directionalLight position={[4.2, 6.2, 4.5]} intensity={1.85} color="#ffffff" />
      <directionalLight position={[-4.5, 1.6, 2.2]} intensity={1.25} color="#9ecae4" />
      <directionalLight position={[1.2, 0.4, -4]} intensity={0.55} color="#ffffff" />
      {mobile ? null : (
        <Environment frames={1} resolution={64} environmentIntensity={0.28}>
          <Lightformer form="rect" intensity={2.2} position={[0, 4, 2]} scale={[8, 3, 1]} color="#ffffff" />
          <Lightformer form="rect" intensity={1.5} position={[-4, 1.2, 2]} scale={[4, 5, 1]} color="#c5e4f5" />
          <Lightformer form="rect" intensity={0.8} position={[3.5, 1, -3]} scale={[3, 3, 1]} color="#ffffff" />
        </Environment>
      )}
      <group ref={world}>
        <group position={mobile ? [0, 0.05, 0] : [-0.15, -0.05, 0]} scale={mobile ? 0.58 : 0.74}>
          <ToothModel time={time} />
          <Field axes={axes} mobile={mobile} />
        </group>
        <group position={mobile ? [0.05, 0.72, 0.55] : [1.45, 0.02, -0.55]} scale={mobile ? 0.2 : 0.5}>
          <ChipModel time={time} />
        </group>
      </group>
    </>
  );
}

export function RealityScene({
  axes,
  time,
  mobile,
  reduced,
}: {
  axes: React.RefObject<RealityAxes>;
  time: React.RefObject<number>;
  mobile: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [0.2, 0.45, 4.6], fov: mobile ? 34 : 30, near: 0.1, far: 40 }}
      dpr={mobile ? [1, 1.15] : [1, 1.5]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
      }}
    >
      <World axes={axes} time={time} mobile={mobile} reduced={reduced} />
    </Canvas>
  );
}
