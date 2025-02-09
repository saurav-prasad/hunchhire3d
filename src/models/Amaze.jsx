import React, { useEffect, useRef, useState } from "react";
import untitled from "../assets/3d/hello.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import { useFrame, useThree } from "@react-three/fiber";
import useDeviceType from "../hooks/useDeviceType";

function Amaze({ ...props }) {
  const groupRef = useRef();
  const { nodes, materials, animations } = useGLTF(untitled);
  const { actions } = useAnimations(animations, groupRef);
  useEffect(() => {
    console.log(actions);
    const action = actions["KeyAction.003"];
    if (actions["KeyAction.003"]) {
      actions["KeyAction.003"].reset().play();
      actions["KeyAction.003"].timeScale = 0.17; // Slows down to 50% speed
    }
    return () => {
      if (actions["KeyAction.003"]) {
        actions["KeyAction.003"].stop();
      }
    };
  }, []);

  const lastX = useRef(0);
  const [isRotating, setIsRotating] = useState(false);
  const rotationSpeed = useRef(0);
  const isMobile = useDeviceType();
  const { gl, viewport } = useThree();

  let dampingFactor = 0.955;
  if (isMobile) {
    dampingFactor = 0.7;
  }
  const handlePointerDown = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(true);
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    lastX.current = clientX;
  };

  const handlePointerUP = (e) => {
    e.stopPropagation();
    e.preventDefault();
    setIsRotating(false);
  };

  const handlePointerMove = (e) => {
    e.stopPropagation();
    e.preventDefault();
    if (isRotating) {
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const delta = (clientX - lastX.current) / viewport.width;
      rotationSpeed.current = delta * 0.05 * Math.PI;
      if (isMobile) {
        groupRef.current.rotation.y += delta * 0.0035 * Math.PI;
      } else {
        groupRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      lastX.current = clientX;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      groupRef.current.rotation.y += 0.009 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else {
      if (e.key === "ArrowRight") {
        if (!isRotating) setIsRotating(true);
        groupRef.current.rotation.y -= 0.009 * Math.PI;
        rotationSpeed.current = -0.0125;
      }
    }
  };

  const handleKeyUp = (e) => {
    setIsRotating(false);
  };
  useFrame(() => {
    if (!isRotating) {
      rotationSpeed.current *= dampingFactor;
      if (Math.abs(rotationSpeed.current) < 0.001) {
        rotationSpeed.current = 0;
      }
      groupRef.current.rotation.y += rotationSpeed.current;
    }
    const rotation = groupRef.current.rotation.y;
    const normalizedRotation =
      ((rotation % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI);
  });

  useEffect(() => {
    const canvas = gl.domElement;
    !isMobile && canvas.addEventListener("pointerdown", handlePointerDown);
    !isMobile && canvas.addEventListener("pointerup", handlePointerUP);
    !isMobile && canvas.addEventListener("pointermove", handlePointerMove);
    document.addEventListener("keydown", handleKeyDown);
    document.addEventListener("keyup", handleKeyUp);
    canvas.addEventListener("touchmove", handlePointerMove);
    canvas.addEventListener("touchstart", handlePointerDown);
    canvas.addEventListener("touchend", handleKeyUp);
    return () => {
      !isMobile && canvas.removeEventListener("pointerdown", handlePointerDown);
      !isMobile && canvas.removeEventListener("pointerup", handlePointerUP);
      !isMobile && canvas.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("keydown", handleKeyDown);
      document.removeEventListener("keyup", handleKeyUp);
      canvas.removeEventListener("touchmove", handlePointerMove);
      canvas.removeEventListener("touchstart", handleKeyDown);
      canvas.removeEventListener("touchend", handleKeyUp);
    };
  }, [gl, handlePointerDown, handlePointerMove, handlePointerUP]);

  return (
    <group ref={groupRef} {...props} dispose={null}>
      <group name="Scene">
        <group name="world">
          <mesh
            name="tmp95h7wx6vply"
            castShadow
            receiveShadow
            geometry={nodes.tmp95h7wx6vply.geometry}
            material={materials.Material_0}
            morphTargetDictionary={nodes.tmp95h7wx6vply.morphTargetDictionary}
            morphTargetInfluences={nodes.tmp95h7wx6vply.morphTargetInfluences}
            position={[0.033, 1.011, -0.253]}
          />
        </group>
      </group>
    </group>
  );
}

export default Amaze;
