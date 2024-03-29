import create from 'zustand';

export default create((set) => ({
  // Menu
  showMenu: false,
  setShowMenu: (showMenu) => set({ showMenu }),
  showMobileOverlay: true,
  setShowMobileOverlay: (showMobileOverlay) => set({ showMobileOverlay }),
  showAdditionalMenu: false,
  additionalMenuAction: null,
  setShowAdditionalMenu: (show, action) =>
    set({ showAdditionalMenu: show, additionalMenuAction: action }),

  // Interactions
  states: ['default', 'hover', 'interacting'],
  currentState: 'default',
  setState: (state) => set({ currentState: state }),
  interactDistance: 10,

  hovered: [],
  setHovered: (hovered) => set({ hovered }),

  interactions: [],
  setInteractions: (interactions) => set({ interactions }),
}));
