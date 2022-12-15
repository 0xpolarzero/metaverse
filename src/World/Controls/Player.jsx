import * as THREE from 'three';
import { useFrame, useThree } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { CapsuleCollider, RigidBody, useRapier } from '@react-three/rapier';
import { Ray as RapierRay } from '@dimforge/rapier3d-compat';
import { isMobile } from 'react-device-detect';
import { useRef } from 'react';
import useJoystick from '../../stores/Joystick';

const SPEED = 5;
const direction = new THREE.Vector3();
const frontVector = new THREE.Vector3();
const sideVector = new THREE.Vector3();

/**
 * Create Player store in which movements are set
 * in useFrame, just retrieve forward, backward... from the store
 *
 * Maybe in MobileControls we can set the store directly from the joystick
 * Here we can set the store from the keyboard
 */

const Player = () => {
  const player = useRef();
  const rapier = useRapier();
  const { camera } = useThree();
  const [, getKeys] = DREI.useKeyboardControls();
  const { getJoystick } = useJoystick();

  const getUserInput = () => {
    if (isMobile) {
      return getJoystick();
    } else {
      return getKeys();
    }
  };

  useFrame(() => {
    const { forward, backward, left, right, sprint, jump } = getUserInput();

    const velocity = player.current.linvel();
    // Camera
    camera.position.set(...player.current.translation());
    // Movement
    frontVector.set(0, 0, backward - forward);
    sideVector.set(left - right, 0, 0);
    direction
      .subVectors(frontVector, sideVector)
      .normalize()
      .multiplyScalar(SPEED * (sprint ? 2 : 1))
      .applyEuler(camera.rotation);
    player.current.setLinvel(
      new THREE.Vector3(direction.x, velocity.y, direction.z),
    );
    // Jump
    const world = rapier.world.raw();
    const ray = world.castRay(
      new RapierRay(player.current.translation(), { x: 0, y: -1, z: 0 }),
    );
    const grounded = ray && ray.collider && Math.abs(ray.toi) <= 1.75;
    // if (jump && grounded) player.current.setLinvel({ x: 0, y: 7.5, z: 0 });
    if (jump && grounded) player.current.applyImpulse({ x: 0, y: 0.5, z: 0 });
  });

  return (
    <>
      <RigidBody
        ref={player}
        colliders={false}
        mass={1}
        type='dynamic'
        position={[0, 2, 0]}
        enabledRotations={[false, false, false]}
      >
        <CapsuleCollider args={[0.75, 0.5]} />
      </RigidBody>
    </>
  );
};

export default Player;
