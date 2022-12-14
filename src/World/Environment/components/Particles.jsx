import * as DREI from '@react-three/drei';
import useWorld from '../../../stores/World';

const Particles = ({ count = 1000 }) => {
  const { scale } = useWorld();

  return (
    <DREI.Sparkles
      size={4}
      scale={[scale.x, scale.y, scale.z]}
      position-y={scale.y / 2}
      speed={0.2}
      count={count}
    />
  );
};

export default Particles;
