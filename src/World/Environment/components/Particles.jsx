import * as DREI from '@react-three/drei';
import useWorld from '../../../stores/World';

const Particles = ({ count = 1000 }) => {
  const { scale } = useWorld();

  return (
    <DREI.Sparkles
      size={6}
      scale={[scale.x, scale.y, scale.z]}
      position-y={1}
      speed={0.2}
      count={count}
    />
  );
};

export default Particles;
