import * as DREI from '@react-three/drei';
import React from 'react';

const Lights = () => {
  return (
    <>
      <DREI.Environment preset='city' />
      <ambientLight intensity={0.5} />
    </>
  );
};

export default Lights;
