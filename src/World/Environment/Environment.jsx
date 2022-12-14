import Lights from './components/Lights';
import Structure from './components/Structure';
import Particles from './components/Particles';
import useWorld from '../../stores/World';

const Environment = () => {
  const { scale } = useWorld();

  return (
    <>
      <Structure />
      <Lights />
      <Particles count={scale.x * scale.y} />
    </>
  );
};

export default Environment;
