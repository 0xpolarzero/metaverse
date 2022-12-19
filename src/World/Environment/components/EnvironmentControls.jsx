import useGraphics from '../../../stores/Graphics';
import useWorld from '../../../stores/World';
import { useControls } from 'leva';

const EnvironmentControls = () => {
  const { setGraphics } = useGraphics();
  const { colors, setColor } = useWorld();

  useControls('Graphics', {
    // Select between low and high
    Quality: {
      options: ['low', 'high'],
      onChange: (value) => setGraphics(value),
    },
  });

  useControls('Colors', {
    ...Object.keys(colors).reduce((acc, key) => {
      acc[key] = {
        value: colors[key],
        onChange: (value) => setColor(key, value),
      };
      return acc;
    }, {}),
  });

  return null;
};

export default EnvironmentControls;
