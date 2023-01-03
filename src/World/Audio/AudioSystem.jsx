import { openSourceViewer } from '@atmokyaudio/websdk-dev-tools';
import { useFrame, useThree } from '@react-three/fiber';
import { isIOS, isSafari } from 'react-device-detect';
import React, { useEffect, useState } from 'react';
import { sources as sourceObjects } from './data/sources';
import AudioControls from './components/AudioControls';
import AudioSphere from './components/AudioSphere';
import useWorld from '../../stores/World';
import useAtmoky from '../../stores/Atmoky';
import useInterface from '../../stores/Interface';

let audioLoaded = false;

const AudioSystem = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const { camera } = useThree();
  const { scale } = useWorld();
  const { sources, renderer, startAudio, initAudio, updateListener } =
    useAtmoky();
  const { setShowMobileOverlay, setShowAdditionalMenu } = useInterface();

  const init = async () => {
    if (audioLoaded) return;

    const loaded = await initAudio(sourceObjects);
    if (loaded) {
      audioLoaded = true;
      setShowMobileOverlay(false);
    }
  };

  const startAfterInteraction = async () => {
    if (audioLoaded && !audioStarted) {
      const started = await startAudio();
      if (started) setAudioStarted(true);

      if (window.location.hash === '#debug') openSourceViewer(renderer);
    }
  };

  const isPlayerOutOfBox = () => {
    const { x, y, z } = camera.position;
    const { x: sx, y: sy, z: sz } = scale;

    return (
      x < -sx / 2 ||
      x > sx / 2 ||
      y < -sy / 2 ||
      y > sy / 2 ||
      z < -sz / 2 ||
      z > sz / 2
    );
  };

  const setOcclusion = (occluded) => {
    if (occluded) {
      sources.forEach((source) => {
        source.audio.setOcclusion(0.7);
      });
    } else {
      sources.forEach((source) => {
        source.audio.setOcclusion(0.0);
      });
    }
  };

  useFrame(() => {
    if (renderer) {
      updateListener(camera);
      setOcclusion(isPlayerOutOfBox());
    }
  });

  useEffect(() => {
    document.addEventListener('click', init);
    return () => document.removeEventListener('click', init);
  }, []);

  useEffect(() => {
    // Start automatically if not on Safari or iOS (which needs another interaction)
    if (audioLoaded) {
      if (!isSafari && !isIOS) {
        startAfterInteraction();
      } else {
        setShowAdditionalMenu(true, startAfterInteraction);
        //   document.addEventListener('click', start.afterIn);
        //   return () =>
        //     document.removeEventListener('click', startAfterInteraction);
      }
    }
  }, [audioLoaded]);

  return (
    <>
      {sources.map((source, i) => {
        return (
          <AudioSphere
            key={i}
            audio={source.audio}
            info={source.info}
            analyser={source.analyser}
          />
        );
      })}
      <AudioControls />
    </>
  );
};

export default AudioSystem;
