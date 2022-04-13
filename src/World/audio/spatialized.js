import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';
import { createBlendsEnv } from '../components/objects/blends';
import * as ambisonics from 'ambisonics';

// Get the objects sound path and position
const objArray = createBlendsEnv();
let encoderSFX;
let converterSFX;

// Load the sounds
async function loadSFX() {
  encoderSFX = new ambisonics.monoEncoder(
    audioParams.context,
    audioParams.order,
  );
  converterSFX = new ambisonics.converters.wxyz2acn(audioParams.context);

  let sfxBoule1;
  const urlSFX = './assets/audio/SFXtest.wav';
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
  const rotator = new ambisonics.sceneRotator(
    audioParams.context,
    audioParams.order,
  );

  const playSFX = () => {
    const binDecoder = audioParams.getBinDecoder();

    encoderSFX.out.connect(converterSFX.in);
    converterSFX.out.connect(rotator.in);
    rotator.out.connect(binDecoder.in);

    const soundBuffer = sample;
    const sound = audioParams.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;
    sound.connect(encoderSFX.in);
    sound.start(0);
    sound.isPlaying = true;
  };

  return { rotator, playSFX };
};

// Change the sound position based on the camera position + direction and the object position
function spatializeSound(emitter, camera) {
  emitter.rotator.yaw = (camera.rotation.y * 180) / Math.PI;
  emitter.rotator.pitch = (-camera.rotation.x * 180) / Math.PI;
  emitter.rotator.roll = (-camera.rotation.z * 180) / Math.PI;
  emitter.rotator.updateRotMtx();
}

export { loadSFX, spatializeSound };
