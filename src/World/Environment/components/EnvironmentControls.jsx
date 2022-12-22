import useWorld from '../../../stores/World';
import { useControls } from 'leva';

const types = [
  'Lead low',
  'Lead high',
  'Chords low',
  'Chords high',
  'Drums low',
  'Drums high',
  'Bass low',
  'Bass high',
];

const EnvironmentControls = () => {
  const { scale, defaultScale, setScale, colors, setColor } = useWorld();

  // useControls('Graphics', {
  //   // Select between low and high
  //   Quality: {
  //     options: ['low', 'high'],
  //     onChange: (value) => setGraphics(value),
  //   },
  // });

  useControls('Room', {
    Scale: {
      value: 1,
      min: 0.5,
      max: 5,
      step: 0.1,
      onChange: (value) =>
        setScale({
          x: defaultScale.x * value,
          y: defaultScale.y,
          z: defaultScale.z * value,
        }),
    },
  });

  useControls('Colors', {
    ...Object.keys(colors).reduce((acc, key, index) => {
      acc[types[index]] = {
        value: colors[key],
        onChange: (value) => setColor(key, value),
      };
      return acc;
    }, {}),
  });

  return null;
};

export default EnvironmentControls;
