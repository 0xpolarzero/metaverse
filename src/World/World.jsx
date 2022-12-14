import { Physics } from '@react-three/rapier';
import Environment from './Environment';
import Player from './Controls';
import useWorld from '../stores/World';

const World = () => {
  const { gravity } = useWorld();
  return (
    <Physics gravity={gravity}>
      <Environment />
      <Player />
      <mesh>
        <sphereGeometry args={[1, 32, 32]} />
        <meshStandardMaterial color='red' />
      </mesh>
    </Physics>
  );
};

export default World;
