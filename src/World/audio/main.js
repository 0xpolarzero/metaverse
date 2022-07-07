import { Manager, Renderer } from '@atmokyaudio/websdk';
import { openSourceViewer } from '@atmokyaudio/websdk-dev-tools';

// Initiate audio
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let renderer;
let manager = new Manager();

let sources = [];
let sourcesUrl = [
  './assets/audio/positioned_pad.wav',
  './assets/audio/positioned_perc.wav',
  './assets/audio/positioned_key.wav',
];

// Set up the audio scene (after user interaction)
async function createAudioScene(envArray) {
  manager
    .prepareContext(audioContext)
    .then(() => {
      let numSources = 3;
      renderer = manager.createRenderer(numSources);
      renderer.connect(audioContext.destination, 0, 0);
      console.log('Audio setup complete');

      console.log(renderer.attenuationCurve.getParameters());
      renderer.attenuationCurve.setParameters(1, 0, 10, -20, 50, -60, 60);

      renderer.reverb.amount.value = 20;
      renderer.externalizer.amount.value = 30;
      renderer.externalizer.character.value = 70;

      // openSourceViewer(renderer);
    })
    .then(() => {
      for (let i = 0; i < sourcesUrl.length; i++) {
        const source = createSource(sourcesUrl[i], envArray[i]);
        sources.push(source);
      }
    })
    .catch((err) => {
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

  const audioElemSrc = audioContext.createMediaElementSource(audioElem);

  let source = renderer.createSource();
  source.setInput(audioElemSrc);
  source.setPosition(obj.position.x, obj.position.y, obj.position.z);

  audioElem.play();

  return source;
};

// Restart audio after tab in
function resumeAudio() {
  if (audioContext.state === 'suspended')
    audioContext.resume().catch((err) => {
      console.log(err);
    });
}

// Suspend audio after tab out
function stopAudio() {
  if (audioContext.state === 'running')
    audioContext.suspend().catch((err) => {
      console.log(err);
    });
}

function updateListener(camera) {
  if (!renderer) return;

  renderer.listener.setPosition(
    camera.position.x,
    camera.position.y,
    camera.position.z,
  );

  renderer.listener.setRotation(
    camera.rotation.y + Math.PI / 2,
    camera.rotation.x,
    camera.rotation.z,
  );
}

export { createAudioScene, resumeAudio, stopAudio, updateListener };
