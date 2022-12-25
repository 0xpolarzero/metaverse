const defaults = {
  /**
   * World
   */
  world: {
    // Scale
    scale: { x: 50, y: 20, z: 50 },
    minScaleMultiplier: 0.5,
    maxScaleMultiplier: 5,
    // Gravity
    gravity: [0, -5, 0], // Earth: [0, -9.81, 0]
    // Colors
    colors: {
      a1: '#FFD1E1',
      a2: '#FF9BAA',
      b1: '#D3B3FF',
      b2: '#A066D3',
      c1: '#B3E6FF',
      c2: '#0099FF',
      d1: '#B3FFCC',
      d2: '#00CC99',
    },
  },
};

export default defaults;
