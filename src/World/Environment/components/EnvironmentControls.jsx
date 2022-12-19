import useGraphics from '../../../stores/Graphics';

const EnvironmentControls = () => {
  const { setGraphics } = useGraphics();

  useControls('Graphics', {
    // Select between low and high
    Quality: {
      options: ['low', 'high'],
      onChange: (value) => setGraphics(value),
    },
  });
  return null;
};

export default EnvironmentControls;
