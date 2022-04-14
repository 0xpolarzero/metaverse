import { loadAmbientMusic } from './static';
// import { ResonanceAudio } from 'resonance-audio';
import { ResonanceAudio } from './resonance-audio';
// import { default as Omnitone } from 'omnitone/build/omnitone.esm';
import { displayNotif } from '../utils/notification';

const order = 1;
const outputMode = 'binaural';

// Initiate audio context
const audioContext = window.AudioContext || window.webkitAudioContext;

let audioParams = {
  context: new audioContext(),
};

// Set up the audio scene (after user interaction)
async function createAudioScene() {
  // Set the audio scene
  const audioScene = new ResonanceAudio(audioParams.context, {
    ambisonicOrder: order,
  });
  audioScene.output.connect(audioParams.context.destination);
  audioParams.scene = audioScene;

  /*  // Setup the static ambisonic rendering
  audioParams.foaRenderer = Omnitone.createFOARenderer(audioParams.context);
  await audioParams.foaRenderer.initialize().catch((err) => {
    displayNotif('error', 'The renderer could not be initialized');
    console.log(err);
  });
  audioParams.foaRenderer.output.connect(audioParams.context.destination); */

  // Set the audio context output mode
  audioParams.context.channelCount = setOutputMode(outputMode, order);

  // Set the room parameters
  const room = {
    dimensions: {
      width: 15,
      height: 10,
      depth: 30,
    },
    materials: {
      left: 'brick-bare',
      right: 'curtain-heavy',
      front: 'marble',
      back: 'glass-thin',
      down: 'grass',
      up: 'transparent',
    },
  };

  // Set the audio scene acoustic properties
  audioScene.setRoomProperties(room.dimensions, room.materials);

  // Launch the sounds
  loadAmbientMusic();
}

function setOutputMode(mode, order) {
  if (mode === 'binaural') {
    return 2;
  } else {
    return Math.pow(order + 1, 2);
  }
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

export { createAudioScene, audioParams, resumeAudio, stopAudio };
