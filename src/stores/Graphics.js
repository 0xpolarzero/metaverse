import create from 'zustand';

export default create((set, get) => ({
  // Global
  options: ['low', 'high'],
  graphics: 'low',

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
