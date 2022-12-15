import { Manager, Renderer } from '@atmokyaudio/websdk';
import { useFrame, useThree } from '@react-three/fiber';
import { useControls } from 'leva';
import React, { useEffect, useState } from 'react';
import useAtmoky from '../../stores/Atmoky';
import { sources as sourceObjects } from './data/sources';
import AudioControls from './components/AudioControls';

/**
 * ! MAKE A DIFFERENT SYSTEM
 * ! kind of audiocontext, created at first interaction from the user
 * ! which inits audio
 * ! and then creates sources for each audio
 * ! creates like AudioSphere component with both audio and mesh
 * ! for easy reuse
 */

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let renderer;
let manager = new Manager();

const Audio = () => {
  const { camera } = useThree();
  const {
    sources,
    setSources,
    reverbAmount,
    externalizerAmount,
    externalizerIntensity,
  } = useAtmoky();

  const initAudio = () => {
    const numSources = sourceObjects.length;

    // Prepare renderer
    manager
      .prepareContext(audioContext)
      .then(() => {
        renderer = manager.createRenderer(numSources);
        renderer.connect(audioContext.destination, 0, 0);
        console.log('Audio initialized');
      })
      .then(() => {
        // Set renderer parameters
        renderer.reverb.amount.value = reverbAmount || 20;
        renderer.externalizer.amount.value = externalizerAmount || 30;
        renderer.externalizer.character.value = externalizerIntensity || 30;
      })
      .then(() => {
        for (const src of sourceObjects) {
          const source = createSource(src.url, src.info);
          setSources([...sources, source]);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  const createSource = (url, info) => {
    const audioElem = document.createElement('audio');
    audioElem.src = url;
    audioElem.crossOrigin = 'anonymous';
    audioElem.preload = 'none';
    audioElem.load();
    audioElem.loop = true;

    const audioElemSrc = audioContext.createMediaElementSource(audioElem);

    let source = renderer.createSource();
    source.setInput(audioElemSrc);
    source.setPosition(info.position.x, info.position.y, info.position.z);

    audioElem.play();

    return source;
  };

  const resumeAudio = () => {
    if (audioContext.state === 'suspended')
      audioContext.resume().catch((err) => {
        console.log(err);
      });
  };

  // Suspend audio after tab out
  const stopAudio = () => {
    if (audioContext.state === 'running')
      audioContext.suspend().catch((err) => {
        console.log(err);
      });
  };

  const resetAudio = () => {
    for (const source of sources) {
      renderer.removeSource(source);
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
    initAudio();
  }, []);

  return (
    <>
      <AudioControls />
    </>
  );
};

export default Audio;
