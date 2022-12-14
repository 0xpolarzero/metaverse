import * as DREI from '@react-three/drei';

const Lights = () => {
  return (
    <>
      <DREI.Environment preset='dawn'>
        <DREI.Lightformer color={0xdd517f} intensity={5} />
      </DREI.Environment>
    </>
  );
};

export default Lights;
