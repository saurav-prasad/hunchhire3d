import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef, useState } from "react";
import skyScene from "../assets/3d/sky.glb";
import { useFrame, useThree } from "@react-three/fiber";

function Sky({}) {
  // refs
  const skyRef = useRef();
  // three
  const { scene } = useGLTF(skyScene);
  // logic for rotatiting the sky
  useFrame((_, delta) => {
    skyRef.current.rotation.y -= 0.06 * delta;
  });

  return (
    <>
      <mesh>
        <primitive object={scene} ref={skyRef} />
      </mesh>
    </>
  );
}

export default Sky;
