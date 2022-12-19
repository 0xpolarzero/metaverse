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
    A: {
      value: colors.a,
      onChange: (value) => setColor('a', value),
    },
    B: {
      value: colors.b,
      onChange: (value) => setColor('b', value),
    },
    C: {
      value: colors.c,
      onChange: (value) => setColor('c', value),
    },
    D: {
      value: colors.d,
      onChange: (value) => setColor('d', value),
    },
  });

  return null;
};

export default EnvironmentControls;
