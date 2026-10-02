"use client";

import { useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

function CoolCeramic() {
  return (
    <meshPhysicalMaterial
      color="#f4f7fb"
      metalness={0.05}
      roughness={0.28}
      clearcoat={0.45}
      clearcoatRoughness={0.32}
    />
  );
}

function Titanium() {
  return (
    <meshPhysicalMaterial color="#c5ced6" metalness={0.34} roughness={0.3} clearcoat={0.22} />
  );
}

function Silicon() {
  return <meshPhysicalMaterial color="#1a222c" metalness={0.42} roughness={0.3} />;
}

function Gold() {
  return <meshStandardMaterial color="#c6a36a" metalness={0.9} roughness={0.22} />;
}

function Membrane() {
  return (
    <meshStandardMaterial
      color="#2a4a5c"
      emissive="#1d6478"
      emissiveIntensity={0.65}
      metalness={0.25}
      roughness={0.38}
    />
  );
}

function Pocket() {
  return <meshStandardMaterial color="#24343e" roughness={0.58} metalness={0.18} />;
}

function BondWire({ a, b }: { a: [number, number, number]; b: [number, number, number] }) {
  const start = new THREE.Vector3(...a);
  const end = new THREE.Vector3(...b);
  const mid = start.clone().lerp(end, 0.5);
  const length = start.distanceTo(end);
  const quaternion = new THREE.Quaternion().setFromUnitVectors(
    new THREE.Vector3(0, 1, 0),
    end.clone().sub(start).normalize(),
  );

  return (
    <mesh position={mid} quaternion={quaternion}>
      <cylinderGeometry args={[0.008, 0.008, length, 6]} />
      <Gold />
    </mesh>
  );
}

export function MolarCrown() {
  const cusps: Array<[number, number, number]> = [
    [0.2, 0.28, 0.16],
    [-0.2, 0.28, 0.16],
    [0.18, 0.26, -0.17],
    [-0.18, 0.26, -0.16],
  ];

  return (
    <group scale={0.92}>
      <mesh scale={[1, 0.82, 1]}>
        <sphereGeometry args={[0.44, 40, 28]} />
        <CoolCeramic />
      </mesh>
      {cusps.map((position) => (
        <mesh key={position.join(",")} position={position}>
          <sphereGeometry args={[0.16, 20, 16]} />
          <CoolCeramic />
        </mesh>
      ))}
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.52, 0.03, 0.035]} />
        <meshStandardMaterial color="#d5dee8" roughness={0.45} />
      </mesh>
      <mesh position={[0, 0.34, 0]}>
        <boxGeometry args={[0.035, 0.03, 0.42]} />
        <meshStandardMaterial color="#d5dee8" roughness={0.45} />
      </mesh>
      <mesh position={[0, -0.3, 0]}>
        <cylinderGeometry args={[0.24, 0.18, 0.14, 28]} />
        <CoolCeramic />
      </mesh>
    </group>
  );
}

export function PremolarCrown() {
  return (
    <group scale={0.98}>
      <mesh scale={[0.7, 0.92, 1.05]}>
        <sphereGeometry args={[0.42, 36, 24]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[0.14, 0.3, 0]}>
        <sphereGeometry args={[0.16, 18, 14]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[-0.15, 0.28, 0]}>
        <sphereGeometry args={[0.15, 18, 14]} />
        <CoolCeramic />
      </mesh>
    </group>
  );
}

export function CrownSeat() {
  return (
    <group rotation={[1.05, 0.4, 0]} scale={1.12}>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.11, 18, 42]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[0, -0.12, 0]}>
        <sphereGeometry args={[0.3, 28, 18, 0, Math.PI * 2, 0, Math.PI * 0.55]} />
        <Pocket />
      </mesh>
      <mesh position={[0, 0.02, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.26, 0.014, 8, 36]} />
        <meshBasicMaterial color="#7eb6d4" />
      </mesh>
    </group>
  );
}

export function AbutmentBody() {
  return (
    <group scale={0.95}>
      <mesh position={[0, 0.02, 0]}>
        <cylinderGeometry args={[0.26, 0.17, 0.62, 36]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.38, 0]}>
        <cylinderGeometry args={[0.2, 0.26, 0.12, 36]} />
        <Titanium />
      </mesh>
      <mesh position={[0, -0.4, 0]}>
        <cylinderGeometry args={[0.09, 0.13, 0.18, 24]} />
        <Titanium />
      </mesh>
    </group>
  );
}

export function AbutmentPocket() {
  return (
    <group rotation={[0.65, 0.35, 0]} scale={0.98}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.26, 0.16, 0.5, 36]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.12, 36]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.22, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.14, 28]} />
        <Pocket />
      </mesh>
      <mesh position={[0, 0.31, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.012, 8, 36]} />
        <meshBasicMaterial color="#7eb6d4" />
      </mesh>
      <mesh position={[0, -0.42, 0]}>
        <cylinderGeometry args={[0.09, 0.12, 0.16, 24]} />
        <Titanium />
      </mesh>
    </group>
  );
}

