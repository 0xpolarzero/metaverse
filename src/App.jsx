import World from './World';
import Interface, { Crosshair } from './Interface';
import useInterface from './stores/Interface';
import { Canvas } from '@react-three/fiber';
import * as DREI from '@react-three/drei';

const App = () => {
  const { setShowMenu } = useInterface();

  return (
    <>
      <DREI.KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'right', keys: ['ArrowRight', 'KeyD'] },
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
          }}
        >
          <World />
          <DREI.PointerLockControls
            onLock={() => setShowMenu(false)}
            onUnlock={() => setShowMenu(true)}
          />
        </Canvas>
      </DREI.KeyboardControls>
      <Interface />
      <Crosshair />
    </>
  );
};

export default App;
