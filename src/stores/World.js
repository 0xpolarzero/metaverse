import create from 'zustand';

export default create((set) => ({
  gravity: [0, -9.8, 0],
  setGravity: (gravity) => set({ gravity }),

  scale: { x: 100, y: 20, z: 100 },
  setScale: (scale) => set({ scale }),

  colors: {
    a: '#00bfff',
    b: '#add8e6',
    c: '#4b0082',
    d: '#9400d3',
  },
  setColor: (key, value) =>
    set((state) => ({ colors: { ...state.colors, [key]: value } })),
}));
