"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { brand } from "@/config/brand";
import type { PartId } from "@/data/content";
import { SEPARATION } from "@/components/3d/geometry";
import type { ImplantRefs } from "@/components/3d/ProceduralImplant";

const names: Record<PartId, string[]> = {
  crown: ["crown"],
  sensor: ["sensor", "sensorlayer"],
  abutment: ["abutment", "smartabutment"],
  implant: ["implant", "implantfixture", "fixture"],
  bone: ["bone", "jaw"],
};

export function GltfImplant({ explode, hover }: ImplantRefs) {
  const { scene } = useGLTF(brand.assets.implantModelPath);
  const root = useMemo(() => scene.clone(true), [scene]);
  const parts = useMemo(() => {
    const found = new Map<PartId, THREE.Object3D>();
    root.traverse((object) => {
      const key = object.name.toLowerCase().replace(/[\s_-]/g, "");
      (Object.keys(names) as PartId[]).forEach((id) => {
        if (names[id].some((name) => key.includes(name)) && !found.has(id)) {
          found.set(id, object);
        }
      });
    });
    return found;
  }, [root]);
  const base = useRef<Partial<Record<PartId, number>>>({});

  useLayoutEffect(() => {
    parts.forEach((object, id) => {
      base.current[id] = object.position.y;
    });
  }, [parts]);

  useFrame((_, delta) => {
    const amount = explode.current ?? 0;
    parts.forEach((object, id) => {
      const origin = base.current[id] ?? 0;
      const extra = hover.current === id ? 0.08 : 0;
      const target = origin + SEPARATION[id] * amount + extra;
      object.position.y = THREE.MathUtils.damp(object.position.y, target, 4, delta);
    });
  });

  return <primitive object={root} />;
}
