import * as ambisonics from 'ambisonics';
import { displayNotif } from '../utils/notification';
import { loadSample } from '../utils/fetch-audio';

const AudioContext = window.AudioContext || window.webkitAudioContext;
const context = new AudioContext();
const order = 1;
let sound;

const rotator = new ambisonics.sceneRotator(context, order);
const binDecoder = new ambisonics.binDecoder(context, order);
const converter = new ambisonics.converters.wxyz2acn(context);
const outGain = context.createGain();

function initAudio() {
  // Handle resume if suspension
  context.onstatechange = function () {
    if (context.state === 'suspended') {
      context.resume();
    }
  };

  converter.out.connect(rotator.in);
  rotator.out.connect(binDecoder.in);
  binDecoder.out.connect(outGain);
  outGain.connect(context.destination);

  playAmbientMusic();

  // Start the ambient sound after user interaction (usually unlock the screen and start exploring)
  document.addEventListener('click', playAmbientMusic);
}

async function playAmbientMusic() {
  const urlAmbient = './assets/audio/ExtinctionAmb4ch.wav';
  await loadSample(urlAmbient, context).then((sample) => playSample(sample));

  document.removeEventListener('click', playAmbientMusic);
}

const playSample = (decodedBuffer) => {
  const soundBuffer = decodedBuffer;
  sound = context.createBufferSource();
  sound.buffer = soundBuffer;
  sound.loop = true;
  sound.connect(converter.in);
  sound.start(0);
  sound.isPlaying = true;
};

export { initAudio };
