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

  hovered: [],
  setHovered: (hovered) => set({ hovered }),

  interactions: [],
  setInteractions: (interactions) => set({ interactions }),
}));
