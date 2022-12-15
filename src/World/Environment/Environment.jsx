import Lights from './components/Lights';
import Structure from './components/Structure';
import Particles from './components/Particles';
import useWorld from '../../stores/World';
import React from 'react';

const Environment = () => {
  const { scale } = useWorld();

  return (
    <>
      <Structure />
      <Lights />
      <Particles count={(scale.x * scale.y) / 10} />
    </>
  );
};

export default Environment;
