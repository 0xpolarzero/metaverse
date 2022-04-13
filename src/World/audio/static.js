import { loadSample } from '../utils/fetch-audio';
import { displayNotif } from '../utils/notification';
import { audioParams } from './main';

async function loadAmbientMusic() {
  const urlAmbient = './assets/audio/ExtinctionAmb4ch.wav';
  await loadSample(urlAmbient, audioParams.context)
    .then((sample) => playAmbientMusic(sample))
    .catch((err) => {
      console.log(err);
      displayNotif('error', err);
    });

  document.removeEventListener('click', loadAmbientMusic);
}

const playAmbientMusic = (decodedBuffer) => {
  const converter = audioParams.getConverter();

  const soundBuffer = decodedBuffer;
  const sound = audioParams.context.createBufferSource();
  sound.buffer = soundBuffer;
  sound.loop = true;
  sound.connect(converter.in);
  sound.start(0);
  sound.isPlaying = true;
};

export { loadAmbientMusic };
