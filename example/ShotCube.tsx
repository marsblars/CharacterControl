import * as THREE from "three";
import { useThree, useFrame } from "@react-three/fiber";
import { RapierRigidBody, RigidBody } from "@react-three/rapier";
import { useRef, useMemo, useState, useEffect } from "react";

export default function ShotCube() {
  const { camera } = useThree();
  const [cubeMesh, setCubeMesh] = useState([]);
  const cubeRef = useRef<RapierRigidBody>();

  const position = useMemo(() => new THREE.Vector3(), []);
  const direction = useMemo(() => new THREE.Vector3(), []);
  const characterModelRef = useRef<THREE.Group>();
  const characterRef = useRef<RapierRigidBody>()
  const currentPos = useMemo(() => new THREE.Vector3(), []);
  
  const clickToCreateBox = () => {
    if (document.pointerLockElement) {
      camera.parent.getWorldPosition(position);
      const newMesh = (
        <mesh
          position={[position.x, position.y - 0.5, position.z]}
          castShadow
          receiveShadow
        >
          
          <sphereGeometry args={ [0.1]}/>
          <meshStandardMaterial color="orange" />
        </mesh>
      );
      setCubeMesh((prevMeshes) => [...prevMeshes, newMesh]);
    }
  };
  useFrame((state) => {

  if (characterRef.current) {
    currentPos.copy((characterRef.current.translation() as THREE.Vector3));
  }

});
 

  useEffect(() => {
    camera.parent.getWorldDirection(direction);
    if (cubeMesh.length > 0) {
      cubeRef.current.setLinvel(
        new THREE.Vector3(
          direction.x * 20,
          direction.y * 20 + 2,
          direction.z * 20
        ),
        false
      );
    }
  }, [cubeMesh]);

  useEffect(() => {
    window.addEventListener("click", () => clickToCreateBox());

    return () => {
      window.removeEventListener("click", () => clickToCreateBox());
    };
  }, []);

  return (
    <>
      {cubeMesh.map((item, i) => {
        return (
          <RigidBody key={i} mass={0.6} ref={cubeRef}>
            {item}
          </RigidBody>
        );
      })}
    </>
  );
}
