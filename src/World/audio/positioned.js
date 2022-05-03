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

let oldPosition;
let oldRotation;

function initListener(camera) {
  oldPosition = new Vector3().setFromMatrixPosition(camera.matrixWorld);
  oldRotation = new Quaternion().setFromRotationMatrix(camera.matrixWorld);
}

function updateListener(camera) {
  const currentPosition = new Vector3().setFromMatrixPosition(
    camera.matrixWorld,
  );
  const newPosition = easeTransition(currentPosition, oldPosition);
  oldPosition = newPosition;

  const currentRotation = new Quaternion().setFromRotationMatrix(
    camera.matrixWorld,
  );
  const newRotation = easeTransition(currentRotation, oldRotation);
  oldRotation = newRotation;

  const scale = new Vector3().setFromMatrixScale(camera.matrixWorld);

  const matrixCam = new Matrix4().compose(newPosition, currentRotation, scale);
  audioConfig.scene.setListenerFromMatrix(matrixCam);
}

function easeTransition(current, old) {
  let result = {};
  for (const arg in current) {
    const diff = current[arg] - old[arg];
    result[arg] = old[arg] + diff / 100;
  }

  return result;
}

export { loadSFX, initListener, updateListener };
