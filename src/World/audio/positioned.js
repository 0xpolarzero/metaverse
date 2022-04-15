import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';

// Load the sounds
async function loadSFX(objArray) {
  const urlSFX = './assets/audio/SFXtest.wav';
  let sfxBoule1 = {};
  let sfxBoule2 = {};
  let sfxBoule3 = {};
  const sfxArray = [sfxBoule1, sfxBoule2, sfxBoule3];

  // TODO Mettre les 3, puis Promise.all
  await loadSample(urlSFX, audioParams.context).then((sample) => {
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
  const source = audioParams.scene.createSource();

  const playSFX = async () => {
    const soundBuffer = sample;
    const sound = audioParams.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;

    sound.connect(source.input);
    source.setPosition(obj.position.x, obj.position.y, obj.position.z); // Absolute position
    source.setMaxDistance(10);
    source.setMinDistance(1);
    // ! setSourceWidth // 360 : omnidirectional source

    sound.start(0);
    sound.isPlaying = true;
  };

  return { source, playSFX };
};

function updateListener(camera) {
  audioParams.scene.setListenerFromMatrix(camera.matrixWorld);
}

export { loadSFX, updateListener };
