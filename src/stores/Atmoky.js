import create from 'zustand';
import { Manager } from '@atmokyaudio/websdk';
import chroma from 'chroma-js';
import { getRandomPosition } from '../World/Audio/data/sources';
import useWorld from './World';

const AudioContext = window.AudioContext || window.webkitAudioContext;

export default create((set, get) => ({
  /**
   * Global
   */
  // Audio context
  audioContext: null,
  setAudioContext: (audioContext) => set((state) => ({ audioContext })),
  // Renderer
  renderer: null,
  setRenderer: (renderer) => set((state) => ({ renderer })),
  // Manager
  manager: new Manager(),

  /**
   * Sources
   */
  sources: [],
  setSources: (sources) => set((state) => ({ sources })),
  addSource: (source) =>
    set((state) => ({ sources: [...state.sources, source] })),
  removeSource: (source) =>
    set((state) => ({ sources: state.sources.filter((s) => s !== source) })),
  clearSources: () => set((state) => ({ sources: [] })),
  // Mute
  mutedSources: [],
  toggleMuteSource: (audioSource, id) => {
    const { mutedSources } = get();
    if (mutedSources.includes(id)) {
      audioSource.setGainLinear(1);
      set((state) => ({
        mutedSources: state.mutedSources.filter((i) => i !== id),
      }));
    } else {
      audioSource.setGainLinear(0);
      set((state) => ({
        mutedSources: [...state.mutedSources, id],
      }));
    }
  },

  /**
   * Listener
   */
  listenerPosition: [0, 0, 0],
  setListenerPosition: (position) =>
    set((state) => ({ listenerPosition: position })),

  /**
   * Parameters
   */
  // Reverb
  reverbAmount: 20,
  minReverbAmount: 0,
  maxReverbAmount: 100,
  setReverbAmount: (amount) => {
    const { renderer } = get();
    if (renderer) renderer.reverb.amount.value = amount;
    set((state) => ({ reverbAmount: amount }));
  },
  // Externalizer
  externalizerAmount: 50,
  externalizerIntensity: 30,
  minExternalizerAmount: 0,
  minExternalizerIntensity: 0,
  maxExternalizerAmount: 100,
  maxExternalizerIntensity: 100,
  setExternalizerAmount: (amount) => {
    const { renderer } = get();
    if (renderer) renderer.externalizer.amount.value = amount;
    set((state) => ({ externalizerAmount: amount }));
  },
  setExternalizerIntensity: (intensity) => {
    const { renderer } = get();
    if (renderer) renderer.externalizer.character.value = intensity;
    set((state) => ({ externalizerIntensity: intensity }));
  },

  /**
   * Actions
   */
  // Prepare audio context
  prepareAudioContext: async (numSources) => {
    const { manager, setAudioContext, setRenderer } = get();

    const tempAudioContext = new AudioContext();
    await manager.prepareContext(tempAudioContext);
    const tempRenderer = manager.createRenderer(numSources);
    tempRenderer.connect(tempAudioContext.destination, 0, 0);
    setAudioContext(tempAudioContext);
    setRenderer(tempRenderer);
    console.log('Audio setup complete');
  },

  // Set renderer parameters
  setRendererParameters: () => {
    const {
      renderer,
      reverbAmount,
      externalizerAmount,
      externalizerIntensity,
    } = get();
    renderer.reverb.amount.value = reverbAmount;
    renderer.externalizer.amount.value = externalizerAmount;
    renderer.externalizer.character.value = externalizerIntensity;
  },

  // Create source
  createSource: (source, index) => {
    const { audioContext, renderer, addSource, createAnalyser } = get();
    const position = source.info.position;
    const audioElem = new Audio(source.src);
    audioElem.crossOrigin = 'anonymous';
    audioElem.preload = 'none';
    audioElem.load();
    audioElem.loop = true;

    const audioElemSrc = audioContext.createMediaElementSource(audioElem);

    const analyser = createAnalyser(audioElemSrc, source.info.type);

    let atmSource = renderer.createSource();
    atmSource.setInput(audioElemSrc);
    atmSource.setPosition(position.x, position.y, position.z);

    addSource({
      audio: atmSource,
      audioElem: audioElem,
      analyser: analyser,
      info: { ...source.info, id: index },
    });
  },

  // Start all sources
  startAudio: async () => {
    const { sources } = get();

    return Promise.all(
      sources.map((source) =>
        source.audio.input.mediaElement
          .play()
          .then(() => true)
          .catch((err) => {
            console.log(err);
            return false;
          }),
      ),
    ).then((results) => results.every((result) => result));
  },

  // Init audio
  initAudio: async (inputSources) => {
    const { prepareAudioContext, setRendererParameters, createSource } = get();

    try {
      await prepareAudioContext(inputSources.length);
      setRendererParameters();
      inputSources.forEach((source, index) => createSource(source, index));

      return true;
    } catch (err) {
      console.log(err);

      return false;
    }
  },

  // Resume audio
  resumeAudio: () => {
    const { audioContext } = get();
    if (!audioContext) return;

    if (audioContext.state === 'suspended')
      audioContext.resume().catch((err) => {
        console.log(err);
      });
  },

  // Pause audio
  pauseAudio: () => {
    const { audioContext } = get();
    if (audioContext.state === 'running')
      audioContext.suspend().catch((err) => {
        console.log(err);
      });
  },

  resetAudio: () => {
    const { renderer, sources } = get();
    for (const source of sources) {
      renderer.removeSource(source.audio);
    }
  },

  // Randomize position for all sources
  randomizePositions: () => {
    const { sources, setSources } = get();

    const newSources = sources.map((source) => {
      const newPosition = getRandomPosition();
      source.audio.setPosition(newPosition.x, newPosition.y, newPosition.z);
      source.info.position = newPosition;

      return source;
    });
    setSources(newSources);
  },

  // Get an analyser for a source
  createAnalyser: (source, type) => {
    const { audioContext, getColorFromGradient } = get();
    const analyser = audioContext.createAnalyser();
    const gainNode = audioContext.createGain();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyser.connect(gainNode);

    // Create a script processor
    let info = {};
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    scriptProcessor.onaudioprocess = () => {
      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);

      const gain = data.reduce((a, b) => a + b) / data.length;
      info.gain = gain;

      const mainFrequencyIndex = data.indexOf(Math.max(...data));
      const mainFrequencyInHz =
        (mainFrequencyIndex * (audioContext.sampleRate / 2)) /
        analyser.frequencyBinCount;
      info.mainFrequencyInHz = mainFrequencyInHz;

      const color = getColorFromGradient(mainFrequencyInHz, type);
      info.color = color;
    };
    gainNode.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    return info;
  },

  getColorFromGradient: (frequency, type) => {
    const colors = useWorld.getState().colors;
    let firstColor;
    let secondColor;

    if (type === 'lead') {
      firstColor = colors.a1;
      secondColor = colors.a2;
    } else if (type === 'chords') {
      firstColor = colors.b1;
      secondColor = colors.b2;
    } else if (type === 'drums') {
      firstColor = colors.c1;
      secondColor = colors.c2;
    } else {
      firstColor = colors.d1;
      secondColor = colors.d2;
    }

    const gradient = chroma.scale([firstColor, secondColor]);
    const normalizedFrequency = frequency / 10000;
    const color = gradient(normalizedFrequency).hex();

    return color;
  },
}));

// ! add type to choose the color from the gradient
