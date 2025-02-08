import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useState } from "react";
import Happy from "../models/Happy";
import Running from "../models/Running";
import Handshake from "../models/Handshake";
import Options from "../components/Options";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useDeviceType from "../hooks/useDeviceType";
import Sky from "../models/Sky";
import Loader from "../components/Loader";

function Home() {
  const { height, width } = useWindowDimensions();
  const isMobile = useDeviceType();
  const [currAction, setCurrAction] = useState("happy");
  const [isRotating, setIsRotating] = useState(false);

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
    <div style={{ height: height }} className="flex flex-col h-full">
      <div className="flex-1">
        <Canvas
          camera={{
            position: [0, 0, 5],
            fov: fov,
            near: 0.1,
            far: 1000,
          }}
        >
          <Suspense fallback={<Loader />}>
            <directionalLight position={[0, 0, 1]} intensity={2.5} />
            <ambientLight intensity={1} />
            <pointLight position={[5, 10, 0]} intensity={2} />
            <spotLight
              position={[10, 10, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            {/* <Loader /> */}
            {currAction !== "happy" && currAction !== "running" && (
              <Handshake
                position={isMobile ? [0, -1.7, 0] : [0, -2.9, 0]}
                rotation={[12.629, 0, 0]}
                scale={isMobile ? [1, 1, 1] : [1.7, 1.7, 1.7]}
                currAction={currAction}
              />
            )}
            {currAction === "running" && (
              <Running
                position={isMobile ? [0, -1.7, 0] : [0, -2.8, 0]}
                rotation={[0, 0, 0]}
                scale={isMobile ? [0.12, 0.12, 0.12] : [0.21, 0.21, 0.21]}
              />
            )}
            {currAction === "happy" && (
              <Happy
                position={isMobile ? [0, -2, 0] : [0, -3, 0]}
                rotation={[0, 0, 0]}
                scale={isMobile ? [0.7, 0.7, 0.7] : [1, 1, 1]}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
              />
            )}
            <Sky />
          </Suspense>
        </Canvas>
      </div>
      {/* options */}
      <div>
        <Options setCurrAction={setCurrAction} />
      </div>
    </div>
  );
}

export default Home;
