"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import type { PartId } from "@/data/content";
import { SEPARATION, STACK, abutmentGeometry, crownGeometry, implantGeometry } from "@/components/3d/geometry";
import {
  BoneMaterial,
  CeramicMaterial,
  SensorMaterial,
  TitaniumMaterial,
} from "@/components/3d/materials";

export type ImplantRefs = {
  explode: React.RefObject<number>;
  hover: React.RefObject<PartId | null>;
};

type Props = ImplantRefs & {
  wire?: boolean;
  onHover?: (part: PartId | null) => void;
  reduced?: boolean;
};

export function ProceduralImplant({
  explode,
  hover,
  wire = false,
  onHover,
  reduced = false,
}: Props) {
  const crown = useRef<THREE.Group>(null);
  const sensor = useRef<THREE.Group>(null);
  const abutment = useRef<THREE.Group>(null);
  const implant = useRef<THREE.Group>(null);
  const bone = useRef<THREE.Group>(null);
  const sensorMat = useRef<THREE.MeshPhysicalMaterial>(null);

  useFrame((state, delta) => {
    const amount = explode.current ?? 0;
    const active = hover.current;
    const lift = (id: PartId, base: number, gap: number) =>
      base + gap * amount + (active === id ? 0.1 : 0);

    const pairs: Array<[THREE.Group | null, PartId, number, number]> = [
      [crown.current, "crown", STACK.crown, SEPARATION.crown],
      [sensor.current, "sensor", STACK.sensor, SEPARATION.sensor],
      [abutment.current, "abutment", STACK.abutment, SEPARATION.abutment],
      [implant.current, "implant", STACK.implant, SEPARATION.implant],
      [bone.current, "bone", STACK.bone, SEPARATION.bone],
    ];

    for (const [node, id, base, gap] of pairs) {
      if (!node) continue;
      const target = lift(id, base, gap);
      node.position.y = THREE.MathUtils.damp(node.position.y, target, 4.2, delta);
    }

    if (sensorMat.current && !wire && !reduced) {
      sensorMat.current.emissiveIntensity =
        0.22 + Math.sin(state.clock.elapsedTime * 2.1) * 0.1;
    }
  });

  const bind = (id: PartId) => ({
    onPointerOver: (event: { stopPropagation: () => void }) => {
      event.stopPropagation();
      onHover?.(id);
      document.body.style.cursor = "pointer";
    },
    onPointerOut: () => {
      onHover?.(null);
      document.body.style.cursor = "";
    },
  });

  return (
    <group>
      <group ref={crown} position={[0, STACK.crown, 0]} {...bind("crown")}>
        <mesh geometry={crownGeometry} castShadow receiveShadow>
          <CeramicMaterial wire={wire} />
        </mesh>
        {[
          [0.16, 0.42, 0.1],
          [-0.16, 0.42, 0.1],
          [0.1, 0.41, -0.12],
          [-0.1, 0.41, -0.12],
        ].map((position) => (
          <mesh
            key={position.join("-")}
            position={position as [number, number, number]}
            scale={[1, 0.45, 0.8]}
          >
            <sphereGeometry args={[0.07, 16, 12]} />
            <CeramicMaterial wire={wire} />
          </mesh>
        ))}
      </group>

      <group ref={sensor} position={[0, STACK.sensor, 0]} {...bind("sensor")}>
        <mesh>
          <cylinderGeometry args={[0.29, 0.29, 0.12, 48]} />
          <SensorMaterial wire={wire} materialRef={sensorMat} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.29, 0.006, 8, 48]} />
          <meshStandardMaterial
            color="#1d6478"
            emissive="#1d6478"
            emissiveIntensity={wire ? 0 : 0.8}
            roughness={0.3}
            metalness={0.2}
            wireframe={wire}
          />
        </mesh>
        {[0, 2.2, 4.2].map((angle) => (
          <mesh key={angle} position={[Math.cos(angle) * 0.29, 0, Math.sin(angle) * 0.29]}>
            <sphereGeometry args={[0.018, 10, 10]} />
            <meshBasicMaterial color="#d7eef4" toneMapped={false} />
          </mesh>
        ))}
      </group>

      <group ref={abutment} position={[0, STACK.abutment, 0]} {...bind("abutment")}>
        <mesh geometry={abutmentGeometry} castShadow>
          <TitaniumMaterial wire={wire} color="#8e97a3" />
        </mesh>
      </group>

      <group ref={implant} position={[0, STACK.implant, 0]} {...bind("implant")}>
        <mesh geometry={implantGeometry} castShadow>
          <TitaniumMaterial wire={wire} color="#7d8793" />
        </mesh>
        {Array.from({ length: 9 }).map((_, index) => {
          const t = index / 8;
          const y = -0.24 - t * 0.62;
          const radius = 0.168 * (1 - t * 0.12);
          return (
            <mesh key={y} position={[0, y, 0]} rotation={[Math.PI / 2, 0, 0]}>
              <torusGeometry args={[radius, 0.012, 6, 28]} />
              <TitaniumMaterial wire={wire} color="#a8b0ba" />
            </mesh>
          );
        })}
      </group>

      <group ref={bone} position={[0, STACK.bone, 0]} {...bind("bone")}>
        <mesh rotation={[Math.PI / 2.4, 0.4, 0.2]} position={[0, 0.08, 0]}>
          <torusGeometry args={[0.62, 0.2, 18, 40, Math.PI * 0.72]} />
          <BoneMaterial wire={wire} />
        </mesh>
      </group>
    </group>
  );
}
