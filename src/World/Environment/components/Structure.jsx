import * as DREI from '@react-three/drei';
import { CuboidCollider, RigidBody } from '@react-three/rapier';
import useWorld from '../../../stores/World';

const Structure = () => {
  const { scale } = useWorld();

  return (
    <RigidBody type='fixed' restitution={0.2} friction={1} colliders={false}>
      <CuboidCollider args={[scale.x, 0.1, scale.z]} position-y={-0.1} />
      <mesh position-y={-1} rotation-x={-Math.PI / 2}>
        <planeBufferGeometry args={[scale.x, scale.z]} />
        <DREI.MeshReflectorMaterial
          color={'ivory'}
          resolution={512}
          blur={[1000, 1000]}
          mixBlur={1}
          mirror={0.5}
        />
      </mesh>
    </RigidBody>
  );
};

export default Structure;
