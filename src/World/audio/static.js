import { loadSample } from '../utils/fetch-audio';
import { displayNotif } from '../utils/notification';
import { audioParams } from './main';
import * as ambisonics from 'ambisonics';

// Load the ambient sound
async function loadAmbientMusic() {
  const urlAmbient = './assets/audio/ExtinctionAmb4ch.wav';
  await loadSample(urlAmbient, audioParams.context)
    .then((sample) => playAmbientMusic(sample))
    .catch((err) => {
      console.log(err);
      displayNotif('error', err);
    });
}

// Play it after the sample was fetched
const playAmbientMusic = (decodedBuffer) => {
  const converterAmb = new ambisonics.converters.wxyz2acn(audioParams.context);
  const binDecoder = audioParams.getBinDecoder();
  converterAmb.out.connect(binDecoder.in);

  const soundBuffer = decodedBuffer;
  const sound = audioParams.context.createBufferSource();
  sound.buffer = soundBuffer;
  sound.loop = true;
  sound.connect(converterAmb.in);
  sound.start(0);
  sound.isPlaying = true;
};

export { loadAmbientMusic };