function ScrewThreads({
  count,
  radiusAt,
}: {
  count: number;
  radiusAt: (index: number) => number;
}) {
  return (
    <>
      {Array.from({ length: count }, (_, index) => (
        <mesh key={index} position={[0, 0.28 - index * 0.11, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[radiusAt(index), 0.016, 8, 28]} />
          <Titanium />
        </mesh>
      ))}
    </>
  );
}

export function ParallelScrew() {
  return (
    <group scale={0.82}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.92, 28]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.2, 0.16, 0.12, 28]} />
        <Titanium />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.16, 0.16, 24]} />
        <Titanium />
      </mesh>
      <ScrewThreads count={7} radiusAt={() => 0.178} />
    </group>
  );
}

export function TaperedScrew() {
  return (
    <group scale={0.82}>
      <mesh position={[0, -0.08, 0]}>
        <cylinderGeometry args={[0.09, 0.2, 0.92, 28]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.46, 0]}>
        <cylinderGeometry args={[0.2, 0.18, 0.12, 28]} />
        <Titanium />
      </mesh>
      <mesh position={[0, -0.6, 0]}>
        <coneGeometry args={[0.09, 0.14, 24]} />
        <Titanium />
      </mesh>
      <ScrewThreads
        count={7}
        radiusAt={(index) => {
          const y = 0.28 - index * 0.11;
          return 0.102 + 0.11 * ((0.38 - y) / 0.92);
        }}
      />
    </group>
  );
}

export function BoneRidge() {
  return (
    <mesh rotation={[0.25, 0.4, Math.PI / 2]} scale={1.05}>
      <torusGeometry args={[0.46, 0.2, 18, 32, Math.PI * 1.2]} />
      <meshStandardMaterial color="#c5d0da" roughness={0.84} metalness={0.02} />
    </mesh>
  );
}

const diePads: Array<[number, number, number]> = [
  [-0.28, 0.05, 0.28],
  [0.28, 0.05, 0.28],
  [-0.28, 0.05, -0.28],
  [0.28, 0.05, -0.28],
];

export function MembraneDie() {
  return (
    <group rotation={[0.42, 0.55, 0]} scale={1.05}>
      <mesh>
        <boxGeometry args={[0.82, 0.07, 0.82]} />
        <Silicon />
      </mesh>
      <mesh position={[0, 0.05, 0]}>
        <cylinderGeometry args={[0.2, 0.2, 0.02, 36]} />
        <Membrane />
      </mesh>
      {[0, Math.PI / 3, (Math.PI * 2) / 3].map((rotation) => (
        <mesh key={rotation} position={[0, 0.064, 0]} rotation={[0, rotation, 0]}>
          <boxGeometry args={[0.24, 0.008, 0.02]} />
          <Gold />
        </mesh>
      ))}
      <mesh position={[0.24, 0.05, -0.22]}>
        <boxGeometry args={[0.09, 0.02, 0.09]} />
        <meshStandardMaterial color="#9ecae4" emissive="#5aa4c4" emissiveIntensity={0.45} />
      </mesh>
      {diePads.map((position) => (
        <mesh key={position.join(",")} position={position}>
          <boxGeometry args={[0.1, 0.02, 0.08]} />
          <Gold />
        </mesh>
      ))}
    </group>
  );
}

export function CoilBond() {
  return (
    <group rotation={[0.48, 0.62, 0]} scale={0.92}>
      <mesh position={[0, -0.04, 0]}>
        <boxGeometry args={[1.15, 0.05, 1.15]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[0, 0.04, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.4, 0.022, 10, 48]} />
        <Gold />
      </mesh>
      <mesh position={[0, 0.06, 0]}>
        <boxGeometry args={[0.4, 0.06, 0.4]} />
        <Silicon />
      </mesh>
      <mesh position={[0, 0.1, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.016, 28]} />
        <Membrane />
      </mesh>
      <BondWire a={[0.16, 0.09, 0.12]} b={[0.28, 0.06, 0.28]} />
      <BondWire a={[-0.16, 0.09, 0.1]} b={[-0.3, 0.06, 0.24]} />
      <BondWire a={[0.12, 0.09, -0.16]} b={[0.26, 0.06, -0.3]} />
    </group>
  );
}

