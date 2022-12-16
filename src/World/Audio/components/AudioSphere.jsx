import { useFrame } from '@react-three/fiber';
import React, { useEffect, useMemo, useRef } from 'react';

const AudioSphere = ({ audio, info }) => {
  useEffect(() => {
    console.log('AudioSphere useEffect', audio, info);
  }, [audio, info]);

  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;
  });

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
