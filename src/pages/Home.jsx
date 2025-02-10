import { Canvas } from "@react-three/fiber";
import React, { Suspense, useState } from "react";
import Options from "../components/Options";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useDeviceType from "../hooks/useDeviceType";
import Loader from "../components/Loader";
import Happy from "../models/Happy";
import Sky from "../models/Sky";
import Hello from "../models/Hello";
import Amaze from "../models/Amaze";
import Sad from "../models/Sad";
import Idle from "../models/Idle";

function Home() {
  // use state
  const [currAction, setCurrAction] = useState("idle");
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);
  // custom hooks
  const isMobile = useDeviceType();
  const { height, width } = useWindowDimensions();

  // function to adjust field of view of canvas
  const adjustForScreenSize = () => {
    let fov = null;

    if (width > 768) {
      fov = 85;
    } else {
      fov = 50;
    }

    return [fov];
  };

  const [fov] = adjustForScreenSize();

  // function to get scene position
  const getScenePosition = () => {
    return isMobile ? [0, -1, 0] : [0, -2.9, 0];
  };
  // function to get scene rotation
  const getSceneRotation = () => {
    return [12.629, 0, 0];
  };
  // function to get scene scale
  const getSceneScale = () => {
    return isMobile ? [1.25, 1.25, 1.25] : [3, 3, 3];
  };

  return (
    <div style={{ height: height }} className="flex flex-col h-full">
      {/* 3d elements */}
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
            <ambientLight intensity={9} />
            <pointLight position={[5, 10, 2]} intensity={2} />
            <spotLight
              position={[2, 5, 10]}
              angle={0.15}
              penumbra={1}
              intensity={2}
            />
            {currAction === "hello" && (
              <>
                <Hello
                  isPlayingMusic={isPlayingMusic}
                  position={isMobile ? [0, -1, 0] : [0, -2.5, 0]}
                  rotation={[12.629, 0.1, 0]}
                  scale={isMobile ? [1.25, 1.25, 1.25] : [2.5, 2.5, 2.5]}
                />
              </>
            )}
            {currAction === "sad" && (
              <Sad
                position={getScenePosition()}
                rotation={getSceneRotation()}
                scale={getSceneScale()}
              />
            )}
            {currAction === "amaze" && (
              <Amaze
                position={getScenePosition()}
                rotation={getSceneRotation()}
                scale={getSceneScale()}
              />
            )}
            {currAction === "happy" && (
              <Happy
                position={getScenePosition()}
                rotation={getSceneRotation()}
                scale={getSceneScale()}
              />
            )}
            {currAction === "idle" && (
              <Idle
                position={getScenePosition()}
                rotation={getSceneRotation()}
                scale={getSceneScale()}
              />
            )}
            <Sky />
          </Suspense>
        </Canvas>
      </div>
      {/* options - expression buttons */}
      <div>
        <Options
          setIsPlayingMusic={setIsPlayingMusic}
          setCurrAction={setCurrAction}
        />
      </div>
    </div>
  );
}

export default Home;
