import { loadAmbientMusic } from './static';
import { loadSFX } from './spatialized';
import * as ambisonics from 'ambisonics';

// Initiate audio context
const AudioContext = window.AudioContext || window.webkitAudioContext;
let binDecoder;

// Settings object for global audio
const audioParams = {
  context: new AudioContext(),
  order: 1,
  getBinDecoder: function () {
    return binDecoder;
  },
};

// Set up the initial audio config (after user interaction)
function getAudioReady() {
  const context = audioParams.context;
  const order = audioParams.order;
  const outGain = context.createGain();

  binDecoder = new ambisonics.binDecoder(context, order);
  binDecoder.out.connect(outGain);
  outGain.connect(context.destination);

  loadAmbientMusic();
}

// Restart audio after tab in
function resumeAudio() {
  if (audioParams.context.state === 'suspended')
    audioParams.context.resume().catch((err) => {
      console.log(err);
    });
}

// Suspend audio after tab out
function stopAudio() {
  if (audioParams.context.state === 'running')
    audioParams.context.suspend().catch((err) => {
      console.log(err);
    });
}

export { getAudioReady, audioParams, resumeAudio, stopAudio };
