import { loadAmbientMusic } from './static';
// import { ResonanceAudio } from 'resonance-audio';
import { ResonanceAudio } from './resonance-audio';
// import { default as Omnitone } from 'omnitone/build/omnitone.esm';
import { displayNotif } from '../utils/notification';
import { loadSFX } from './positioned';

const order = 1;
const outputMode = 'binaural';
const sources = [];

// Initiate audio context
const audioContext = window.AudioContext || window.webkitAudioContext;

const audioConfig = {
  context: new audioContext(),
  sources: sources,
};

// Set up the audio scene (after user interaction)
async function createAudioScene(envArray) {
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

  // Load the sounds
  loadAmbientMusic();
  loadSFX(envArray);
  // Play it
  for (const source of audioConfig.sources) {
    source.play();
  }
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

const createSource = (url, obj) => {
  const audioElem = document.createElement('audio');
  audioElem.src = url;
  audioElem.crossOrigin = 'anonymous';
  audioElem.preload = 'none';
  audioElem.load();
  audioElem.loop = true;

  const audioElemSrc = audioConfig.context.createMediaElementSource(audioElem);
  const source = audioConfig.scene.createSource(audioElem);

  const playSource = async () => {
    if (obj !== null) {
      audioElemSrc.connect(source.input);
      source.setFromMatrix(obj.matrixWorld);
    } else {
      audioElemSrc.connect(audioConfig.scene.listener.renderer.input);
    }
    // source.setRolloff('logarithmic');
    // source.setMaxDistance(10);
    // source.setMinDistance(0);
    // source.setSourceWidth(360); // omnidirectional source

    audioConfig.sources.push(audioElem);
  };

  return { source, playSource };
};

export { createAudioScene, audioConfig, createSource, resumeAudio, stopAudio };