export function LayerStack() {
  return (
    <group rotation={[0.55, 0.2, 0]} scale={0.9}>
      {[-0.22, 0.22].map((x) => (
        <mesh key={x} position={[x, 0, 0]}>
          <cylinderGeometry args={[0.005, 0.005, 1.15, 6]} />
          <meshBasicMaterial color="#7eb6d4" transparent opacity={0.45} />
        </mesh>
      ))}
      <mesh position={[0, -0.5, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.05, 36]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[0, -0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.018, 8, 40]} />
        <Gold />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[0.32, 0.05, 0.32]} />
        <Silicon />
      </mesh>
      <mesh position={[0, 0.035, 0]}>
        <cylinderGeometry args={[0.08, 0.08, 0.012, 24]} />
        <Membrane />
      </mesh>
      <mesh position={[0, 0.26, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.28, 0.04, 12, 40]} />
        <CoolCeramic />
      </mesh>
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.36, 0.36, 0.045, 36]} />
        <CoolCeramic />
      </mesh>
    </group>
  );
}

export function SealedPuck() {
  return (
    <group rotation={[0.5, 0.4, 0]} scale={1.15}>
      <mesh>
        <cylinderGeometry args={[0.34, 0.34, 0.12, 40]} />
        <CoolCeramic />
      </mesh>
      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.34, 0.012, 8, 40]} />
        <Gold />
      </mesh>
      <mesh position={[0, 0.07, 0]}>
        <cylinderGeometry args={[0.1, 0.1, 0.012, 28]} />
        <Membrane />
      </mesh>
    </group>
  );
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const span = edge1 - edge0 || 1;
  const t = THREE.MathUtils.clamp((value - edge0) / span, 0, 1);
  return t * t * (3 - 2 * t);
}

export function InsertionAssembly({ time }: { time: React.RefObject<number> }) {
  const puck = useRef<THREE.Group>(null);
  const crown = useRef<THREE.Group>(null);
  const ring = useRef<THREE.Mesh>(null);

  useFrame(() => {
    const t = time.current ?? 0.08;
    const seat = smoothstep(0.05, 0.22, t);
    const close = smoothstep(0.26, 0.4, t);
    const reset = smoothstep(0.9, 1, t);
    const puckY = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.66, 0.32, seat), 0.66, reset);
    const crownY = THREE.MathUtils.lerp(THREE.MathUtils.lerp(0.92, 0.12, close), 0.92, reset);
    if (puck.current) puck.current.position.y = puckY;
    if (crown.current) crown.current.position.y = crownY;
    if (ring.current) ring.current.scale.setScalar(1 + seat * (1 - close) * 0.12);
  });

  return (
    <group position={[0, 0.2, 0]} scale={0.8}>
      <mesh position={[0, -0.72, 0]}>
        <cylinderGeometry args={[0.16, 0.16, 0.48, 24]} />
        <Titanium />
      </mesh>
      {[0, 1, 2].map((index) => (
        <mesh key={index} position={[0, -0.56 - index * 0.12, 0]} rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.178, 0.014, 6, 24]} />
          <Titanium />
        </mesh>
      ))}
      <mesh position={[0, -0.02, 0]}>
        <cylinderGeometry args={[0.26, 0.17, 0.52, 32]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.28, 0]}>
        <cylinderGeometry args={[0.32, 0.28, 0.1, 32]} />
        <Titanium />
      </mesh>
      <mesh position={[0, 0.24, 0]}>
        <cylinderGeometry args={[0.15, 0.15, 0.12, 28]} />
        <Pocket />
      </mesh>
      <mesh position={[0, 0.62, 0]}>
        <cylinderGeometry args={[0.004, 0.004, 0.7, 6]} />
        <meshBasicMaterial color="#7eb6d4" transparent opacity={0.4} />
      </mesh>
      <mesh ref={ring} position={[0, 0.35, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.2, 0.012, 8, 36]} />
        <meshBasicMaterial color="#5aa4c4" />
      </mesh>
      <group ref={puck}>
        <mesh>
          <cylinderGeometry args={[0.18, 0.18, 0.12, 32]} />
          <meshPhysicalMaterial color="#d5e4f0" metalness={0.08} roughness={0.32} clearcoat={0.35} />
        </mesh>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[0.18, 0.016, 8, 32]} />
          <Gold />
        </mesh>
        <mesh position={[0, 0.065, 0]}>
          <cylinderGeometry args={[0.07, 0.07, 0.016, 24]} />
          <Membrane />
        </mesh>
      </group>
      <group ref={crown}>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.32, 0.36, 0.08, 32]} />
          <CoolCeramic />
        </mesh>
        <mesh position={[0, 0.22, 0]} scale={[1, 0.78, 1]}>
          <sphereGeometry args={[0.26, 28, 18]} />
          <CoolCeramic />
        </mesh>
        <mesh position={[0.12, 0.36, 0.08]}>
          <sphereGeometry args={[0.09, 14, 12]} />
          <CoolCeramic />
        </mesh>
        <mesh position={[-0.12, 0.34, 0.08]}>
          <sphereGeometry args={[0.08, 14, 12]} />
          <CoolCeramic />
        </mesh>
        <mesh position={[0, 0.34, -0.1]}>
          <sphereGeometry args={[0.08, 14, 12]} />
          <CoolCeramic />
        </mesh>
      </group>
    </group>
  );
}
