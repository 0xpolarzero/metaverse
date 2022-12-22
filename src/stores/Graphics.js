// import create from 'zustand';

// export default create((set, get) => ({
//   // Global
//   options: ['low', 'high'],
//   graphics: 'low',

//   /**
//    * Effects
//    */
//   ssr: true,
//   dof: false,
//   ssao: false,

//   // Actions
//   setLowGraphics: () =>
//     set({ graphics: 'low', ssr: false, dof: false, ssao: false }),
//   setHighGraphics: () =>
//     set({ graphics: 'high', ssr: false, dof: false, ssao: true }),
//   setGraphics: (value) => {
//     const { setLowGraphics, setHighGraphics } = get();
//     value === 'low' ? setLowGraphics() : setHighGraphics();
//   },
// }));
