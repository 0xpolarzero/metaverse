import backwardsPiano from '../../../asset/audio/Instru_stems-chords.mp3';
import bass from '../../../asset/audio/Instru_stems-bass.mp3';
import kick from '../../../asset/audio/Instru_stems-kick.mp3';
import snare from '../../../asset/audio/Instru_stems-snare.mp3';
import hats from '../../../asset/audio/Instru_stems-hats.mp3';
import hats2 from '../../../asset/audio/Instru_stems-hats-2.mp3';
import rim from '../../../asset/audio/Instru_stems-rim.mp3';
import perc from '../../../asset/audio/Instru_stems-perc.mp3';
import trancePad from '../../../asset/audio/Instru_stems-trance-pad.mp3';

const getRandomPosition = () => {
  return {
    x: Math.random() * 20 - 10,
    y: Math.random() * 4 + 1,
    z: Math.random() * 20 - 10,
  };
};

const colors = {
  chords: 'purple',
  bass: 'red',
  drums: 'white',
  lead: 'yellow',
};

export const sources = [
  {
    src: backwardsPiano,
    info: {
      name: 'Backwards Piano',
      position: getRandomPosition(),
      color: colors.chords,
    },
  },
  {
    src: bass,
    info: {
      name: 'Bass',
      position: getRandomPosition(),
      color: colors.bass,
    },
  },
  {
    src: kick,
    info: {
      name: 'Kick (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: snare,
    info: {
      name: 'Snare (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: hats,
    info: {
      name: 'Hi Hat (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: hats2,
    info: {
      name: 'Hi Hat 2 (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: rim,
    info: {
      name: 'Rim (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: perc,
    info: {
      name: 'Perc (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    src: trancePad,
    info: {
      name: 'Trance Lead',
      position: getRandomPosition(),
      color: colors.lead,
    },
  },
];
