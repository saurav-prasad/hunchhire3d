import { Canvas } from "@react-three/fiber";
import React from "react";
import Happy from "../models/Happy";

function Home() {
  const adjustFoxForScreenSize = () => {
    let fov = null;

    if (window.innerWidth > 768) {
      fov = 85;
    } else {
      fov = 50;
    }

    return [fov];
  };

  const [fov] = adjustFoxForScreenSize();
  return (
    <div className="h-full">
      <Canvas
        camera={{
          position: [0, 0, 5],
          fov: fov,
          near: 0.1,
          far: 1000,
        }}
      >
        <directionalLight position={[0, 0, 1]} intensity={2.5} />
        <ambientLight intensity={1} />
        <pointLight position={[5, 10, 0]} intensity={2} />
        <spotLight
          position={[10, 10, 10]}
          angle={0.15}
          penumbra={1}
          intensity={2}
        />
        <Happy
          position={[0.1, -3, 0]}
          rotation={[12.629, 0, 0]}
          scale={[1, 1, 1]}
        />
      </Canvas>
    </div>
  );
}

export default Home;
