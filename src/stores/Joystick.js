import create from 'zustand';

export default create((set, get) => ({
  actions: ['forward', 'backward', 'left', 'right', 'sprint'],
  forward: false,
  backward: false,
  left: false,
  right: false,
  sprint: false,
  jump: false,

  setJoystick: (key, value) => set({ [key]: value }),

  getJoystick: () => ({
    forward: get().forward,
    backward: get().backward,
    left: get().left,
    right: get().right,
    sprint: get().sprint,
    jump: get().jump,
  }),
}));
