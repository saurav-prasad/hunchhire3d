import { useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import skyScene from "../assets/3d/sky.glb";
import { useFrame, useThree } from "@react-three/fiber";

function Sky({ isRotating }) {
  const skyRef = useRef();
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const { scene, animations } = useGLTF(skyScene);
  const { gl, viewport } = useThree();

  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      skyRef.current.rotation.y += delta * 0.002 * Math.PI;
      lastX.current = clientX;
      rotationSpeed.current = delta * 0.01 * Math.PI;
    }
  };

  useFrame((_, delta) => {
    skyRef.current.rotation.y -= 0.032 * delta;
    // if (isRotating) {
    //   if (rotationSpeed.current >= 0) {
    //     skyRef.current.rotation.y += 0.29 * delta;
    //   } else {
    //     skyRef.current.rotation.y -= 0.34 * delta;
    //   }
    // }
  });

  useEffect(() => {
    const canvas = gl.domElement;
    canvas.addEventListener("pointerdown", handlePointerDown);
    canvas.addEventListener("pointermove", handlePointerMove);
    return () => {
      canvas.removeEventListener("pointerdown", handlePointerDown);
      canvas.removeEventListener("pointermove", handlePointerMove);
    };
  }, [gl, handlePointerDown, handlePointerMove]);

  return (
    <>
      <mesh>
        <primitive object={scene} ref={skyRef} />
      </mesh>
    </>
  );
}

export default Sky;
