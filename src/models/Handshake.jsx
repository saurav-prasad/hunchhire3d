import React, { useEffect, useRef } from "react";
import handshakeModel from "../assets/3d/handshake.glb";
import { useAnimations, useGLTF } from "@react-three/drei";

function Handshake({ currAction, ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(handshakeModel);
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    console.log(actions)
    if (currAction && actions[currAction]) {
      actions[currAction].play();
      console.log("Playing action:", currAction);
    }

    return () => {
      if (currAction && actions[currAction]) {
        actions[currAction].stop()
      }
    };
  }, [currAction]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={1.721}
        >
          <group
            name="badcdabd7def41678c55c15b7508f162fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Character1" />
                <group
                  name="Armature"
                  position={[0, 105.777, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={16.465}
                >
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Character}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group name="Object_8" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}
export default Handshake;
