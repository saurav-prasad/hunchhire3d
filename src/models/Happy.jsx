import React, { useEffect, useRef, useState } from "react";
import happyModel from "../assets/3d/happy.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import useDeviceType from "../hooks/useDeviceType";
import { a } from "@react-spring/three";
import { useFrame, useThree } from "@react-three/fiber";

function Happy({ ...props }) {
  const groupRef = useRef();
  const { nodes, materials, animations } = useGLTF(happyModel);
  const { actions } = useAnimations(animations, groupRef);
  const lastX = useRef(0);
  const [isRotating, setIsRotating] = useState(false);
  const rotationSpeed = useRef(0);
  const isMobile = useDeviceType();
  const { gl, viewport } = useThree();

  useEffect(() => {
    if (actions["Walk"]) {
      console.log(actions);
      actions["Walk"].play();
    }

    return () => {
      if (actions["Walk"]) {
        actions["Walk"].stop();
      }
    };
  }, []);

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
      rotationSpeed.current = delta * 0.01 * Math.PI;
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
    <a.group ref={groupRef} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="d99cf671b39a4422989b3a73b878e553fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_6"
                    geometry={nodes.Object_6.geometry}
                    material={materials.lambert1}
                    skeleton={nodes.Object_6.skeleton}
                  />
                  <group name="polySurface19" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </a.group>
  );
}

export default Happy;
