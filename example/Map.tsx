
import * as THREE from "three";
import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
import { RigidBody } from "@react-three/rapier";




export default function Map(props: JSX.IntrinsicElements["group"]) {
  const { nodes, materials } = useGLTF('/game.glb') as GLTF & {
    nodes: any;
    materials: any;
  };

  return (
    <RigidBody type="fixed" colliders="trimesh" position={[0,-10,0]} scale={3} >
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.obj000_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BigBox_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BigBox_1.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Barrel_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Barrel_1.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.BarrelB_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.obj001_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.miniBox001_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.obj005_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.obj007_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box008_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box008_1.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Barrel013_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cube008_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Box034_0.geometry}
        material={materials.PaletteMaterial001}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.up2_0.geometry}
        material={materials.PaletteMaterial001}
        position={[-3.538, 0, 5.424]}
        rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
      />
    </group>
    </RigidBody>
  );
}

useGLTF.preload("/game.glb");


/*   return (
    <RigidBody type="fixed" colliders="trimesh" position={[0,-10,0]}>
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_2.geometry}
        material={materials.map_2_island1}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_3.geometry}
        material={materials.map_2_object1}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_4.geometry}
        material={materials.map_2_terrain1}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.139}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Object_5.geometry}
        material={materials.map_4lambert5SG}
        rotation={[-Math.PI / 2, 0, 0]}
        scale={1.139}
      />
    </group>

    </RigidBody>
    
  );
  
}

useGLTF.preload('/sand.glb'); */