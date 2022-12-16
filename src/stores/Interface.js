import create from 'zustand';

export default create((set) => ({
  // Menu
  showMenu: false,
  setShowMenu: (showMenu) => set({ showMenu }),
  showMobileOverlay: true,
  setShowMobileOverlay: (showMobileOverlay) => set({ showMobileOverlay }),

  // Interactions
  states: ['default', 'hover', 'interacting'],
  currentState: 'default',
  setState: (state) => set({ currentState: state }),

  hovereds: [],
  setHovereds: (hovereds) => set({ hovereds }),
  addHovered: (hovered) =>
    set((state) => ({ hovereds: [...state.hovereds, hovered] })),
  removeHovered: (hovered) =>
    set((state) => ({ hovereds: state.hovereds.filter((h) => h !== hovered) })),

  interactions: [],
  setInteractions: (interactions) => set({ interactions }),
}));
