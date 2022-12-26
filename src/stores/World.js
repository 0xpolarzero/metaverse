import create from 'zustand';
import defaults from '../defaults.config';

const {
  scale: DEFAULT_SCALE,
  gravity: DEFAULT_GRAVITY,
  colors: DEFAULT_COLORS,
} = defaults.world;

export default create((set) => ({
  gravity: DEFAULT_GRAVITY, // [0, -9.8, 0]
  setGravity: (gravity) => set({ gravity }),

  scale: DEFAULT_SCALE, // { x: 50, y: 20, z: 50 }
  setScale: (scale) => set({ scale }),

  colors: {
    // Dark pink: #FF1493 / Light pink: #FFB6C1
    // Dark purple: #663399 / Light purple: #D8BFD8
    // Dark blue: #000080 / Light blue: #ADD8E6
    // Dark green: #006400 / Light green: #90EE90
    // a1: '#FF69B4',
    // a2: '#FFB6C1',
    // b1: '#9966CC',
    // b2: '#D8BFD8',
    // c1: '#333399',
    // c2: '#ADD8E6',
    // d1: '#339933',
    // d2: '#90EE90',
    a1: DEFAULT_COLORS.a1,
    a2: DEFAULT_COLORS.a2,
    b1: DEFAULT_COLORS.b1,
    b2: DEFAULT_COLORS.b2,
    c1: DEFAULT_COLORS.c1,
    c2: DEFAULT_COLORS.c2,
    d1: DEFAULT_COLORS.d1,
    d2: DEFAULT_COLORS.d2,
    e1: DEFAULT_COLORS.e1,
    e2: DEFAULT_COLORS.e2,
  },
  setColor: (key, value) =>
    set((state) => ({ colors: { ...state.colors, [key]: value } })),
}));
