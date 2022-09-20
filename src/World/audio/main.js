import { Manager, Renderer } from '@atmokyaudio/websdk';
// import { openSourceViewer } from '@atmokyaudio/websdk-dev-tools';

// Initiate audio
const AudioContext = window.AudioContext || window.webkitAudioContext;
let audioContext = new AudioContext();
let renderer;
let manager = new Manager();

let sources = [];
let sourcesUrl = [
  './assets/audio/Instru_stems-chords.mp3',
  './assets/audio/Instru_stems-bass.mp3',
  './assets/audio/Instru_stems-kick.mp3',
  './assets/audio/Instru_stems-snare.mp3',
  './assets/audio/Instru_stems-hats.mp3',
  './assets/audio/Instru_stems-hats-2.mp3',
  './assets/audio/Instru_stems-rim.mp3',
  './assets/audio/Instru_stems-perc.mp3',
  './assets/audio/Instru_stems-trance-pad.mp3',
  // './assets/audio/Instru_stems_VX-main.mp3',
  // './assets/audio/Instru_stems_VX-adlib.mp3',
  // './assets/audio/Instru_stems_VX-backs.mp3',
  // './assets/audio/Instru_stems_VX-amb.mp3',
];

// Set up the audio scene (after user interaction)
async function createAudioScene() {
  const objInfos = [
    {
      type: 'Chords',
      position: { x: 4, y: -3.5, z: 8 },
      speed: 35,
      color: 'purple',
    },
    {
      type: 'Bass',
      position: { x: 0, y: 0, z: 7 },
      speed: 35,
      color: 'red',
    },
    {
      type: 'Kick',
      position: { x: 1.25, y: -1, z: 8 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Snare',
      position: { x: -1.25, y: -1, z: 8 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Hats',
      position: { x: -6, y: -2.5, z: 6 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Hats 2',
      position: { x: 6, y: -2.5, z: 6 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Rim',
      position: { x: 7, y: -1.5, z: 12 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Percs',
      position: { x: -7, y: -1.5, z: 12 },
      speed: 35,
      color: 'blue',
    },
    {
      type: 'Trance Pad',
      position: { x: -4, y: -3.5, z: 8 },
      speed: 35,
      color: 'green',
    },
    // {
    //   type: 'VX Main',
    //   position: { x: 0, y: -3.5, z: 6 },
    //   speed: 35,
    //   color: 'rose',
    // },
    // {
    //   type: 'VX Adlib',
    //   position: { x: 0, y: -2, z: 14 },
    //   speed: 35,
    //   color: 'yellow',
    // },
    // {
    //   type: 'VX Backs',
    //   position: { x: 2, y: 4, z: 16 },
    //   speed: 35,
    //   color: 'yellow',
    // },
    // {
    //   type: 'VX Ambient',
    //   position: { x: -2, y: 4, z: 16 },
    //   speed: 35,
    //   color: 'yellow',
    // },
  ];

  manager
    .prepareContext(audioContext)
    .then(() => {
      let numSources = 9;
      renderer = manager.createRenderer(numSources);
      renderer.connect(audioContext.destination, 0, 0);
      console.log('Audio setup complete');

      // renderer.attenuationCurves.setParameters(1, 0, 10, -20, 50, -60, 60);

      renderer.reverb.amount.value = 20;
      renderer.externalizer.amount.value = 30;
      renderer.externalizer.character.value = 70;

      // openSourceViewer(renderer);
    })
    .then(() => {
      for (let i = 0; i < sourcesUrl.length; i++) {
        const source = createSource(sourcesUrl[i], objInfos[i]);
        sources.push(source);
      }
    })
    .catch((err) => {
      console.log(err);
    });

  return objInfos;
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
