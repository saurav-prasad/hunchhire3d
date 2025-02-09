import React, { useRef, useEffect } from "react";
import { useGLTF } from "@react-three/drei";
import first from "../assets/3d/untitled.glb";

function TestModel(props) {
  const { nodes } = useGLTF(first);
  const meshRef = useRef();

  return (
    <group {...props} dispose={null}>
      <mesh
        ref={meshRef}
        castShadow
        receiveShadow
        geometry={nodes.tmp95h7wx6vply.geometry}
        material={nodes.tmp95h7wx6vply.material}
      />
    </group>
  );
}

export default TestModel;
