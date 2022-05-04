import { Quaternion } from 'three';
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
// import { loadSample } from '../utils/fetch-audio';
import { audioConfig, createSource } from './main';

// Load the sounds
async function loadSFX(objArray) {
  let sfxBoule1 = {};
  sfxBoule1.url = './assets/audio/drums.ogg';
  let sfxBoule2 = {};
  sfxBoule2.url = './assets/audio/guitar.ogg';
  let sfxBoule3 = {};
  sfxBoule3.url = './assets/audio/perc.ogg';
  const sfxArray = [sfxBoule1, sfxBoule2, sfxBoule3];

  // Create an object for each sound with its own properties
  for (let i = 0; i < objArray.length; i++) {
    sfxArray[i] = createSource(sfxArray[i].url, objArray[i]);
    sfxArray[i].playSource();
  }

  return sfxArray;
}

function updateListener(camera) {
  audioConfig.scene.setListenerFromMatrix(camera.matrixWorld);
}

export { loadSFX, updateListener };
