
import * as THREE from "three";
import React, { useRef, useEffect, useMemo, forwardRef} from "react";
import { useGLTF, useAnimations,  } from "@react-three/drei";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useFrame, } from "@react-three/fiber";






export default function Planet(props: JSX.IntrinsicElements["group"]) {
  let time = null;
  const xRotationAxies = new THREE.Vector3(1, 0, 0);
  const quaternionRotation = useMemo(() => new THREE.Quaternion(), []);
  const planetRef = useRef<RapierRigidBody>();
  const group = useRef<THREE.Group>();
  const { nodes, materials, animations } = useGLTF('/planet.glb') as GLTF & {
    nodes: any;
    materials: any;
    animations: any;
  };
  const { actions } = useAnimations(animations, group);
  useEffect(() => {
    Object.keys(actions).forEach((key) => {
   actions[key].play();
   });
   }, []);

   useFrame((state) => {
    time = state.clock.elapsedTime;

  
    planetRef.current?.setRotation(
      quaternionRotation.setFromAxisAngle(xRotationAxies, time * 0.15), true
    );

    
  });

  return (

    <group ref={group} {...props} dispose={null} >
      <group name="Scene">
        <group
          name="Sketchfab_model"
          position={[-0.386, 2.905, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.361}
        >
          <group
            name="ceaa8a65d6ac45c19fc4c13b0d5d1ac1fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="grp_Planet_ALL" position={[0, 8.895, 0]}>
                  <group
                    name="grp_Rotate_Meteor"
                    rotation={[0, 0, 0.873]}
                    scale={[1.223, 1.1, 1.223]}
                  >
                    <group name="Meteor" position={[46.086, -1.081, -7.789]}>
                      <mesh
                        name="Meteor_Meteor_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Meteor_Meteor_MAT_0.geometry}
                        material={materials.Meteor_MAT}
                      />
                    </group>
                  </group>
                  <group
                    name="grp_Rotate_Planet"
                    position={[0, 0, 0.069]}
                    rotation={[0, 0, 0.698]}
                  >
                    <group
                      name="Cone_Autumn"
                      position={[28.629, -4.704, -10.655]}
                    >
                      <mesh
                        name="Cone_Autumn_Cones_Autumn_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cone_Autumn_Cones_Autumn_MAT_0.geometry}
                        material={materials.Cones_Autumn_MAT}
                      />
                    </group>
                    <group
                      name="Cone_Spring"
                      position={[14.436, -26.735, 10.592]}
                    >
                      <mesh
                        name="Cone_Spring_Cone_Spring_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cone_Spring_Cone_Spring_MAT_0.geometry}
                        material={materials.Cone_Spring_MAT}
                      />
                    </group>
                    <group
                      name="Cone_Winter"
                      position={[2.881, 25.746, 21.886]}
                    >
                      <mesh
                        name="Cone_Winter_Cones_Winter_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cone_Winter_Cones_Winter_MAT_0.geometry}
                        material={materials.Cones_Winter_MAT}
                      />
                    </group>
                    <group
                      name="Cube_Spring"
                      position={[15.733, -25.357, 3.043]}
                    >
                      <mesh
                        name="Cube_Spring_Cubes_Spring_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Cube_Spring_Cubes_Spring_MAT_0.geometry}
                        material={materials.Cubes_Spring_MAT}
                      />
                    </group>
                    <group
                      name="Grass_Autumn"
                      position={[27.477, -4.224, -9.341]}
                    >
                      <mesh
                        name="Grass_Autumn_Grass_Autumn_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Grass_Autumn_Grass_Autumn_MAT_0.geometry
                        }
                        material={materials.Grass_Autumn_MAT}
                      />
                    </group>
                    <group
                      name="Grass_Spring"
                      position={[8.822, -25.115, -0.031]}
                    >
                      <mesh
                        name="Grass_Spring_Grass_Spring_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Grass_Spring_Grass_Spring_MAT_0.geometry
                        }
                        material={materials.Grass_Spring_MAT}
                      />
                    </group>
                    <group
                      name="Grass_Summer"
                      position={[-21.435, 2.653, -17.794]}
                    >
                      <mesh
                        name="Grass_Summer_Grass_Summer_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Grass_Summer_Grass_Summer_MAT_0.geometry
                        }
                        material={materials.Grass_Summer_MAT}
                      />
                    </group>
                    <group
                      name="Grass_Winter"
                      position={[-1.883, 18.393, 19.397]}
                    >
                      <mesh
                        name="Grass_Winter_Grass_Winter_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Grass_Winter_Grass_Winter_MAT_0.geometry
                        }
                        material={materials.Grass_Winter_MAT}
                      />
                    </group>
                    <group name="Palm_All" position={[-14.647, 5.024, -3.531]}>
                      <mesh
                        name="Palm_All_Palm_ALL_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Palm_All_Palm_ALL_MAT_0.geometry}
                        material={materials.Palm_ALL_MAT}
                      />
                    </group>
                    <group name="Planet" position={[-1.003, 2.03, 0]}>
                      <mesh
                        name="Planet_Planet_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Planet_Planet_MAT_0.geometry}
                        material={materials.Planet_MAT}
                      />
                    </group>
                    <group
                      name="Platonic_Autumn"
                      position={[31.318, -5.181, -12.468]}
                    >
                      <mesh
                        name="Platonic_Autumn_Platonic_Autumn_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Platonic_Autumn_Platonic_Autumn_MAT_0.geometry
                        }
                        material={materials.Platonic_Autumn_MAT}
                      />
                    </group>
                    <group
                      name="Platonic_Summer"
                      position={[-23.544, 5.008, -17.075]}
                    >
                      <mesh
                        name="Platonic_Summer_Platonic_Summer_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Platonic_Summer_Platonic_Summer_MAT_0.geometry
                        }
                        material={materials.Platonic_Summer_MAT}
                      />
                    </group>
                    <group name="Rock_1" position={[-0.78, -1.209, -0.974]}>
                      <mesh
                        name="Rock_1_Rocks1_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rock_1_Rocks1_MAT_0.geometry}
                        material={materials.Rocks1_MAT}
                      />
                    </group>
                    <group name="Rock_2" position={[2.716, 2.347, -1.935]}>
                      <mesh
                        name="Rock_2_Rocks2_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rock_2_Rocks2_MAT_0.geometry}
                        material={materials.Rocks2_MAT}
                      />
                    </group>
                    <group name="Rock_3" position={[0.217, -0.758, -3.128]}>
                      <mesh
                        name="Rock_3_Rocks3_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Rock_3_Rocks3_MAT_0.geometry}
                        material={materials.Rocks3_MAT}
                      />
                    </group>
                    <group name="Rock_Winter1" position={[-0.97, 17.1, 16.8]}>
                      <mesh
                        name="Rock_Winter1_Rocks1_Winter_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Rock_Winter1_Rocks1_Winter_MAT_0.geometry
                        }
                        material={materials.Rocks1_Winter_MAT}
                      />
                    </group>
                    <group
                      name="Rock_Winter2"
                      position={[15.556, 19.353, 14.252]}
                    >
                      <mesh
                        name="Rock_Winter2_Rocks2_Winter_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Rock_Winter2_Rocks2_Winter_MAT_0.geometry
                        }
                        material={materials.Rocks2_Winter_MAT}
                      />
                    </group>
                    <group
                      name="Rock_Winter3"
                      position={[-1.187, 33.621, 6.492]}
                    >
                      <mesh
                        name="Rock_Winter3_Rocks3_Winter_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={
                          nodes.Rock_Winter3_Rocks3_Winter_MAT_0.geometry
                        }
                        material={materials.Rocks3_Winter_MAT}
                      />
                    </group>
                    <group name="Stick_All" position={[-4.211, 21.605, 25.599]}>
                      <mesh
                        name="Stick_All_Stick_All_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Stick_All_Stick_All_MAT_0.geometry}
                        material={materials.Stick_All_MAT}
                      />
                    </group>
                    <group name="Water" position={[-0.86, 2.306, 0.202]}>
                      <mesh
                        name="Water_Water_MAT_0"
                        castShadow
                        receiveShadow
                        geometry={nodes.Water_Water_MAT_0.geometry}
                        material={materials.Water_MAT}
                      />
                    </group>
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>

  );
};

useGLTF.preload("/planet.glb");
