import React, { useEffect, useRef } from "react";
import happyModel from "../assets/3d/happy.glb";
import { useAnimations, useGLTF } from "@react-three/drei";
import useDeviceType from "../hooks/useDeviceType";

function Happy({ isRotating,setIsRotating, ...props }) {
  const groupRef = useRef();
  const { nodes, materials, animations } = useGLTF(happyModel);
  const { actions } = useAnimations(animations, groupRef);
  const lastX = useRef(0);
  const rotationSpeed = useRef(0);
  const isMobile = useDeviceType();

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
        islandRef.current.rotation.y += delta * 0.0035 * Math.PI;
      } else {
        islandRef.current.rotation.y += delta * 0.01 * Math.PI;
      }
      lastX.current = clientX;
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      if (!isRotating) setIsRotating(true);
      islandRef.current.rotation.y += 0.009 * Math.PI;
      rotationSpeed.current = 0.0125;
    } else {
      if (e.key === "ArrowRight") {
        if (!isRotating) setIsRotating(true);
        islandRef.current.rotation.y -= 0.009 * Math.PI;
        rotationSpeed.current = -0.0125;
      }
    }
  };

  const handleKeyUp = (e) => {
    setIsRotating(false);
  };
  return (
    <group ref={groupRef} {...props} dispose={null}>
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
    </group>
  );
}

export default Happy;
