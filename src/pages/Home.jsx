import { Canvas } from "@react-three/fiber";
import React, { Suspense, useEffect, useRef, useState } from "react";
import Happy from "../models/Happy";
import Options from "../components/Options";
import useWindowDimensions from "../hooks/useWindowDimensions";
import useDeviceType from "../hooks/useDeviceType";
import Sky from "../models/Sky";
import Loader from "../components/Loader";
import mp4 from "../assets/video/Untitled.mp4";
import TestModel from "../models/TestModel";
import Amaze from "../models/Amaze";
import Sad from "../models/Sad";
import Idle from "../models/Idle";
import { Html } from "@react-three/drei";

function Home() {
  const { height, width } = useWindowDimensions();
  const isMobile = useDeviceType();
  const [currAction, setCurrAction] = useState("idle");
  const [isRotating, setIsRotating] = useState(true);
  const [ifVideoEnded, setIfVideoEnded] = useState(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState(true);

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
  const videoRef = useRef(null);

  useEffect(() => {
    const playVideo = () => {
      if (videoRef.current) {
        videoRef.current
          .play()
          .catch((error) => console.log("Autoplay blocked:", error));
      }
    };

    document.addEventListener("click", playVideo, { once: true });
    return () => document.removeEventListener("click", playVideo);
  }, []);

  const onVideoEnded = () => {
    console.log("object");
    setIfVideoEnded(true);
  };
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
                <TestModel
                  isPlayingMusic={isPlayingMusic}
                  position={isMobile ? [0, -1, 0] : [0, -2.5, 0]}
                  rotation={[12.629, 0.1, 0]}
                  scale={isMobile ? [1.25, 1.25, 1.25] : [2.5, 2.5, 2.5]}
                />
              </>
            )}
            {currAction === "sad" && (
              <Sad
                position={isMobile ? [0, -1, 0] : [0, -2.9, 0]}
                rotation={[12.629, 0, 0]}
                scale={isMobile ? [1.25, 1.25, 1.25] : [3, 3, 3]}
              />
            )}
            {currAction === "amaze" && (
              <Amaze
                position={isMobile ? [0, -1, 0] : [0, -2.9, 0]}
                rotation={[12.629, 0, 0]}
                scale={isMobile ? [1.25, 1.25, 1.25] : [3, 3, 3]}
              />
            )}
            {currAction === "happy" && (
              <Happy
                position={isMobile ? [0, -1, 0] : [0, -2.9, 0]}
                rotation={[12.629, 0, 0]}
                scale={isMobile ? [1.25, 1.25, 1.25] : [3, 3, 3]}
              />
            )}
            {currAction === "idle" && (
              <Idle
                position={isMobile ? [0, -1, 0] : [0, -2.9, 0]}
                rotation={[12.629, 0, 0]}
                scale={isMobile ? [1.25, 1.25, 1.25] : [3, 3, 3]}
              />
            )}
            {/* {currAction === "speak" && (
              <Html>
                <video
                  className={`absolute top-[15%] lg:left-[40%] md:left-[30%] sm:left-[15%] left-[10%]`}
                  ref={videoRef}
                  onEnded={onVideoEnded}
                  autoPlay
                  width={isMobile ? "320" : "420"}
                  height={isMobile ? "240" : "340"}
                >
                  <source src={mp4} type="video/mp4" />
                </video>
              </Html>
            )} */}
            {/* <TestModel
              position={isMobile ? [0, -1.7, 0] : [0, -2.9, 0]}
              rotation={[12.629, 0, 0]}
              scale={isMobile ? [1, 1, 1] : [3, 3, 3]}
            /> */}
            {/* {currAction !== "happy" &&
              currAction !== "running" &&
              ifVideoEnded && (
                <Handshake
                  position={isMobile ? [0, -1.7, 0] : [0, -2.9, 0]}
                  rotation={[12.629, 0, 0]}
                  scale={isMobile ? [1, 1, 1] : [1.7, 1.7, 1.7]}
                  currAction={currAction}
                />
              )}
            {currAction === "running" && ifVideoEnded && (
              <Running
                position={isMobile ? [0, -1.7, 0] : [0, -2.8, 0]}
                rotation={[0, 0, 0]}
                scale={isMobile ? [0.12, 0.12, 0.12] : [0.21, 0.21, 0.21]}
              />
            )}
            {currAction === "happy" && ifVideoEnded && (
              <Happy
                position={isMobile ? [0, -2, 0] : [0, -3, 0]}
                rotation={[0, 0, 0]}
                scale={isMobile ? [0.7, 0.7, 0.7] : [1, 1, 1]}
                isRotating={isRotating}
                setIsRotating={setIsRotating}
              />
            )} */}
            <Sky />
          </Suspense>
        </Canvas>
      </div>
      {currAction === "speak" && (
        <video
          className={`absolute top-[15%] lg:left-[40%] md:left-[30%] sm:left-[15%] left-[10%]`}
          ref={videoRef}
          onEnded={onVideoEnded}
          autoPlay
          width={isMobile ? "320" : "420"}
          height={isMobile ? "240" : "340"}
        >
          <source src={mp4} type="video/mp4" />
        </video>
      )}

      {/* options */}
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
