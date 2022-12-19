import * as DREI from '@react-three/drei';
import React, { useMemo } from 'react';
import useWorld from '../../../stores/World';

const Particles = ({ count = 1000 }) => {
  const { scale } = useWorld();
  const sparkles = useMemo(
    () => (
      <DREI.Sparkles
        size={4}
        scale={[scale.x, scale.y, scale.z]}
        position-y={scale.y / 2}
        speed={0.2}
        count={count}
      />
    ),
    [count],
  );

  return <>{sparkles}</>;
};

export default Particles;
