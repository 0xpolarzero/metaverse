import create from 'zustand';

export default create((set) => ({
  gravity: [0, -9.8, 0],
  setGravity: (gravity) => set({ gravity }),

  scale: { x: 100, y: 20, z: 100 },
  setScale: (scale) => set({ scale }),

  colors: {
    // Dark pink: #FF1493 / Light pink: #FFB6C1
    // Dark purple: #663399 / Light purple: #D8BFD8
    // Dark blue: #000080 / Light blue: #ADD8E6
    // Dark green: #006400 / Light green: #90EE90
    a1: '#FF69B4',
    a2: '#FFB6C1',
    b1: '#9966CC',
    b2: '#D8BFD8',
    c1: '#333399',
    c2: '#ADD8E6',
    d1: '#339933',
    d2: '#90EE90',
  },
  setColor: (key, value) =>
    set((state) => ({ colors: { ...state.colors, [key]: value } })),
}));
