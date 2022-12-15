import create from 'zustand';

export default create((set) => ({
  // Sources
  // ! Also add position
  sources: [],
  addSource: (source) =>
    set((state) => ({ sources: [...state.sources, source] })),
  removeSource: (source) =>
    set((state) => ({ sources: state.sources.filter((s) => s !== source) })),
  clearSources: () => set((state) => ({ sources: [] })),

  // Listener
  listenerPosition: [0, 0, 0],
  setListenerPosition: (position) =>
    set((state) => ({ listenerPosition: position })),

  // Settings
  // Reverb
  reverbAmount: 20,
  minReverbAmount: 0,
  maxReverbAmount: 100,
  setReverbAmount: (amount) => set((state) => ({ reverbAmount: amount })),
  // Externalizer
  externalizerAmount: 50,
  externalizerIntensity: 30,
  minExternalizerAmount: 0,
  minExternalizerIntensity: 0,
  maxExternalizerAmount: 100,
  maxExternalizerIntensity: 100,
  setExternalizerAmount: (amount) =>
    set((state) => ({ externalizerAmount: amount })),
  setExternalizerIntensity: (intensity) =>
    set((state) => ({ externalizerIntensity: intensity })),
}));
