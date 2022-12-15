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
    url: '../../../asset/audio/Instru_stems-chords.mp3',
    info: {
      name: 'Backwards Piano',
      position: getRandomPosition(),
      color: colors.chords,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-bass.mp3',
    info: {
      name: 'Bass',
      position: getRandomPosition(),
      color: colors.bass,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-kick.mp3',
    info: {
      name: 'Kick (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-snare.mp3',
    info: {
      name: 'Snare (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-hats.mp3',
    info: {
      name: 'Hi Hat (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-hats-2.mp3',
    info: {
      name: 'Hi Hat 2 (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-rim.mp3',
    info: {
      name: 'Rim (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-perc.mp3',
    info: {
      name: 'Perc (Drums)',
      position: getRandomPosition(),
      color: colors.drums,
    },
  },
  {
    url: '../../../asset/audio/Instru_stems-lead.mp3',
    info: {
      name: 'Trance Lead',
      position: getRandomPosition(),
      color: colors.lead,
    },
  },
];
