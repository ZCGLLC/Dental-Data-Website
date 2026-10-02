"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { InsertionAssembly } from "@/components/3d/StudyPieces";

function WhiteRoom() {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#c5dff0", 0.95]} />
      <ambientLight intensity={0.55} color="#f3f8fc" />
      <directionalLight position={[4.2, 6.2, 4.5]} intensity={1.85} color="#ffffff" />
      <directionalLight position={[-4.5, 1.6, 2.2]} intensity={1.25} color="#9ecae4" />
      <directionalLight position={[1.2, 0.4, -4]} intensity={0.55} color="#ffffff" />
    </>
  );
}

function FieldShell({ radius }: { radius: number }) {
  return (
    <group>
      <mesh>
        <sphereGeometry args={[radius, 16, 12]} />
        <meshBasicMaterial color="#7eb6d4" wireframe transparent opacity={0.2} />
      </mesh>
      <mesh>
        <sphereGeometry args={[radius * 0.62, 14, 10]} />
        <meshBasicMaterial color="#b7d4e6" wireframe transparent opacity={0.14} />
      </mesh>
    </group>
  );
}

function TimeRing({
  time,
  radius,
}: {
  time: React.RefObject<number>;
  radius: number;
}) {
  const bead = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const angle = (time.current ?? 0) * Math.PI * 2;
    bead.current?.position.set(Math.cos(angle) * radius, 0, Math.sin(angle) * radius);
  });

  return (
    <group>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[radius, 0.008, 8, 56]} />
        <meshBasicMaterial color="#7eb6d4" transparent opacity={0.7} />
      </mesh>
      <mesh ref={bead}>
        <sphereGeometry args={[0.035, 12, 12]} />
        <meshBasicMaterial color="#1d6478" />
      </mesh>
    </group>
  );
}

function Turn({
  reduced,
  children,
}: {
  reduced: boolean;
  children: React.ReactNode;
}) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const sway = reduced ? 0.4 : 0.4 + Math.sin(state.clock.elapsedTime * 0.4) * 0.38;
    group.current.rotation.y = sway;
  });

  return <group ref={group}>{children}</group>;
}

function ShadeDots({ radius, count }: { radius: number; count: number }) {
  const mesh = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const seeds = useMemo(
    () =>
      Array.from({ length: count }, (_, index) => {
        const golden = index * 2.399963;
        const y = 1 - (index / Math.max(1, count - 1)) * 2;
        const ring = Math.sqrt(Math.max(0, 1 - y * y));
        return [Math.cos(golden) * ring, y * 0.85, Math.sin(golden) * ring] as const;
      }),
    [count],
  );

  useFrame(() => {
    if (!mesh.current) return;
    seeds.forEach((seed, index) => {
      dummy.position.set(seed[0] * radius, seed[1] * radius, seed[2] * radius);
      dummy.scale.setScalar(0.035);
      dummy.updateMatrix();
      mesh.current?.setMatrixAt(index, dummy.matrix);
    });
    mesh.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 8, 8]} />
      <meshBasicMaterial color="#5aa4c4" transparent opacity={0.45} />
    </instancedMesh>
  );
}

function Stage({
  time,
  reduced,
  radius,
  dots = 0,
  steady = false,
  children,
}: {
  time: React.RefObject<number>;
  reduced: boolean;
  radius: number;
  dots?: number;
  steady?: boolean;
  children: React.ReactNode;
}) {
  return (
    <>
      <color attach="background" args={["#f7fbfe"]} />
      <WhiteRoom />
      <FieldShell radius={radius} />
      {dots > 0 ? <ShadeDots radius={radius * 0.92} count={dots} /> : null}
      <TimeRing time={time} radius={radius * 0.9} />
      {steady ? <group rotation={[0, 0.55, 0]}>{children}</group> : <Turn reduced={reduced}>{children}</Turn>}
    </>
  );
}

export function PieceScene({
  time,
  mobile,
  reduced,
  children,
}: {
  time: React.RefObject<number>;
  mobile: boolean;
  reduced: boolean;
  children: React.ReactNode;
}) {
  return (
    <Canvas
      camera={{ position: [0.85, 0.55, 3.15], fov: 30, near: 0.1, far: 20 }}
      dpr={mobile ? [1, 1.1] : [1, 1.35]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        camera.lookAt(0, 0, 0);
      }}
    >
      <Stage time={time} reduced={reduced} radius={1.2}>
        {children}
      </Stage>
    </Canvas>
  );
}

function Aim() {
  useFrame((state) => {
    state.camera.lookAt(0, 0.18, 0);
  });
  return null;
}

export function InsertionScene({
  time,
  mobile,
  reduced,
}: {
  time: React.RefObject<number>;
  mobile: boolean;
  reduced: boolean;
}) {
  return (
    <Canvas
      camera={{ position: [1.85, 0.55, mobile ? 6.2 : 5.5], fov: mobile ? 36 : 32, near: 0.1, far: 30 }}
      dpr={mobile ? [1, 1.15] : [1, 1.5]}
      gl={{ antialias: !mobile, alpha: false, powerPreference: "high-performance" }}
      onCreated={({ gl, camera }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.12;
        camera.lookAt(0, 0.18, 0);
      }}
    >
      <Aim />
      <Stage time={time} reduced={reduced} radius={1.55} dots={mobile ? 28 : 48} steady>
        <InsertionAssembly time={time} />
      </Stage>
    </Canvas>
  );
}
