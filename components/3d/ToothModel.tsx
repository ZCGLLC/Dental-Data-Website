"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { sampleAt } from "@/data/analytics";
import { CeramicMaterial } from "@/components/3d/materials";

const cusps: Array<[number, number, number]> = [
  [0.28, 0.5, 0.18],
  [-0.28, 0.5, 0.18],
  [0.22, 0.48, -0.2],
  [-0.22, 0.48, -0.2],
];

const contacts = [0.28, 0.31, 0.22, 0.19];

export function ToothModel({ time }: { time: React.RefObject<number> }) {
  const tooth = useRef<THREE.Group>(null);
  const bead = useRef<THREE.Mesh>(null);
  const marks = useRef<Array<THREE.MeshStandardMaterial | null>>([]);

  useFrame((_, delta) => {
    const progress = time.current ?? 0;
    if (tooth.current) tooth.current.rotation.y += delta * 0.12;
    if (bead.current) {
      const angle = progress * Math.PI * 2;
      bead.current.position.set(Math.cos(angle) * 1.18, 0.05, Math.sin(angle) * 1.18);
    }
    const load = sampleAt(progress).axial / 347;
    marks.current.forEach((material, index) => {
      if (!material) return;
      material.emissiveIntensity = 0.15 + load * (contacts[index] ?? 0.2) * 3.2;
    });
  });

  return (
    <group>
      <group ref={tooth} rotation={[0.2, 0.75, 0]}>
        <mesh position={[0, 0.22, 0]} scale={[1.08, 0.64, 0.94]} castShadow>
          <sphereGeometry args={[0.48, 48, 32]} />
          <CeramicMaterial />
        </mesh>
        {cusps.map((position) => (
          <mesh key={position.join("-")} position={position} scale={[1, 0.5, 0.82]}>
            <sphereGeometry args={[0.15, 24, 16]} />
            <CeramicMaterial />
          </mesh>
        ))}
        <mesh position={[0, 0.46, 0]} rotation={[0, 0.4, Math.PI / 2]}>
          <cylinderGeometry args={[0.012, 0.012, 0.72, 8]} />
          <meshStandardMaterial color="#c9bfb2" roughness={0.8} />
        </mesh>
        <mesh position={[0, 0.44, 0]} rotation={[Math.PI / 2.4, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.5, 8]} />
          <meshStandardMaterial color="#c9bfb2" roughness={0.8} />
        </mesh>
        <mesh position={[0, -0.1, 0]}>
          <cylinderGeometry args={[0.36, 0.28, 0.18, 40]} />
          <CeramicMaterial />
        </mesh>
        <mesh position={[-0.16, -0.62, 0.02]} rotation={[0.08, 0, 0.18]}>
          <cylinderGeometry args={[0.13, 0.045, 0.92, 28]} />
          <meshStandardMaterial color="#e3d4c4" roughness={0.78} />
        </mesh>
        <mesh position={[0.18, -0.66, -0.02]} rotation={[-0.06, 0, -0.16]}>
          <cylinderGeometry args={[0.12, 0.04, 0.98, 28]} />
          <meshStandardMaterial color="#dccdbd" roughness={0.78} />
        </mesh>
        {cusps.map((position, index) => (
          <mesh key={`mark-${position.join("-")}`} position={[position[0], position[1] + 0.02, position[2]]}>
            <sphereGeometry args={[0.035, 16, 12]} />
            <meshStandardMaterial
              ref={(material) => {
                marks.current[index] = material;
              }}
              color="#1d6478"
              emissive="#1d6478"
              emissiveIntensity={0.4}
              roughness={0.35}
            />
          </mesh>
        ))}
      </group>

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.18, 0.008, 12, 80]} />
        <meshBasicMaterial color="#1d6478" transparent opacity={0.85} />
      </mesh>
      {Array.from({ length: 12 }).map((_, index) => {
        const angle = (index / 12) * Math.PI * 2;
        return (
          <mesh key={angle} position={[Math.cos(angle) * 1.18, 0.05, Math.sin(angle) * 1.18]}>
            <boxGeometry args={[0.015, 0.04, 0.015]} />
            <meshBasicMaterial color="#141618" transparent opacity={0.35} />
          </mesh>
        );
      })}
      <mesh ref={bead}>
        <sphereGeometry args={[0.045, 16, 16]} />
        <meshBasicMaterial color="#141618" />
      </mesh>
    </group>
  );
}
