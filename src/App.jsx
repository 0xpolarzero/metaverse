import { Canvas } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { Perf } from 'r3f-perf';
import React, { useEffect } from 'react';
import World from './World';
import Interface, { Crosshair } from './Interface';

const App = () => {
  const [showPerf, setShowPerf] = React.useState(false);

  // Show perf only if the link ends with #debug
  useEffect(() => {
    setShowPerf(window.location.hash === '#debug');
  }, []);

  return (
    <>
      <DREI.KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'right', keys: ['ArrowRight', 'KeyD'] },
          { name: 'sprint', keys: ['ShiftLeft', 'ShiftRight'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'interact', keys: ['Click', 'KeyE'] },
        ]}
      >
        <Canvas
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [-4, 2, -4],
          }}
        >
          {showPerf && <Perf position='top-left' />}
          <World />
        </Canvas>
      </DREI.KeyboardControls>
      <Interface />
      <Crosshair />
    </>
  );
};

export default App;
