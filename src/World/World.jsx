import * as DREI from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { FPSControls } from 'react-three-fpscontrols';
import { isDesktop } from 'react-device-detect';
import { Suspense, useMemo } from 'react';
import Environment from './Environment';
import Player from './Controls';
import useWorld from '../stores/World';
import useInterface from '../stores/Interface';

const World = () => {
  const { gravity } = useWorld();
  const { setShowMenu } = useInterface();

  const environment = useMemo(() => <Environment />, []);

  return (
    <>
      <color attach='background' args={['#131313']} />
      {isDesktop && (
        <DREI.PointerLockControls
          onLock={() => setShowMenu(false)}
          onUnlock={() => setShowMenu(true)}
        />
      )}

      <Physics gravity={gravity}>
        {environment}
        {isDesktop ? (
          <Player />
        ) : (
          <FPSControls
            camProps={{
              makeDefault: true,
              fov: 45,
              position: [0, 2.537, 0.7],
            }}
            orbitProps={{
              target: [0, 2.537, 0],
            }}
            enableJoystick
            enableKeyboard
          />
        )}
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color='red' />
        </mesh>
      </Physics>
    </>
  );
};

export default World;
