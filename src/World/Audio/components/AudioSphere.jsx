import { useFrame } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useInterface from '../../../stores/Interface';

const AudioSphere = ({ audio, info }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { hovered } = useInterface();
  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);

  // ! Add here, is the object is in hovereds and is clicked to i.e. mute it
  const handleClick = () => {
    if (hovered[0] && hovered[0].id === info.id) {
      //
    }
  };

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    if (hovered[0] && hovered[0].id === info.id) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  });

  useEffect(() => {
    ref.current.userData = { audio, name: info.name, id: info.id };
  }, [audio, info.name, info.id]);

  return (
    <mesh
      ref={ref}
      position={[info.position.x, info.position.y, info.position.z]}
      onClick={handleClick}
    >
      <DREI.Html
        position-y={info.position.y < 2 ? 1.5 : -1.5}
        center
        distanceFactor={10}
      >
        <div
          style={{
            fontFamily: 'Futura PT',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'white',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          <h3>{info.name}</h3>
        </div>
      </DREI.Html>

      {/* <DREI.Text position-y={1.5} fontSize={0.4}>
        {info.name}
      </DREI.Text> */}
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={info.color} wireframe={isHovered} />
    </mesh>
  );
};

export default AudioSphere;
