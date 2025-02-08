import React, { useEffect, useRef } from "react";
import happyScene from "../assets/3d/happy.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

function Happy({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(happyScene);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions)
    actions["Walk"].play()
  }, [])
  
  return (
    <group ref={group} {...props} dispose={null}>
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
