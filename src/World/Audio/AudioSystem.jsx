import { useFrame, useThree } from '@react-three/fiber';
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
  const { sources, renderer, startAudio, initAudio } = useAtmoky();
  const { setShowMobileOverlay } = useInterface();

  const init = async () => {
    if (audioLoaded) return;
    const started = await initAudio(sourceObjects);
    if (started) {
      audioLoaded = true;
      setShowMobileOverlay(false);
    }
  };

  const startAfterInteraction = async () => {
    if (audioLoaded && !audioStarted) {
      const started = await startAudio();
      if (started) setAudioStarted(true);
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
        source.audio.setOcclusion(1.0);
      });
    } else {
      sources.forEach((source) => {
        source.audio.setOcclusion(0.0);
      });
    }
  };

  useFrame(() => {
    if (renderer) {
      renderer.listener.setPosition(
        camera.position.x,
        camera.position.y,
        camera.position.z,
      );
      renderer.listener.setRotation(
        camera.rotation.y + Math.PI / 2,
        camera.rotation.x,
        camera.rotation.z,
      );

      setOcclusion(isPlayerOutOfBox());
    }
  });

  useEffect(() => {
    // Start audio after user interaction
    document.addEventListener('click', init);
    return () => document.removeEventListener('click', init);
  }, []);

  useEffect(() => {
    if (audioLoaded) {
      startAfterInteraction();
    }
  }, [audioLoaded]);

  return (
    <>
      <AudioControls />
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
    </>
  );
};

export default AudioSystem;
