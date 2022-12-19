import create from 'zustand';

export default create((set, get) => ({
  // Global
  options: ['low', 'high'],
  graphics: 'low',

  /**
   * Colors
   */
  colors: {
    a: '#00bfff',
    b: '#add8e6',
    c: '#4b0082',
    d: '#9400d3',
  },
  setColor: (key, value) =>
    set((state) => ({ colors: { ...state.colors, [key]: value } })),

  /**
   * Effects
   */
  ssr: true,
  dof: false,

  // Actions
  setLowGraphics: () => set({ graphics: 'low', ssr: false, dof: false }),
  setHighGraphics: () => set({ graphics: 'high', ssr: true, dof: false }),
  setGraphics: (value) => {
    const { setLowGraphics, setHighGraphics } = get();
    value === 'low' ? setLowGraphics() : setHighGraphics();
  },
}));
