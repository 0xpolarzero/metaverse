import { loadSample } from '../utils/fetch-audio';
import { audioParams } from './main';
import { displayNotif } from '../utils/notification';

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
  const soundBuffer = decodedBuffer;
  const sound = audioParams.context.createBufferSource();
  sound.buffer = soundBuffer;
  sound.loop = true;

  sound.connect(audioParams.foaRenderer.input);

  sound.start(0);
  sound.isPlaying = true;
};

export { loadAmbientMusic };
