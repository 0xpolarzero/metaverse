import * as DREI from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { FPSControls } from 'react-three-fpscontrols';
import { isDesktop } from 'react-device-detect';
import React, { useEffect, useMemo } from 'react';
import Environment from './Environment';
import Player from './Controls';
import AudioSystem from './Audio';
import useWorld from '../stores/World';
import useInterface from '../stores/Interface';
import useAtmoky from '../stores/Atmoky';

const World = () => {
  const { gravity } = useWorld();
  const { setShowMenu } = useInterface();
  const { resumeAudio, pauseAudio } = useAtmoky();

  const environment = useMemo(() => <Environment />, []);

  useEffect(() => {
    if (isDesktop) {
      setShowMenu(true);
    }
  }, []);

  return (
    <>
      <color attach='background' args={['#131313']} />
      {isDesktop && (
        <DREI.PointerLockControls
          onLock={() => {
            setShowMenu(false);
            resumeAudio();
          }}
          onUnlock={() => {
            setShowMenu(true);
            pauseAudio();
          }}
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
              position: [0, 1.5, 0.7],
            }}
            orbitProps={{
              target: [0, 1.5, 0],
            }}
            enableJoystick
            enableKeyboard
          />
        )}
      </Physics>

      <AudioSystem />
    </>
  );
};

export default World;