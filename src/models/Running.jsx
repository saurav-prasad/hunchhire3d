import { useAnimations, useGLTF } from "@react-three/drei";
import React, { useEffect, useRef } from "react";
import runningModel from "../assets/3d/running.glb";

function Running({ ...props }) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(runningModel);
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    if (actions["running"]) {
      actions["running"].play();
    }

    return () => {
      if (actions["running"]) {
        actions["running"].stop();
      }
    };
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Runningfbx" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={
                      materials[
                        "phong6SG_df8a541a-216d-432e-beef-5d0874ebff21_43a9dfb9-139e-46c5-bb87-6bccb67af505mat"
                      ]
                    }
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={
                      materials[
                        "aiStandard9SG_63f60146-4689-4dad-ab51-90f9ede0ef36_a7b62beb-3744-4442-bb66-13cdc1a70acemat"
                      ]
                    }
                    skeleton={nodes.Object_8.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={
                      materials[
                        "phong1SG_40973dca-0b6f-46be-ba38-f08d57a76fb0_defc625f-232b-4d3c-9083-7b80fa93462cmat"
                      ]
                    }
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <skinnedMesh
                    name="Object_10"
                    geometry={nodes.Object_10.geometry}
                    material={
                      materials[
                        "phong2SG_04b234ee-9655-42ab-88d5-3109f30888a0_227bac7f-7f0f-4fcb-a50d-c8b56e7520c6mat"
                      ]
                    }
                    skeleton={nodes.Object_10.skeleton}
                  />
                  <skinnedMesh
                    name="Object_11"
                    geometry={nodes.Object_11.geometry}
                    material={
                      materials[
                        "phong5SG_12ba700d-91fe-4456-bc1c-0529702d2637_e02006b6-c643-4aec-b109-e850e122a0e0mat"
                      ]
                    }
                    skeleton={nodes.Object_11.skeleton}
                  />
                  <skinnedMesh
                    name="Object_12"
                    geometry={nodes.Object_12.geometry}
                    material={
                      materials[
                        "phong4SG_a42aaf6a-b878-4bf3-afac-2309b3fd1f90_c0c60d36-2879-4113-b9e7-8b2e170fd00emat"
                      ]
                    }
                    skeleton={nodes.Object_12.skeleton}
                  />
                  <skinnedMesh
                    name="Object_13"
                    geometry={nodes.Object_13.geometry}
                    material={
                      materials[
                        "phong9SG_19f06370-123c-4fc6-8a8f-edcc11aab061_9ad6c826-9b73-4a5c-b942-e6bbc79dec57mat"
                      ]
                    }
                    skeleton={nodes.Object_13.skeleton}
                  />
                  <skinnedMesh
                    name="Object_14"
                    geometry={nodes.Object_14.geometry}
                    material={
                      materials[
                        "phong8SG_6e612905-dcef-4cf1-94ff-fb3f523fe846_f762e300-c88f-4c01-ada2-982870bc3b0emat"
                      ]
                    }
                    skeleton={nodes.Object_14.skeleton}
                  />
                  <skinnedMesh
                    name="Object_15"
                    geometry={nodes.Object_15.geometry}
                    material={
                      materials[
                        "phong3SG_2d558e99-b124-4fae-bd14-691feac5caad_145b29a8-8f73-45e6-bd99-76b9680320b9mat"
                      ]
                    }
                    skeleton={nodes.Object_15.skeleton}
                  />
                  <group name="Object_6" />
                  <group name="Buffer_Layer" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

export default Running;
