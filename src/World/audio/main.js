import { loadAmbientMusic } from './static';
import { loadSFX } from './spatialized';
import * as ambisonics from 'ambisonics';

const AudioContext = window.AudioContext || window.webkitAudioContext;
let converter;

const audioParams = {
  context: new AudioContext(),
  order: 1,
  getConverter: function () {
    return converter;
  },
};

function initAudio() {
  const context = audioParams.context;
  const order = audioParams.order;

  converter = new ambisonics.converters.wxyz2acn(context);
  //   const rotator = new ambisonics.sceneRotator(context, order);
  const binDecoder = new ambisonics.binDecoder(context, order);
  const outGain = context.createGain();

  converter.out.connect(binDecoder.in);
  // rotator.out.connect(binDecoder.in);
  binDecoder.out.connect(outGain);
  outGain.connect(context.destination);

  // Start the sound after user interaction (usually unlock the screen and start exploring)
  document.addEventListener('click', loadAmbientMusic);
  document.addEventListener('click', loadSFX);

  console.log('pop');
}

function resumeAudio() {
  if (audioParams.context.state === 'suspended')
    audioParams.context.resume().catch((err) => {
      console.log(err);
    });
}

function stopAudio() {
  if (audioParams.context.state === 'running')
    audioParams.context.suspend().catch((err) => {
      console.log(err);
    });
}

export { initAudio, audioParams, resumeAudio, stopAudio };
