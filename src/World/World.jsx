import * as DREI from '@react-three/drei';
import { Physics } from '@react-three/rapier';
import { FPSControls } from 'react-three-fpscontrols';
import { isDesktop } from 'react-device-detect';
import React, { useEffect, useMemo, useRef } from 'react';
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
  const controls = useRef();
  const freeCursorKeys = ['Alt', 'Control', 'Meta']; // + default escape
  const menuKeys = ['Tab', 'Enter'];

  const getPressedKey = (e) => {
    if (menuKeys.includes(e.key)) {
      controls.current.unlock();
      setShowMenu(true);
      pauseAudio();
    }

    if (freeCursorKeys.includes(e.key)) controls.current.unlock();
  };

  const hideMenuOnClick = () => {
    setShowMenu(false);
    resumeAudio();
  };

  useEffect(() => {
    if (isDesktop) {
      setShowMenu(true);

      window.addEventListener('keydown', getPressedKey);
      window.addEventListener('click', hideMenuOnClick);

      return () => {
        window.removeEventListener('keydown', getPressedKey);
        window.removeEventListener('click', hideMenuOnClick);
      };
    }
  }, []);

  return (
    <>
      <color attach='background' args={['#131313']} />
      {isDesktop && (
        <DREI.PointerLockControls
          ref={controls}
          onLock={() => {
            // setShowMenu(false);
            // resumeAudio();
          }}
          onUnlock={(e) => {
            // setShowMenu(true);
            // pauseAudio();
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
