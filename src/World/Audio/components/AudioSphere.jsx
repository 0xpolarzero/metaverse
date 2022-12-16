import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useInterface from '../../../stores/Interface';

const AudioSphere = ({ audio, info }) => {
  const [distanceToCamera, setDistanceToCamera] = useState('');
  const [isHovered, setIsHovered] = useState(false);
  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);
  const { setState, hovereds, addHovered, removeHovered } = useInterface();
  const { camera } = useThree();

  // When the cursor is over the sphere
  const onPointerEnter = (e) => {
    e.stopPropagation();
    addHovered(ref.current.userData.name);
    console.log('enter', ref.current.userData.name);
  };

  // When the cursor leaves the sphere
  const onPointerLeave = (e) => {
    e.stopPropagation();
    removeHovered(ref.current.userData.name);
    console.log('leave', ref.current.userData.name);
  };

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    setDistanceToCamera(
      Math.sqrt(
        Math.pow(camera.position.x - ref.current.position.x, 2) +
          Math.pow(camera.position.y - ref.current.position.y, 2) +
          Math.pow(camera.position.z - ref.current.position.z, 2),
      ),
    );
  });

  useEffect(() => {
    console.log(hovereds.includes(info.name) && distanceToCamera < 10);
    if (hovereds.includes(info.name) && distanceToCamera < 10) {
      setState('hover');
    } else {
      setState('default');
    }
  }, [distanceToCamera, hovereds]);

  useEffect(() => {
    ref.current.userData = { audio, name: info.name };
  }, [audio, info.name]);

  return (
    <mesh
      ref={ref}
      position={[info.position.x, info.position.y, info.position.z]}
      onClick={(e) => console.log(ref)}
      onPointerEnter={onPointerEnter}
      onPointerLeave={onPointerLeave}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={info.color} wireframe />
    </mesh>
  );
};

export default AudioSphere;
