// import { loadSample } from '../utils/fetch-audio';
import { audioConfig, createSource } from './main';

// Load the sounds
async function loadSFX(objArray) {
  let sfxBoule1 = {};
  sfxBoule1.url = './assets/audio/positioned_pad.wav';
  let sfxBoule2 = {};
  sfxBoule2.url = './assets/audio/positioned_perc.wav';
  let sfxBoule3 = {};
  sfxBoule3.url = './assets/audio/positioned_key.wav';
  const sfxArray = [sfxBoule1, sfxBoule2, sfxBoule3];

  // Create an object for each sound with its own properties
  for (let i = 0; i < objArray.length; i++) {
    sfxArray[i] = createSource(sfxArray[i].url, objArray[i]);
  }
  for (let i = 0; i < objArray.length; i++) {
    sfxArray[i].playSource();
  }

  return sfxArray;
}

function updateListener(camera) {
  audioConfig.scene.setListenerFromMatrix(camera.matrixWorld);
}

export { loadSFX, updateListener };
