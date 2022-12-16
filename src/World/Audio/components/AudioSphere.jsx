import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';
import useInterface from '../../../stores/Interface';

const AudioSphere = ({ audio, info }) => {
  const { hovered } = useInterface();
  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);

  // ! Add here, is the object is in hovereds and is clicked to i.e. mute it

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
  });

  useEffect(() => {
    console.log(info);
    ref.current.userData = { audio, name: info.name, id: info.id };
  }, [audio, info.name, info.id]);

  return (
    <mesh
      ref={ref}
      position={[info.position.x, info.position.y, info.position.z]}
    >
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={info.color} wireframe />
    </mesh>
  );
};

export default AudioSphere;
