import create from 'zustand';
import { Manager } from '@atmokyaudio/websdk';
import { getRandomPosition } from '../World/Audio/data/sources';

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

    const analyser = createAnalyser(audioElemSrc);

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
  createAnalyser: (source) => {
    const { audioContext } = get();
    const analyser = audioContext.createAnalyser();
    const gainNode = audioContext.createGain();
    analyser.fftSize = 64;
    source.connect(analyser);
    analyser.connect(gainNode);

    // Create a script processor
    let info = {};
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    scriptProcessor.onaudioprocess = () => {
      // const buffer = new Float32Array(analyser.frequencyBinCount);
      // analyser.getFloatFrequencyData(buffer);
      // const gain = buffer.reduce((a, b) => a + b) / buffer.length;
      // info.gain = gain;

      const data = new Uint8Array(analyser.frequencyBinCount);
      analyser.getByteFrequencyData(data);
      const gain = data.reduce((a, b) => a + b) / data.length;
      info.gain = gain;
    };
    gainNode.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    return info;
  },

  getAnalyser: (source) => {
    console.log(source);
    // Create an analyser with the Audio API
    const { audioContext } = get();
    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 2048;
    source.connect(analyser);

    // Create a gain node
    const gainNode = audioContext.createGain();
    analyser.connect(gainNode);

    // Create a script processor
    const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);
    scriptProcessor.onaudioprocess = () => {
      const buffer = new Float32Array(analyser.frequencyBinCount);
      analyser.getFloatFrequencyData(buffer);
      const gain = buffer.reduce((a, b) => a + b) / buffer.length;
      gainNode.gain.value = gain;
      source.info.frequency = frequency;
    };
    gainNode.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination);

    return gainNode;
  },
}));
