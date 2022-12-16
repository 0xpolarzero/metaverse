import React, { useEffect, useMemo } from 'react';

const AudioSphere = ({ audio, info }) => {
  const sphere = useMemo(() => {
    return (
      <mesh position={info.position}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={info.color} />
      </mesh>
    );
  }, [audio, info]);

  return sphere;
};

export default AudioSphere;
