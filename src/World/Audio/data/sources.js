// Instru
import backwardsPiano from '../../../asset/audio/Instru_stems-chords.mp3';
import bass from '../../../asset/audio/Instru_stems-bass.mp3';
import kick from '../../../asset/audio/Instru_stems-kick.mp3';
import snare from '../../../asset/audio/Instru_stems-snare.mp3';
import hats from '../../../asset/audio/Instru_stems-hats.mp3';
import hats2 from '../../../asset/audio/Instru_stems-hats-2.mp3';
import rim from '../../../asset/audio/Instru_stems-rim.mp3';
import perc from '../../../asset/audio/Instru_stems-perc.mp3';
import trancePad from '../../../asset/audio/Instru_stems-trance-pad.mp3';
// Voices
import vxMain from '../../../asset/audio/Instru_stems_VX-main.mp3';
import vxBacks from '../../../asset/audio/Instru_stems_VX-backs.mp3';
import vxAmb from '../../../asset/audio/Instru_stems_VX-amb.mp3';
import vxAdlib from '../../../asset/audio/Instru_stems_VX-adlib.mp3';

import defaults from '../../../defaults.config';
const DEFAULT_SCALE = defaults.world.scale;

export const getRandomPosition = (scale = DEFAULT_SCALE) => {
  const factor = scale.x / DEFAULT_SCALE.x;

  return {
    x: (Math.random() * 20 - 10) * factor,
    y: Math.random() * 4 + 1,
    z: (Math.random() * 20 - 10) * factor,
  };
};

export const sources = [
  {
    src: backwardsPiano,
    info: {
      name: 'Backwards Piano',
      position: getRandomPosition(),
      type: 'chords',
    },
  },
  {
    src: bass,
    info: {
      name: 'Bass',
      position: getRandomPosition(),
      type: 'bass',
    },
  },
  {
    src: kick,
    info: {
      name: 'Kick (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: snare,
    info: {
      name: 'Snare (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: hats,
    info: {
      name: 'Hi Hat (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: hats2,
    info: {
      name: 'Hi Hat 2 (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: rim,
    info: {
      name: 'Rim (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: perc,
    info: {
      name: 'Perc (Drums)',
      position: getRandomPosition(),
      type: 'drums',
    },
  },
  {
    src: trancePad,
    info: {
      name: 'Trance Lead',
      position: getRandomPosition(),
      type: 'lead',
    },
  },
  {
    src: vxMain,
    info: {
      name: 'Main (voice)',
      position: getRandomPosition(),
      type: 'vx',
    },
  },
  {
    src: vxBacks,
    info: {
      name: 'Backs (voice)',
      position: getRandomPosition(),
      type: 'vx',
    },
  },
  {
    src: vxAmb,
    info: {
      name: 'Ambient (voice)',
      position: getRandomPosition(),
      type: 'vx',
    },
  },
  {
    src: vxAdlib,
    info: {
      name: 'Adlib (voice)',
      position: getRandomPosition(),
      type: 'vx',
    },
  },
];
