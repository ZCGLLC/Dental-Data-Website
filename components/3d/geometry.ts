import * as THREE from "three";

function lathe(points: Array<[number, number]>, segments = 64) {
  return new THREE.LatheGeometry(
    points.map(([x, y]) => new THREE.Vector2(x, y)),
    segments,
  );
}

/** 1 unit ≈ 10 mm. Parts are authored in local space and stacked in ProceduralImplant. */

export const crownGeometry = lathe([
  [0.12, 0.48],
  [0.34, 0.46],
  [0.46, 0.34],
  [0.44, 0.16],
  [0.34, 0.04],
  [0.28, 0],
]);

export const abutmentGeometry = lathe([
  [0.11, 0],
  [0.16, 0.05],
  [0.11, 0.09],
  [0.17, 0.14],
  [0.21, 0.28],
  [0.27, 0.44],
  [0.25, 0.5],
]);

export const implantGeometry = lathe([
  [0.19, 0.02],
  [0.22, -0.02],
  [0.2, -0.1],
  [0.15, -0.18],
  [0.145, -0.9],
  [0.09, -1.04],
  [0.015, -1.12],
]);

function helixTube(radius: number, y0: number, y1: number, turns: number) {
  const points: THREE.Vector3[] = [];
  const steps = 160;
  for (let i = 0; i <= steps; i += 1) {
    const t = i / steps;
    const angle = t * Math.PI * 2 * turns;
    const y = y0 + (y1 - y0) * t;
    const r = radius * (1 - t * 0.06);
    points.push(new THREE.Vector3(Math.cos(angle) * r, y, Math.sin(angle) * r));
  }
  return new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 140, 0.016, 5, false);
}

export const threadGeometry = helixTube(0.158, -0.24, -0.88, 6);

export const STACK = {
  implant: 0,
  abutment: 0,
  sensor: 0.57,
  crown: 0.66,
  bone: -0.62,
} as const;

export const SEPARATION = {
  crown: 0.62,
  sensor: 0.32,
  abutment: 0.1,
  implant: -0.12,
  bone: -0.95,
} as const;
