import * as THREE from 'three';
import { useFrame } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import React, { useMemo, useRef } from 'react';
import useWorld from '../../../stores/World';
import '../shaders/ParticleMaterial';

const Particles = ({ count = 1000 }) => {
  const { scale } = useWorld();
  const sparkles = useMemo(
    () => (
      <DREI.Sparkles
        size={6}
        // scale={[scale.x, scale.y, scale.z]}
        // position-y={scale.y / 2}
        speed={0.2}
        count={count}
      />
    ),
    [count],
  );

  return <>{sparkles}</>;

  // const shader = useRef();
  // const [positionArray, scaleArray] = useMemo(() => {
  //   const positionArray = new Float32Array(count * 3);
  //   const scaleArray = new Float32Array(count);
  //   for (let i = 0; i < count; i++) {
  //     new THREE.Vector3(
  //       (Math.random() - 0.5) * 4,
  //       Math.random() * 1.5,
  //       (Math.random() - 0.5) * 4,
  //     ).toArray(positionArray, i * 3);
  //     scaleArray[i] = Math.random();
  //   }
  //   return [positionArray, scaleArray];
  // }, [count]);
  // useFrame((state, delta) => (shader.current.time += delta / 2));
  // return (
  //   <points key={count}>
  //     <bufferGeometry>
  //       <bufferAttribute
  //         attach='attributes-position'
  //         count={count}
  //         array={positionArray}
  //         itemSize={3}
  //       />
  //       <bufferAttribute
  //         attach='attributes-aScale'
  //         count={count}
  //         array={scaleArray}
  //         itemSize={1}
  //       />
  //     </bufferGeometry>
  //     <particleMaterial ref={shader} transparent depthWrite={false} />
  //   </points>
  // );
};

export default Particles;
