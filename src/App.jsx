import { Canvas } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { isMobile } from 'react-device-detect';
import { useEffect } from 'react';
import World from './World';
import Interface, { Crosshair } from './Interface';

const App = () => {
  useEffect(() => {
    if (isMobile) {
      screen.orientation.lock('landscape');
    }
  }, [isMobile]);

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
          shadows
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [-4, 2, -4],
          }}
        >
          <Perf position='top-left' />
          <World />
        </Canvas>
      </DREI.KeyboardControls>
      <Interface />
      <Crosshair />
    </>
  );
};

export default App;
