import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';
import { createBlendsEnv } from '../components/objects/blends';
import * as ambisonics from 'ambisonics';

// Get the objects sound path and position
const objArray = createBlendsEnv();
let encoder;
let converterSFX;

// Load the sounds
async function loadSFX() {
  let sfxBoule1;
  encoder = new ambisonics.monoEncoder(audioParams.context, audioParams.order);
  converterSFX = new ambisonics.converters.wxyz2acn(audioParams.context);
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

    encoder.out.connect(converterSFX.in);
    converterSFX.out.connect(rotator.in);
    rotator.out.connect(binDecoder.in);

    const soundBuffer = sample;
    const sound = audioParams.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;
    sound.connect(encoder.in);
    sound.start(0);
    sound.isPlaying = true;
  };

  return { rotator, playSFX };
};

export { loadSFX };
