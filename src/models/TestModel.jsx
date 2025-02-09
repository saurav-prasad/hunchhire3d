import React, { useEffect, useRef } from "react";
import untitled from "../assets/3d/untitled.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

function TestModel({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(untitled);
  const { actions } = useAnimations(animations, group);
  // useEffect(() => {
  //   console.log(actions);
  //   actions["KeyAction.006"].reset().play();
  //   actions["KeyAction.006"].timeScale = 0.16; // Slows down to 50% speed
  //   return () => actions["KeyAction.006"].stop();
  // }, []);

  return (
    <group ref={group} {...props} dispose={null}>
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

export default TestModel;
