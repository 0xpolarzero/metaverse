import { Quaternion } from 'three';
import { Vector3 } from 'three';
import { Matrix4 } from 'three';
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
  };

  return { source, playSFX };
};

let oldPosition;
let oldRotation;
let newRotation = new Quaternion();

function initListener(camera) {
  oldPosition = new Vector3().setFromMatrixPosition(camera.matrixWorld);
  oldRotation = new Quaternion().setFromRotationMatrix(camera.matrixWorld);
}

function updateListener(camera) {
  // console.log(camera.rotation);
  // Get the camera rotation
  // Access the old rotation
  // if camera rotation too much > old rotation
  // new rotation = camera rotation - old rotation / coeff (proportional with how much camera > old)
  // else if camera rotation not too much > old rotation
  // new rotation = camera rotation
  // ! BETTER : always line 58 (no else) : just the coeff is like 1

  const currentPosition = new Vector3().setFromMatrixPosition(
    camera.matrixWorld,
  );
  const newPosition = getVectorDiff(currentPosition, oldPosition);
  oldPosition = newPosition;

  const rotation = new Quaternion().setFromRotationMatrix(camera.matrixWorld);
  const scale = new Vector3().setFromMatrixScale(camera.matrixWorld);

  const matrixCam = new Matrix4().compose(newPosition, rotation, scale);
  audioConfig.scene.setListenerFromMatrix(matrixCam);

  // * vector3.setFromMatrixPosition // position
  // * quaternion.setFromRotationMatrix // rotation - quaternion
  // * vector3.setFromMatrixScale // scale
  // * matrix4.compose(position, quaternion, scale)

  // audioConfig.scene.setListenerFromMatrix(camera.matrixWorld);

  // oldRotation = quat;
}

function getVectorDiff(newVector, oldVector) {
  const x = newVector['x'] - oldVector['x'];
  const y = newVector['y'] - oldVector['y'];
  const z = newVector['z'] - oldVector['z'];

  const result = new Vector3(
    oldVector['x'] + x / 1000,
    oldVector['y'] + y / 1000,
    oldVector['z'] + z / 1000,
  );

  return result;
}

export { loadSFX, initListener, updateListener };
