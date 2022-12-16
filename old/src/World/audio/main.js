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
async function createAudioScene(status) {
  const objInfos = [
    {
      type: 'Backwards Piano',
      position:
        status === 'random' ? getRandomPosition() : { x: 4, y: -3.5, z: -1 },
      speed: 5,
      color: 'purple',
    },
    {
      type: 'Bass',
      position:
        status === 'random' ? getRandomPosition() : { x: 0, y: 0, z: -2 },
      speed: 5,
      color: 'red',
    },
    {
      type: 'Kick (Drums)',
      position:
        status === 'random' ? getRandomPosition() : { x: 1.25, y: -1, z: -1 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Snare (Drums)',
      position:
        status === 'random' ? getRandomPosition() : { x: -1.25, y: -1, z: -1 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Hi Hat (Drums)',
      position:
        status === 'random' ? getRandomPosition() : { x: -6, y: -2.5, z: 2 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Hi Hat 2 (Drums)',
      position:
        status === 'random' ? getRandomPosition() : { x: 6, y: -2.5, z: 2 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Rim (Drums)',
      position:
        status === 'random' ? getRandomPosition() : { x: 5, y: -1.5, z: 7 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Perc (Drum)',
      position:
        status === 'random' ? getRandomPosition() : { x: -5, y: -1.5, z: 7 },
      speed: 5,
      color: 'white',
    },
    {
      type: 'Trance Lead',
      position:
        status === 'random' ? getRandomPosition() : { x: -4, y: -3.5, z: -1 },
      speed: 5,
      color: 'blue',
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

      renderer.reverb.amount.value =
        document.querySelector('#reverb-amount').value || 20;
      renderer.externalizer.amount.value =
        document.querySelector('#externalizer-amount').value || 30;
      renderer.externalizer.character.value =
        document.querySelector('#externalizer-character').value || 50;

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

function resetAudio() {
  for (const source of sources) {
    renderer.removeSource(source);
  }
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

function getRandomPosition() {
  // Return x and z between -10 and 10 & y between -3.5 and -1
  return {
    x: Math.random() * 20 - 10,
    y: Math.random() * 2.5 - 3.5,
    z: Math.random() * 20 - 10,
  };
}

function updateRoomParameters(input) {
  if (input.id === 'reverb-amount') renderer.reverb.amount.value = input.value;
  if (input.id === 'externalizer-amount')
    renderer.externalizer.amount.value = input.value;
  if (input.id === 'externalizer-character')
    renderer.externalizer.character.value = input.value;
}

export {
  createAudioScene,
  resumeAudio,
  stopAudio,
  resetAudio,
  updateListener,
  updateRoomParameters,
};