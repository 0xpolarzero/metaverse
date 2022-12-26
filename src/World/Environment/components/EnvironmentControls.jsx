import useWorld from '../../../stores/World';
import { useControls } from 'leva';
import defaults from '../../../defaults.config';

const {
  scale: DEFAULT_SCALE,
  maxScaleMultiplier: MAX_SCALE,
  minScaleMultiplier: MIN_SCALE,
} = defaults.world;

const types = [
  'Lead low',
  'Lead high',
  'Chords low',
  'Chords high',
  'Drums low',
  'Drums high',
  'Bass low',
  'Bass high',
  'Voice low',
  'Voice high',
];

const EnvironmentControls = () => {
  const { scale, setScale, colors, setColor } = useWorld();

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
      min: MIN_SCALE,
      max: MAX_SCALE,
      step: 0.1,
      onChange: (value) =>
        setScale({
          x: DEFAULT_SCALE.x * value,
          y: DEFAULT_SCALE.y,
          z: DEFAULT_SCALE.z * value,
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
