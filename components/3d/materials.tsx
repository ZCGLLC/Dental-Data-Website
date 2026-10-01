"use client";

import type { MeshPhysicalMaterial } from "three";

export function CeramicMaterial({ wire = false }: { wire?: boolean }) {
  if (wire) {
    return (
      <meshBasicMaterial color="#1d6478" wireframe transparent opacity={0.72} />
    );
  }
  return (
    <meshPhysicalMaterial
      color="#efe6da"
      metalness={0.04}
      roughness={0.32}
      clearcoat={0.35}
      clearcoatRoughness={0.4}
      ior={1.5}
    />
  );
}

export function TitaniumMaterial({
  wire = false,
  color = "#c5c9d0",
}: {
  wire?: boolean;
  color?: string;
}) {
  if (wire) {
    return (
      <meshBasicMaterial color="#1d6478" wireframe transparent opacity={0.5} />
    );
  }
  return (
    <meshPhysicalMaterial
      color={color}
      metalness={0.58}
      roughness={0.34}
      clearcoat={0.2}
      clearcoatRoughness={0.35}
    />
  );
}

export function SensorMaterial({
  wire = false,
  materialRef,
}: {
  wire?: boolean;
  materialRef?: React.Ref<MeshPhysicalMaterial>;
}) {
  if (wire) {
    return (
      <meshBasicMaterial color="#1d6478" wireframe transparent opacity={0.9} />
    );
  }
  return (
    <meshPhysicalMaterial
      ref={materialRef}
      color="#12171c"
      metalness={0.7}
      roughness={0.22}
      clearcoat={0.45}
      clearcoatRoughness={0.2}
      emissive="#1a4d63"
      emissiveIntensity={0.45}
    />
  );
}

export function BoneMaterial({ wire = false }: { wire?: boolean }) {
  if (wire) {
    return (
      <meshBasicMaterial color="#8d7f72" wireframe transparent opacity={0.45} />
    );
  }
  return <meshStandardMaterial color="#d4cbc2" roughness={0.86} metalness={0.02} />;
}
