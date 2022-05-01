import { loadAmbientMusic } from './static';
// import { ResonanceAudio } from 'resonance-audio';
import { ResonanceAudio } from './resonance-audio';
// import { default as Omnitone } from 'omnitone/build/omnitone.esm';
import { displayNotif } from '../utils/notification';

const order = 1;
const outputMode = 'binaural';

// Initiate audio context
const audioContext = window.AudioContext || window.webkitAudioContext;

let audioConfig = {
  context: new audioContext(),
};

// Set up the audio scene (after user interaction)
async function createAudioScene() {
  // Set the audio scene
  const audioScene = new ResonanceAudio(audioConfig.context, {
    ambisonicOrder: order,
  });
  audioScene.output.connect(audioConfig.context.destination);
  audioConfig.scene = audioScene;

  // Set the audio context output mode
  audioConfig.context.channelCount = setOutputMode(outputMode, order);

  // Set the room parameters
  const room = {
    dimensions: {
      width: 35.3,
      height: 7,
      depth: 41.3,
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
  // audioScene.setRoomProperties(room.dimensions, room.materials);

  // Launch the sounds
  loadAmbientMusic();

  return audioScene;
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
  if (audioConfig.context.state === 'suspended')
    audioConfig.context.resume().catch((err) => {
      console.log(err);
    });
}

// Suspend audio after tab out
function stopAudio() {
  if (audioConfig.context.state === 'running')
    audioConfig.context.suspend().catch((err) => {
      console.log(err);
    });
}

export { createAudioScene, audioConfig, resumeAudio, stopAudio };
