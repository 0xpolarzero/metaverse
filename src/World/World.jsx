const World = () => {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshStandardMaterial color='red' />
    </mesh>
  );
};

export default World;
