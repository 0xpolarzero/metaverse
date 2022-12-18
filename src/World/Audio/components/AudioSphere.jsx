import { useFrame } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { Globals, animated, config, useSpring } from '@react-spring/three';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useInterface from '../../../stores/Interface';

Globals.assign({ frameLoop: 'always' });

const AudioSphere = ({ audio, info, analyser }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [gain, setGain] = useState(0);
  const { hovered } = useInterface();
  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);

  const { scale } = useSpring({
    scale: isHovered ? 1.2 : 1 + gain,
    config: config.wobbly,
  });

  // ! Add here, is the object is in hovereds and is clicked to i.e. mute it
  const handleClick = () => {
    if (hovered[0] && hovered[0].id === info.id) {
    }
  };

  useFrame(({ clock }) => {
    ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    // The value will be between 0 and 255
    setGain(analyser.gain / 255);
  });

  useEffect(() => {
    ref.current.userData = { audio, name: info.name, id: info.id };
  }, [audio, info.name, info.id]);

  useEffect(() => {
    if (hovered[0] && hovered[0].id === info.id) {
      setIsHovered(true);
    } else {
      setIsHovered(false);
    }
  }, [hovered, info.id]);

  return (
    <group position={[info.position.x, info.position.y, info.position.z]}>
      <animated.mesh ref={ref} onClick={handleClick} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial color={info.color} wireframe />
      </animated.mesh>
      <DREI.Html
        position-y={info.position.y < 2 ? 1.7 : -1.7}
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
    </group>
  );
};

export default AudioSphere;
