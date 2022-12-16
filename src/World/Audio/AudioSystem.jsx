import { useFrame, useThree } from '@react-three/fiber';
import React, { useEffect, useState } from 'react';
import { sources as sourceObjects } from './data/sources';
import AudioControls from './components/AudioControls';
import AudioSphere from './components/AudioSphere';
import useAtmoky from '../../stores/Atmoky';
import useInterface from '../../stores/Interface';

let audioLoaded = false;

const AudioSystem = () => {
  const [audioStarted, setAudioStarted] = useState(false);
  const { camera } = useThree();
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
        return <AudioSphere key={i} audio={source.audio} info={source.info} />;
      })}
    </>
  );
};

export default AudioSystem;
