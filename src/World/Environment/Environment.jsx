import React from 'react';
import Lights from './components/Lights';
import Structure from './components/Structure';
import Particles from './components/Particles';
import Effects from './components/Effects';
import EnvironmentControls from './components/EnvironmentControls';
import useWorld from '../../stores/World';

const Environment = () => {
  const { scale } = useWorld();

  return (
    <>
      <Structure />
      <Lights />
      <Particles count={(scale.x * scale.y) / 10} />
      <Effects />

      <EnvironmentControls />
    </>
  );
};

export default Environment;
