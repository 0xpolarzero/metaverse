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
    name: 'Backwards Piano',
    url: '../../../asset/audio/Instru_stems-chords.mp3',
    position: getRandomPosition(),
    color: colors.chords,
  },
  {
    name: 'Bass',
    url: '../../../asset/audio/Instru_stems-bass.mp3',
    position: getRandomPosition(),
    color: colors.bass,
  },
  {
    name: 'Kick (Drums)',
    url: '../../../asset/audio/Instru_stems-kick.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Snare (Drums)',
    url: '../../../asset/audio/Instru_stems-snare.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Hi Hat (Drums)',
    url: '../../../asset/audio/Instru_stems-hats.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Hi Hat 2 (Drums)',
    url: '../../../asset/audio/Instru_stems-hats-2.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Rim (Drums)',
    url: '../../../asset/audio/Instru_stems-rim.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Perc (Drums)',
    url: '../../../asset/audio/Instru_stems-perc.mp3',
    position: getRandomPosition(),
    color: colors.drums,
  },
  {
    name: 'Trance Lead',
    url: '../../../asset/audio/Instru_stems-lead.mp3',
    position: getRandomPosition(),
    color: colors.lead,
  },
];
