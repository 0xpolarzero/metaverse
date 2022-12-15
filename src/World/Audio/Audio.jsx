// import { Manager, Renderer } from '@atmokyaudio/websdk';
import { Manager, Renderer } from '@atmokyaudio/websdk';
import { useEffect } from 'react';
import useAtmoky from '../../stores/Atmoky';
import { sources as sourceObjects } from './data/sources';

const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let renderer;
let manager = new Manager();

const Audio = () => {
  const { sources, setSources } = useAtmoky();

  const initAudio = () => {
    const numSources = sourceObjects.length;

    manager.prepareContext(audioContext).then(() => {
      renderer = manager.createRenderer(numSources);
      renderer.connect(audioContext.destination, 0, 0);
      console.log('Audio initialized');
    });
  };

  useEffect(() => {
    initAudio();
  }, []);

  return null;
};

export default Audio;
