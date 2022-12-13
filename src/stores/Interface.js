import create from 'zustand';

export default create((set) => ({
  // Menu
  showMenu: false,
  setShowMenu: (showMenu) => set({ showMenu }),

  // Interactions
  states: ['default', 'hover', 'interacting'],
  currentState: 'default',
  setState: (state) => set({ currentState: state }),

  hovereds: [],
  setHovereds: (hovereds) => set({ hovereds }),

  interactions: [],
  setInteractions: (interactions) => set({ interactions }),

  setCanInteract: () => set({ crosshairState: 2 }),
  setInteractionProgress: () => set({ crosshairState: 3 }),
  setInteractionDone: () => set({ crosshairState: 0 }),
}));
