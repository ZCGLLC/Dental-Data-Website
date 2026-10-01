"use client";

import { ContactShadows, Environment, Lightformer } from "@react-three/drei";

export function Studio({ quality = "high" }: { quality?: "high" | "low" }) {
  return (
    <>
      <hemisphereLight args={["#f4f1ea", "#30343c", 0.85]} />
      <ambientLight intensity={0.35} />
      <directionalLight position={[3.2, 4.5, 4]} intensity={2.4} color="#fff8f2" />
      <directionalLight position={[-4.2, 2, 3]} intensity={1.1} color="#d5e2ec" />
      <directionalLight position={[0.5, 1.2, -4.5]} intensity={1.6} color="#ffffff" />
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
      {quality === "high" ? (
        <ContactShadows
          position={[0, -1.35, 0]}
          opacity={0.35}
          scale={6}
          blur={2.2}
          far={3}
          color="#000000"
        />
      ) : null}
    </>
  );
}
