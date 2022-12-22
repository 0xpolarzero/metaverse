import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import { CuboidCollider, Debug, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import useWorld from '../../../stores/World';
import defaults from '../../../defaults.config';

const { scale: DEFAULT_SCALE, maxScaleMultiplier: MAX_SCALE } = defaults.world;
const geometry = new THREE.BoxGeometry(1, 1, 1);

const Structure = () => {
  const { scale } = useWorld();

  const material = new THREE.MeshBasicMaterial({
    color: 0x131313,
    transparent: true,
    opacity: 0,
  });

  return (
    <>
      <gridHelper
        args={[
          scale.x,
          scale.z,
          // colors.c2
          0x545454,
          // colors.a2
          0x242424,
        ]}
      />
      <Floor scale={scale} material={material} />
      <Bounds scale={scale} material={material} />
    </>
  );
};

const Floor = ({ scale, material }) => {
  const ref = useRef();
  console.log(scale);

  useEffect(() => {
    console.log(ref.current); // .setTranslation
  }, [scale]);

  return (
    <RigidBody
      ref={ref}
      type='fixed'
      restitution={0.2}
      friction={1}
      colliders={false}
    >
      <Debug />
      <CuboidCollider
        args={[scale.x * MAX_SCALE * 0.5, 0.1, scale.z * MAX_SCALE * 0.5]}
        position-y={-0.1}
      />
      {/* <mesh
        name='floor'
        geometry={geometry}
        material={material}
        scale={[scale.x, scale.z, 0.1]}
        position-y={-1}
        rotation-x={-Math.PI / 2}
      ></mesh> */}
    </RigidBody>
  );
};

const Bounds = ({ scale, material }) => {
  const ref = useRef();

  useEffect(() => {
    console.log(ref.current); // .setTranslation
    // ref.current.setTranslation(
    //   new THREE.Vector3(scale.x / 2, scale.y / 2 - 1, scale.z / 2),
    // );
  }, [scale]);

  return (
    <RigidBody ref={ref} type='fixed' restitution={0.2} friction={1}>
      {/* Left wall */}
      <CuboidCollider
        args={[0.1, scale.y * 0.5, scale.z * MAX_SCALE * 0.5]}
        position={[scale.x * 0.5, scale.y * 0.5 - 1, 0]}
      />
      <CuboidCollider
        args={[0.1, scale.y * 0.5, scale.z * MAX_SCALE * 0.5]}
        position={[-scale.x * 0.5, scale.y * 0.5 - 1, 0]}
      />
      <CuboidCollider
        args={[scale.x * MAX_SCALE * 0.5, scale.y * 0.5, 0.1]}
        position={[0, scale.y * 0.5 - 1, scale.z * 0.5]}
      />
      <CuboidCollider
        args={[scale.x * MAX_SCALE * 0.5, scale.y * 0.5, 0.1]}
        position={[0, scale.y * 0.5 - 1, -scale.z * 0.5]}
      />
      {/* Right wall */}
      {/* <mesh
        name='leftWall'
        geometry={geometry}
        material={material}
        position-x={-scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      /> */}
      {/* Right wall */}
      {/* <mesh
        name='rightWall'
        geometry={geometry}
        material={material}
        position-x={scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      /> */}
      {/* Back wall */}
      {/* <mesh
        name='backWall'
        geometry={geometry}
        material={material}
        position-z={-scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      /> */}
      {/* Front wall */}
      {/* <mesh
        name='frontWall'
        geometry={geometry}
        material={material}
        position-z={scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      /> */}
    </RigidBody>
  );
};

export default Structure;
