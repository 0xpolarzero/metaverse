import { Quaternion } from 'three';
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
// import { loadSample } from '../utils/fetch-audio';
import { audioConfig } from './main';

// Load the sounds
async function loadSFX(objArray) {
  const urlSFX = './assets/audio/SFXmasterTest.wav';
  let sfxBoule1 = {};
  let sfxBoule2 = {};
  let sfxBoule3 = {};
  const sfxArray = [sfxBoule1, sfxBoule2, sfxBoule3];

  // Create an object for each sound with its own properties
  for (let i = 0; i < objArray.length; i++) {
    sfxArray[i] = MonoSource(urlSFX, objArray[i]);
    sfxArray[i].playSFX();
  }

  return sfxArray;
}

// Get each sound its rotator and settings
const MonoSource = (url, obj) => {
  const audioElem = document.createElement('audio');
  audioElem.src = url;
  audioElem.crossOrigin = 'anonymous';
  audioElem.preload = 'none';
  audioElem.load();
  audioElem.loop = true;

  const audioElemSrc = audioConfig.context.createMediaElementSource(audioElem);
  const source = audioConfig.scene.createSource(audioElem);

  const playSFX = async () => {
    audioElemSrc.connect(source.input);
    source.setFromMatrix(obj.matrixWorld);
    source.setRolloff('logarithmic');
    // source.setMaxDistance(10);
    // source.setMinDistance(0);
    // source.setSourceWidth(360); // omnidirectional source

    audioElem.play();
  };

  return { source, playSFX };
};

function updateListener(camera) {
  audioConfig.scene.setListenerFromMatrix(camera.matrixWorld);
}

export { loadSFX, updateListener };
