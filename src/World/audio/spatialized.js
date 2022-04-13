import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';
import { createBlendsEnv } from '../components/objects/blends';
import * as ambisonics from 'ambisonics';

const objArray = createBlendsEnv();
let encoder;

async function loadSFX() {
  const urlSFX = './assets/audio/SFXtest.wav';
  // Mettre les 3, puis Promise.all
  await loadSample(urlSFX, audioParams.context).then((sample) => {
    const sfxBoule1 = MonoSource(sample);
    console.log(sfxBoule1);
    sfxBoule1.playSFX();
  });

  document.removeEventListener('click', loadSFX);
}

const MonoSource = (sample) => {
  const encoder = new ambisonics.monoEncoder(
    audioParams.context,
    audioParams.order,
  );

  const playSFX = () => {
    console.log(sample);
    const converter = audioParams.getConverter();

    const soundBuffer = sample;
    const sound = audioParams.context.createBufferSource();
    sound.buffer = soundBuffer;
    sound.loop = true;
    sound.connect(encoder.in);
    encoder.out.connect(converter.in);
    sound.start(0);
    sound.isPlaying = true;
  };

  return { encoder, playSFX };
};

function spatializeSound() {
  encoder.azim = angleXY[0];
  encoder.elev = angleXY[1];
  encoder.updateGains();
}

// Encoder

// TODO encoder.azim = // Value in degrees
// TODO encoder.elev = // Value in degrees
// TODO encoder.updateGains();

export { loadSFX };
