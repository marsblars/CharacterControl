import { Grid, KeyboardControls, Loader, PointerLockControls, PresentationControls } from "@react-three/drei";
import { Perf } from "r3f-perf";
import { Physics, RigidBody, RapierRigidBody, BallCollider, interactionGroups} from "@react-three/rapier";
import React, { useRef, Suspense, useEffect, useMemo} from "react";
import { Attractor } from "./attractor";
import { Canvas, useThree, useFrame, MeshStandardMaterialProps } from "@react-three/fiber";
import Ecctrl from "../src/Ecctrl";
import Floor from "./Floor";
import Lights from "./Lights";
import Steps from "./Steps";
import Slopes from "./Slopes";
import RoughPlane from "./RoughPlane";
import RigidObjects from "./RigidObjects";
import FloatingPlatform from "./FloatingPlatform";
import DynamicPlatforms from "./DynamicPlatforms";
import ShotCube from "./ShotCube";
import { useControls } from "leva";
import CharacterModel from "./Character";
import * as THREE from "three";

/* import CharacterModel from "./CharacterModel"; */
declare type Vector3Tuple = [x: number, y: number, z: number];
export default function Experience() {
  let time = null;
  const xRotationAxies = new THREE.Vector3(1, 0, 0);
  const quatX = useMemo(() => new THREE.Quaternion(), []);
  const quatY = useMemo(() => new THREE.Quaternion(), []);
  const quatZ = useMemo(() => new THREE.Quaternion(), []);
  const planetRef = useRef<RapierRigidBody>(); 
  const characterRef = useRef<RapierRigidBody>(); 
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  const curPos = useMemo(() => new THREE.Euler(), []);
  const vectorY = useMemo(() => new THREE.Vector3(0, 1, 0), []);
  const vectorZ = useMemo(() => new THREE.Vector3(0, 0, 1), []);
  const vectorx = useMemo(() => new THREE.Vector3(1, 0, 0), []);
  /**
   * Debug settings
   */
  const { physics } = useControls("World Settings", {
    physics: true,
  });
  const {camera, gl} = useThree();

  /**
   * Keyboard control preset
   */
  const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
  ];
let speed = 0.1
let canJump = false;
let isFalling = false;
let gravity: Vector3Tuple
gravity = [0, -9.81, 0]
let grav: Vector3Tuple
grav = [0,  9.81,  0]
const currentVel = useMemo(() => new THREE.Vector3(), []);
    quatX.setFromAxisAngle(vectorx, Math.PI); // rotate around X axis
    quatY.setFromAxisAngle(vectorY, Math.PI/2); // rotate around Y axis
    quatZ.setFromAxisAngle(vectorZ, -Math.PI/2); // rotate around Z axis


/* 	useFrame((state) => {
		const time = state.clock.getElapsedTime();
		const eulerRotation = new THREE.Euler(0, time * speed , 0);
		const eRotation = new THREE.Euler(time * speed, 0 , 0);
		const quaternion = new THREE.Quaternion();
		


    if (characterRef.current) {
      currentPos.copy((characterRef.current.translation() as THREE.Vector3));

    }
    quaternion.setFromEuler(eulerRotation);
    quatY.setFromEuler(eRotation);
		planetRef.current?.setRotation(quatY, true); */
	/* 	characterRef.current?.setRotation(quatZ, true); */
	/* }); */
/*   useFrame((state) => {
    time = state.clock.elapsedTime;


    if (characterRef.current) {
      currentPos.copy((characterRef.current.translation() as THREE.Vector3));
      
    }
    quatY.setFromAxisAngle(currentPos, Math.PI/2)
    let finalQuat = quatX.multiplyQuaternions(quatY,quatZ)

      planetRef.current?.setRotation(
        finalQuat, true
        
      );

    
  
    }); */
    const characterModelRef = useRef<THREE.Group>();
    let rlud = false;
/*   useFrame((state, delta) => { 
    
    if (characterRef.current.isMoving()) {
      rlud = true
      let qx = characterRef.current.rotation().x
      let qy = characterRef.current.rotation().y
      let qz = characterRef.current.rotation().z
      let qw = characterRef.current.rotation().w

      characterRef.current.nextRotation().x = 2 * (qy * qw + qz * qx);
      characterRef.current.nextRotation().y = 2 * (qz * qy - qw * qx);
      characterRef.current.nextRotation().z = ((qz * qz + qw * qw) - (qx * qx + qy * qy));



    }


}) */



  return (
<>
    <PointerLockControls args={[camera, gl.domElement]}/>
   
      <Perf position="top-left" minimal />



      <Lights />

      <Physics gravity={[0,0,0]} debug={physics} >

        {/* Keyboard preset */}
        <KeyboardControls map={keyboardMap}>
          {/* Character Control */}
          <Ecctrl
            debug
            animated
            followLight
            springK={2}
            dampingC={0.2}
            autoBalance
            autoBalanceSpringK={1.2}
            autoBalanceDampingC={0.04}
            ref={characterRef}
            camCollision
            collisionGroups={interactionGroups(2)}
          >
            {/* Replace your model here */}
            <group>
            <CharacterModel />
            </group>
          </Ecctrl>
        </KeyboardControls>
    
{/*     <RigidBody type="fixed" gravityScale={0} position={[0,-25,0]} colliders={false} scale={1.5}>
      <BallCollider args={[8]}/>
      <Attractor   type="static" range={5000} strength={0.5} />
    </RigidBody>
 */}

    <RigidBody type="fixed" gravityScale={0}  colliders={false}  position={[0,-25,0]} collisionGroups={interactionGroups(1)} scale={1.5} >    
    <BallCollider args={[8]} />
      <mesh>
        <sphereGeometry args={[8]}/>
        <meshStandardMaterial wireframe={true} />
      </mesh>
      {/* <Planet /> */}

    <Attractor collisionGroups={interactionGroups(1, 2)}  type="static" range={305} strength={0.5} />
    </RigidBody>
 
       


        {/* Rough plan */}
{/*         <RoughPlane /> */}

        {/* Slopes and stairs */}
{/*         <Slopes /> */}

        {/* Small steps */}
 {/*        <Steps /> */}

        {/* Rigid body objects */}
{/*         <RigidObjects /> */}

        {/* Floating platform */}
{/*         <FloatingPlatform /> */}

        {/* Dynamic platforms */}
{/*    <DynamicPlatforms />  */}

        {/* Floor */}

{/*         <Map /> */}
{/*         <Floor /> */}
        {/* Shoting cubes */}

        <ShotCube />
      </Physics >


    </>
  );
}
