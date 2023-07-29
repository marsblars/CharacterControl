import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { RigidBody } from "@react-three/rapier";
import { useRef, useMemo, useState, useEffect } from "react";

export default function ShotCube() {
  const { camera } = useThree();
  const [cubeMesh, setCubeMesh] = useState([]);
  const cubeRef = useRef();

  const position = useMemo(() => new THREE.Vector3());
  const direction = useMemo(() => new THREE.Vector3());

  const clickToCreateBox = () => {
    camera.parent.getWorldPosition(position);
    const newMesh = (
      <mesh position={[position.x, position.y, position.z]} receiveShadow>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial color="orange" />
      </mesh>
    );
    setCubeMesh((prevMeshes) => [...prevMeshes, newMesh]);
  };

  useEffect(() => {
    camera.parent.getWorldDirection(direction);
    if (cubeMesh.length > 0) {
      cubeRef.current.setLinvel(
        new THREE.Vector3(
          direction.x * 20,
          direction.y * 20 - 3,
          direction.z * 20
        )
      );
    }
  }, [cubeMesh]);

  useEffect(() => {
    window.addEventListener("click", () => clickToCreateBox());
  }, []);

  return (
    <>
      {cubeMesh.map((item, i) => {
        return (
          <RigidBody key={i} ref={cubeRef}>
            {item}
          </RigidBody>
        );
      })}
    </>
  );
}
