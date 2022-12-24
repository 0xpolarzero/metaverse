import * as THREE from 'three';
import * as DREI from '@react-three/drei';
import { CuboidCollider, Debug, RigidBody } from '@react-three/rapier';
import React, { useEffect, useRef } from 'react';
import useWorld from '../../../stores/World';
import defaults from '../../../defaults.config';
import { useThree } from '@react-three/fiber';

const { scale: DEFAULT_SCALE, maxScaleMultiplier: MAX_SCALE } = defaults.world;
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({
  color: 0x131313,
  transparent: true,
  opacity: 0.3,
  side: THREE.DoubleSide,
});

const Structure = () => {
  const { scale } = useWorld();

  return (
    <>
      <gridHelper
        args={[
          DEFAULT_SCALE.x * MAX_SCALE,
          DEFAULT_SCALE.z * MAX_SCALE,
          // colors.c2
          0x545454,
          // colors.a2
          0x242424,
        ]}
        position-y={-1}
      />
      <Floor scale={scale} />
      <Ceiling scale={scale} />
      <Bounds scale={scale} />
    </>
  );
};

const Floor = ({ scale }) => {
  return (
    <RigidBody type='fixed' restitution={0.2} friction={1} colliders={false}>
      <Debug />
      <CuboidCollider
        args={[
          DEFAULT_SCALE.x * MAX_SCALE * 0.5,
          0.1,
          DEFAULT_SCALE.z * MAX_SCALE * 0.5,
        ]}
        position-y={-0.1}
      />
      <mesh
        name='floor'
        geometry={geometry}
        material={material}
        scale={[scale.x, scale.z, 0.1]}
        position-y={-1}
        rotation-x={-Math.PI / 2}
      ></mesh>
    </RigidBody>
  );
};

const Ceiling = ({ scale }) => {
  return (
    <mesh
      name='ceiling'
      geometry={geometry}
      material={material}
      scale={[scale.x, scale.z, 0.1]}
      position-y={scale.y - 1}
      rotation-x={Math.PI / 2}
    />
  );
};

const Bounds = ({ scale }) => {
  return (
    <>
      <RigidBody type='fixed' restitution={0.2} friction={1}>
        {/* Left wall */}
        <CuboidCollider
          args={[0.1, scale.y * 0.5, scale.z * MAX_SCALE * 0.5]}
          position={[
            DEFAULT_SCALE.x * MAX_SCALE * 0.5,
            DEFAULT_SCALE.y * 0.5 - 1,
            0,
          ]}
        />
        <CuboidCollider
          args={[0.1, scale.y * 0.5, scale.z * MAX_SCALE * 0.5]}
          position={[
            -DEFAULT_SCALE.x * MAX_SCALE * 0.5,
            DEFAULT_SCALE.y * 0.5 - 1,
            0,
          ]}
        />
        <CuboidCollider
          args={[scale.x * MAX_SCALE * 0.5, scale.y * 0.5, 0.1]}
          position={[
            0,
            DEFAULT_SCALE.y * 0.5 - 1,
            DEFAULT_SCALE.z * MAX_SCALE * 0.5,
          ]}
        />
        <CuboidCollider
          args={[scale.x * MAX_SCALE * 0.5, scale.y * 0.5, 0.1]}
          position={[
            0,
            DEFAULT_SCALE.y * 0.5 - 1,
            -DEFAULT_SCALE.z * MAX_SCALE * 0.5,
          ]}
        />
      </RigidBody>
      Right wall
      <mesh
        name='leftWall'
        geometry={geometry}
        material={material}
        position-x={-scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      />
      Right wall
      <mesh
        name='rightWall'
        geometry={geometry}
        material={material}
        position-x={scale.x / 2}
        position-y={scale.y / 2 - 1}
        scale={[0.1, scale.y, scale.z]}
      />
      Back wall
      <mesh
        name='backWall'
        geometry={geometry}
        material={material}
        position-z={-scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      />
      Front wall
      <mesh
        name='frontWall'
        geometry={geometry}
        material={material}
        position-z={scale.z / 2}
        position-y={scale.y / 2 - 1}
        scale={[scale.x, scale.y, 0.1]}
      />
    </>
  );
};

export default Structure;
