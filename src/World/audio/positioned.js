import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';
import { createBlendsEnv } from '../components/objects/blends';

// Get the objects sound path and position
const objArray = createBlendsEnv();

// Load the sounds
async function loadSFX() {
  const urlSFX = './assets/audio/SFXtest.wav';
  let sfxBoule1;

  // TODO Mettre les 3, puis Promise.all
  await loadSample(urlSFX, audioParams.context).then((sample) => {
    // Create an object for each sound with its own properties
    sfxBoule1 = MonoSource(sample);
    sfxBoule1.playSFX();
  });

  return sfxBoule1;
}

// Get each sound its rotator and settings
const MonoSource = (sample) => {
  const source = audioParams.scene.createSource();

  const playSFX = () => {
    const soundBuffer = sample;
    const sound = audioParams.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;

    sound.connect(source.input);
    source.setPosition(10, 0, 0); // Absolute position
    // ! setFromMatrix(matrix4) // the placement in the room for spatialization
    // ! setMaxDistance()
    // ! setMinDistance()
    // ! setSourceWidth // 360 : omnidirectional source

    sound.start(0);
    sound.isPlaying = true;
  };

  return { source, playSFX };
};

export { loadSFX };
