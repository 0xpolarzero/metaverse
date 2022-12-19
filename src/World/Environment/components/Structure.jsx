import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import React, { useMemo, useRef } from 'react';
import useWorld from '../../../stores/World';

const geometry = new THREE.BoxGeometry(1, 1, 1);

const Structure = () => {
  const mesh = useRef();
  const { scale, colors } = useWorld();

  const uniforms = useMemo(() => ({
    gridSize: { value: 1 },
    color1: { value: new THREE.Color(0x00bfff) }, // light blue
    color2: { value: new THREE.Color(0x9400d3) }, // dark violet
  }));

  const material = new THREE.MeshBasicMaterial({
    color: 0x00bfff,
    transparent: true,
    opacity: 0,
  });

  useFrame(({ clock }) => {});

  return (
    <>
      <gridHelper args={[scale.x, scale.z, colors.a, colors.d]} />
      <Floor scale={scale} material={material} />
      <Bounds scale={scale} material={material} />
    </>
  );
};

const Floor = ({ scale, material }) => {
  return (
    <RigidBody type='fixed' restitution={0.2} friction={1} colliders={false}>
      <CuboidCollider
        args={[scale.x * 0.5, 0.1, scale.z * 0.5]}
        position-y={-0.1}
      />
      <mesh
        name='floor'
        geometry={geometry}
        material={material}
        scale={[scale.x, scale.z, 0.1]}
        position-y={-1}
        rotation-x={-Math.PI / 2}
      >
        <planeBufferGeometry args={[scale.x, scale.z]} />
      </mesh>
    </RigidBody>
  );
};

const Bounds = ({ scale, material }) => {
  return (
    <RigidBody type='fixed' restitution={0.2} friction={1}>
      {/* Left wall */}
      <mesh
        name='leftWall'
        geometry={geometry}
        material={material}
        position-x={-scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      />
      {/* Right wall */}
      <mesh
        name='rightWall'
        geometry={geometry}
        material={material}
        position-x={scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      />
      {/* Back wall */}
      <mesh
        name='backWall'
        geometry={geometry}
        material={material}
        position-z={-scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      />
      {/* Front wall */}
      <mesh
        name='frontWall'
        geometry={geometry}
        material={material}
        position-z={scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      />
    </RigidBody>
  );
};

export default Structure;
