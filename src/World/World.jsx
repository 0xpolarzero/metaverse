import * as DREI from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import Environment from './Environment';
import Player from './Controls';
import useWorld from '../stores/World';
import useInterface from '../stores/Interface';
import { useMemo } from 'react';
import { isDesktop } from 'react-device-detect';

const World = () => {
  const { gravity } = useWorld();
  const { setShowMenu } = useInterface();

  const environment = useMemo(() => <Environment />, []);

  return (
    <>
      <color attach='background' args={['#131313']} />
      {isDesktop ? (
        <DREI.PointerLockControls
          onLock={() => setShowMenu(false)}
          onUnlock={() => setShowMenu(true)}
        />
      ) : null}

      <Physics gravity={gravity}>
        {environment}
        <Player />
        <mesh>
          <sphereGeometry args={[1, 32, 32]} />
          <meshStandardMaterial color='red' />
        </mesh>
      </Physics>
    </>
  );
};

export default World;
