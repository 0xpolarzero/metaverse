import React from 'react';
import Lights from './components/Lights';
import Structure from './components/Structure';
import Particles from './components/Particles';
import useWorld from '../../stores/World';
import Effects from './components/Effects';

const Environment = () => {
  const { scale } = useWorld();

  return (
    <>
      <Structure />
      <Lights />
      <Particles count={(scale.x * scale.y) / 10} />
      <Effects />
    </>
  );
};

export default Environment;
