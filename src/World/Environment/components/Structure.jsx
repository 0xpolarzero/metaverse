import { RigidBody } from '@react-three/rapier';

const Structure = () => {
  return (
    <RigidBody type='fixed'>
      <mesh position-y={-1} rotation-x={-Math.PI / 2}>
        {/* Create a plane as a floor */}
        <planeBufferGeometry attach='geometry' args={[100, 100]} />
        <meshStandardMaterial attach='material' color='green' />
      </mesh>
    </RigidBody>
  );
};

export default Structure;
