"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import type * as THREE from "three";
import { samples } from "@/data/analytics";

const pads = [
  ...Array.from({ length: 7 }, (_, index) => [-0.48 + index * 0.16, 0.07, 0.36] as const),
  ...Array.from({ length: 7 }, (_, index) => [-0.48 + index * 0.16, 0.07, -0.36] as const),
];

export function ChipModel({ time }: { time: React.RefObject<number> }) {
  const group = useRef<THREE.Group>(null);
  const scan = useRef<THREE.Mesh>(null);
  const cursor = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    const progress = time.current ?? 0;
    if (group.current) {
      group.current.rotation.y = -0.55 + Math.sin(state.clock.elapsedTime * 0.35) * 0.08;
      group.current.rotation.x = 0.35;
    }
    if (scan.current) scan.current.position.z = -0.28 + progress * 0.56;
    if (cursor.current) cursor.current.position.x = -0.5 + progress * 1.0;
  });

  return (
    <group ref={group}>
      <mesh position={[0, -0.02, 0]} castShadow>
        <boxGeometry args={[1.7, 0.08, 1.2]} />
        <meshStandardMaterial color="#e7e1d6" roughness={0.55} metalness={0.08} />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <boxGeometry args={[1.2, 0.045, 0.82]} />
        <meshStandardMaterial color="#171b22" metalness={0.55} roughness={0.28} />
      </mesh>
      <mesh position={[0, 0.08, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.02, 40]} />
        <meshStandardMaterial color="#243038" metalness={0.4} roughness={0.32} emissive="#1d6478" emissiveIntensity={0.25} />
      </mesh>
      <mesh position={[0, 0.09, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.16, 0.008, 8, 40]} />
        <meshBasicMaterial color="#7eb0c0" />
      </mesh>
      <mesh position={[0.42, 0.08, 0.22]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.1, 0.008, 8, 28]} />
        <meshStandardMaterial color="#b08d57" metalness={0.85} roughness={0.22} />
      </mesh>
      {pads.map((position) => (
        <mesh key={position.join("-")} position={position}>
          <boxGeometry args={[0.07, 0.02, 0.05]} />
          <meshStandardMaterial color="#c4a15b" metalness={0.88} roughness={0.2} />
        </mesh>
      ))}
      {pads.map((position) => (
        <mesh
          key={`trace-${position.join("-")}`}
          position={[position[0] * 0.55, 0.075, position[2] * 0.55]}
        >
          <boxGeometry args={[0.012, 0.008, Math.abs(position[2]) * 0.45]} />
          <meshStandardMaterial color="#8d7344" metalness={0.7} roughness={0.3} />
        </mesh>
      ))}
      <mesh position={[-0.62, 0.04, 0.42]}>
        <boxGeometry args={[0.16, 0.05, 0.08]} />
        <meshStandardMaterial color="#2c3138" roughness={0.4} metalness={0.2} />
      </mesh>
      <mesh ref={scan} position={[0, 0.1, 0]}>
        <boxGeometry args={[1.05, 0.008, 0.012]} />
        <meshBasicMaterial color="#d7eef4" transparent opacity={0.9} />
      </mesh>
      <mesh position={[0, 0.11, -0.22]}>
        <boxGeometry args={[1.05, 0.008, 0.008]} />
        <meshBasicMaterial color="#7eb0c0" />
      </mesh>
      {samples.map((sample, index) => {
        const x = -0.5 + (index / (samples.length - 1)) * 1.0;
        const h = 0.028 + (sample.axial / 347) * 0.11;
        return (
          <mesh key={index} position={[x, 0.12 + h / 2, -0.22]}>
            <boxGeometry args={[0.014, h, 0.014]} />
            <meshStandardMaterial color="#d7eef4" emissive="#7eb0c0" emissiveIntensity={0.8} />
          </mesh>
        );
      })}
      <mesh ref={cursor} position={[0, 0.24, -0.22]}>
        <boxGeometry args={[0.018, 0.26, 0.018]} />
        <meshBasicMaterial color="#141618" />
      </mesh>
    </group>
  );
}
