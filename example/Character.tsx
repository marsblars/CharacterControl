import {
    useAnimations,
    useGLTF,
    useTexture,
    Trail,
    SpriteAnimator,
  } from "@react-three/drei";
  import { useControls } from "leva";
  import { Suspense, useEffect, useRef, useMemo, useState } from "react";
  import * as THREE from "three";
  import { useGame } from "../src/stores/useGame";
  import { BallCollider, RapierCollider, RigidBody, vec3 } from "@react-three/rapier";
  import { useFrame } from "@react-three/fiber";
  import type { GLTF } from "three/examples/jsm/loaders/GLTFLoader";
  
  export default function CharacterModel(props: CharacterModelProps) {
    // Change the character src to yours
    const group = useRef<THREE.Group>();
    const { nodes, materials, animations } = useGLTF("/Barbarian.glb") as GLTF & {
      nodes: any;
      materials: any;
    };
    const { actions } = useAnimations(animations, group);
    // gradientMapTexture for MeshToonMaterial
    const gradientMapTexture = useTexture("./textures/1.png");
    gradientMapTexture.minFilter = THREE.NearestFilter;
    gradientMapTexture.magFilter = THREE.NearestFilter;
    gradientMapTexture.generateMipmaps = false;
  
    /**
     * Prepare hands ref for attack action
     */
    const rightHandRef = useRef<THREE.Mesh>();
    const rightHandColliderRef = useRef<RapierCollider>();
    const leftHandRef = useRef<THREE.Mesh>();
    const leftHandColliderRef = useRef<RapierCollider>();
    const rightHandPos = useMemo(() => new THREE.Vector3(), []);
    const leftHandPos = useMemo(() => new THREE.Vector3(), []);
    const bodyPos = useMemo(() => new THREE.Vector3(), []);
    let rightHand: THREE.Object3D = null;
    let leftHand: THREE.Object3D = null;
    let mugModel: THREE.Object3D = null;
    let shieldModel: THREE.Object3D = null;
    let smallAxeModel: THREE.Object3D = null;    
    let smallAxeModelOff: THREE.Object3D = null;    
    let AxeModel: THREE.Object3D = null;    
    let hatModel: THREE.Object3D = null;    

  
    /**
     * Prepare punch effect sprite
     */
    const [punchEffectProps, setPunchEffectProp] = useState({
      visible: false,
      scale: [1, 1, 1],
      play: false,
      position: [-0.2, -0.2, 0.5],
      startFrame: 0,
    });
  
    /**
     * Debug settings
     */
    const { mainColor, outlineColor, trailColor } = useControls(
      "Character Model",
      {
        mainColor: "mediumslateblue",
        outlineColor: "black",
        trailColor: "violet",
      }
    );
  
    /**
     * Prepare replacing materials
     */

    const meshToonMaterial = useMemo(
      () =>
        new THREE.MeshToonMaterial({
          color: mainColor,
          normalMap: gradientMapTexture,
          transparent: true,
          
        }),
      [mainColor]
    );
  
    /**
     * Character animations setup
     */
    const curAnimation = useGame((state) => state.curAnimation);
    const resetAnimation = useGame((state) => state.reset);
    const initializeAnimationSet = useGame(
      (state) => state.initializeAnimationSet
    );
  
    // Rename your character animations here
    const animationSet = {
      idle: "Idle",
      walk: "Walking_B",
      run: "Running_B",
      jump: "Jump_Start",
      jumpIdle: "Jump_Idle",
      jumpLand: "Jump_Land",
      fall: "Sit_Chair_Down", // This is for falling from high sky
      action1: "Lie_Down",
      action2: "T-Pose",
      action3: "Cheer",
      action4: "Hit_A",
    };
  
    useEffect(() => {
      // Initialize animation set
      initializeAnimationSet(animationSet);
    }, []);
  
    useEffect(() => {
      group.current.traverse((obj) => {
        // Prepare both hands bone object
        if (obj instanceof THREE.Bone) {
          if (obj.name === "handslot.r") rightHand = obj;
          if (obj.name === "handslot.l") leftHand = obj;
        }
        // Prepare mug model for cheer action
        if (obj.name === "Mug") {
          mugModel = obj;
          mugModel.visible = false;
        }
        if (obj.name === "Barbarian_Round_Shield") {
            shieldModel = obj;
            shieldModel.visible = false;
        }
        if (obj.name === "1H_Axe") {
            smallAxeModel = obj;
            smallAxeModel.visible = false;
        }
        if (obj.name === "1H_Axe_Offhand") {
            smallAxeModelOff = obj;
            smallAxeModelOff.visible = false;
        }
        if (obj.name === "2H_Axe") {
            AxeModel = obj;
            AxeModel.visible = false;
        }
        if (obj.name === "Barbarian_Hat") {
              hatModel = obj;
              hatModel.visible = false;
        }
      });
    });
  
    useFrame(() => {
      if (curAnimation === animationSet.action4) {
        if (rightHand && leftHand) {
          rightHand.getWorldPosition(rightHandPos);
          leftHand.getWorldPosition(leftHandPos);
          rightHandRef.current.parent.getWorldPosition(bodyPos);
        }
  
        // Apply both hands position to hand colliders
        if (rightHandColliderRef.current && leftHandColliderRef.current) {
          rightHandRef.current.position.copy(rightHandPos).sub(bodyPos);
          rightHandColliderRef.current.setTranslationWrtParent(
            rightHandRef.current.position
          );
        }
      } 
    });
  
    useEffect(() => {
      // Play animation
      const action = actions[curAnimation ? curAnimation : animationSet.jumpIdle];
  
      // For jump and jump land animation, only play once and clamp when finish
      if (
        curAnimation === animationSet.jump ||
        curAnimation === animationSet.jumpLand ||
        curAnimation === animationSet.action1 ||
        curAnimation === animationSet.action2 ||
        curAnimation === animationSet.action3 ||
        curAnimation === animationSet.action4
      ) {
        action
          .reset()
          .fadeIn(0.2)
          .setLoop(THREE.LoopOnce, undefined as number)
          .play();
        action.clampWhenFinished = true;
        // Only show mug during cheer action
        if (curAnimation === animationSet.action3) {
          mugModel.visible = true;
        } else {
          mugModel.visible = false;
        }
      } else {
        action.reset().fadeIn(0.2).play();
        mugModel.visible = false;
      }
  
      // When any action is clamp and finished reset animation
      (action as any)._mixer.addEventListener("finished", () => resetAnimation());
  
      return () => {
        // Fade out previous action
        action.fadeOut(0.2);
  
        // Clean up mixer listener, and empty the _listeners array
        (action as any)._mixer.removeEventListener("finished", () =>
          resetAnimation()
        );
        (action as any)._mixer._listeners = [];
  
        // Move hand collider back to initial position after action
        if (curAnimation===animationSet.action4) {
          if (rightHandColliderRef.current) {
            rightHandColliderRef.current.setTranslationWrtParent(vec3({ x: 0, y: 0, z: 0 }))
          }
        }
      };
    }, [curAnimation]);
  
    return (
      <Suspense fallback={<capsuleGeometry args={[0.3, 0.7]} />}>
        {/* Default capsule modle */}
        {/* <mesh castShadow>
          <capsuleGeometry args={[0.3, 0.7]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh>
        <mesh castShadow position={[0, 0.2, 0.2]}>
          <boxGeometry args={[0.5, 0.2, 0.3]} />
          <meshStandardMaterial color="mediumpurple" />
        </mesh> */}

        {/* Replace yours model here */}
        {/* Head collider */}
        <BallCollider args={[0.5]} position={[0, 0.45, 0]} />
        {/* Right hand collider */}
        <mesh ref={rightHandRef} />
        <BallCollider
          args={[0.1]}
          ref={rightHandColliderRef}
          onCollisionEnter={(e) => {
            if (curAnimation === animationSet.action4) {
              // Play punch effect
              setPunchEffectProp((prev) => ({
                ...prev,
                visible: true,
                play: true,
              }));
            }
          }}
        />
  
        {/* Left hand collider */}
        <mesh ref={leftHandRef} />
        <BallCollider args={[0.1]} ref={leftHandColliderRef} />
        {/* Character model */}
        <group
          ref={group}
          {...props}
          dispose={null}
        >
          <group name="Scene" scale={0.8} position={[0, -0.85, 0]}>
          <group name="Rig">
          <skinnedMesh
            name="Barbarian_ArmLeft"
            geometry={nodes.Barbarian_ArmLeft.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_ArmLeft.skeleton}
          />
          <skinnedMesh
            name="Barbarian_ArmRight"
            geometry={nodes.Barbarian_ArmRight.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_ArmRight.skeleton}
          />
          <skinnedMesh
            name="Barbarian_Body"
            geometry={nodes.Barbarian_Body.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_Body.skeleton}
          />
          <skinnedMesh
            name="Barbarian_Head"
            geometry={nodes.Barbarian_Head.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_Head.skeleton}
          />
          <skinnedMesh
            name="Barbarian_LegLeft"
            geometry={nodes.Barbarian_LegLeft.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_LegLeft.skeleton}
          />
          <skinnedMesh
            name="Barbarian_LegRight"
            geometry={nodes.Barbarian_LegRight.geometry}
            material={materials.barbarian_texture}
            skeleton={nodes.Barbarian_LegRight.skeleton}
          />
          <primitive object={nodes.root} />
            </group>
          </group>
          <SpriteAnimator
            visible={punchEffectProps.visible}
            scale={punchEffectProps.scale as any}
            position={punchEffectProps.position as any}
            startFrame={punchEffectProps.startFrame}
            loop={true}
            onLoopEnd={() => {
              setPunchEffectProp((prev) => ({
                ...prev,
                visible: false,
                play: false,
              }));
            }}
            play={punchEffectProps.play}
            numberOfFrames={7}
            alphaTest={0.01}
            textureImageURL={"./punchEffect.png"}
          />
        </group>

      </Suspense>
    );
  }
  
  export type CharacterModelProps = JSX.IntrinsicElements["group"];
  
  // Change the character src to yours
  useGLTF.preload("/Barbarian.glb");
  
  
