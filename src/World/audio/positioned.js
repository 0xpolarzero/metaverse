import { loadSample } from '../utils/fetch-audio';
import { audioConfig } from './main';

// Load the sounds
async function loadSFX(objArray) {
  const urlSFX = './assets/audio/SFXmasterTest.wav';
  let sfxBoule1 = {};
  let sfxBoule2 = {};
  let sfxBoule3 = {};
  const sfxArray = [sfxBoule1, sfxBoule2, sfxBoule3];

  // TODO LOAD IT STREAMING NOT ASYNC
  await loadSample(urlSFX, audioConfig.context).then((sample) => {
    // Create an object for each sound with its own properties
    for (let i = 0; i < objArray.length; i++) {
      sfxArray[i] = MonoSource(sample, objArray[i]);
      sfxArray[i].playSFX();
    }
  });

  return sfxArray;
}

// Get each sound its rotator and settings
const MonoSource = (sample, obj) => {
  const source = audioConfig.scene.createSource();

  const playSFX = async () => {
    const soundBuffer = sample;
    const sound = audioConfig.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;

    sound.connect(source.input);
    source.setFromMatrix(obj.matrixWorld);
    source.setRolloff('logarithmic');
    // source.setMaxDistance(10);
    // source.setMinDistance(0);
    // source.setSourceWidth(360); // omnidirectional source

    sound.start(0);
    sound.isPlaying = true;
    source.setGain(0);
  };

  return { source, playSFX };
};

function updateListener(camera) {
  audioConfig.scene.setListenerFromMatrix(camera.matrixWorld);
}

export { loadSFX, updateListener };
