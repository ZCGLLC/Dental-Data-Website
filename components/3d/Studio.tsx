"use client";

import { Environment, Lightformer } from "@react-three/drei";

export function Studio({ quality = "high" }: { quality?: "high" | "low" }) {
  return (
    <>
      <hemisphereLight args={["#ffffff", "#c5ccd4", 0.72]} />
      <ambientLight intensity={0.22} />
      <directionalLight position={[3.2, 4.5, 4]} intensity={2.1} color="#fffaf4" />
      <directionalLight position={[-4.2, 2, 3]} intensity={0.85} color="#d5e4ee" />
      <directionalLight position={[0.5, 1.2, -4.5]} intensity={1.35} color="#ffffff" />
      {quality === "high" ? (
        <Environment frames={1} resolution={128} environmentIntensity={0.42}>
          <Lightformer
            form="rect"
            intensity={2.4}
            position={[0, 4, 2]}
            scale={[8, 3, 1]}
            color="#f7f4ee"
          />
          <Lightformer
            form="rect"
            intensity={1.1}
            position={[-4, 1, 2]}
            scale={[3, 5, 1]}
            color="#d5e6f0"
          />
          <Lightformer
            form="rect"
            intensity={1.6}
            position={[3, 1.5, -4]}
            scale={[4, 3, 1]}
            color="#ffffff"
          />
        </Environment>
      ) : null}
    </>
  );
}
