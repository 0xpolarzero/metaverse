import { useFrame } from '@react-three/fiber';
import * as DREI from '@react-three/drei';
import { Globals, animated, config, useSpring } from '@react-spring/three';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import useInterface from '../../../stores/Interface';
import useAtmoky from '../../../stores/Atmoky';

Globals.assign({ frameLoop: 'always' });

const AudioSphere = ({ audio, info, analyser }) => {
  const [isMuted, setIsMuted] = useState(false);

  const { hovered } = useInterface();
  const { toggleMuteSource, isVxEnabled } = useAtmoky();

  const ref = useRef();
  const rotationSpeed = useMemo(() => Math.random() - 0.5, []);

  // Change scale based on hovered/muted and gain
  const { scale } = useSpring({
    scale:
      hovered[0] && hovered[0].id === info.id
        ? isMuted
          ? 0.65
          : 1.2
        : isMuted
        ? 0.5
        : 1 + ref.current?.userData.gain || 1,
    config: config.wobbly,
  });

  // Change opacity based on muted
  const { opacity } = useSpring({
    opacity: isMuted ? 0.1 : 1,
  });

  // Mute/unmute source on click
  const handleClick = async (e) => {
    e.stopPropagation();
    if (ref.current.userData.isDisabled) return;

    setIsMuted(!isMuted);
    toggleMuteSource(audio, info.id);
  };

  useFrame(({ clock }) => {
    // Rotate if not muted
    if (!isMuted)
      ref.current.rotation.y = clock.getElapsedTime() * rotationSpeed;

    // The value will be between 0 and 255
    ref.current.userData.gain = analyser.gain / 255;
  });

  // Add informations
  useEffect(() => {
    ref.current.userData = {
      audio,
      name: info.name,
      type: info.type,
      id: info.id,
      isDisabled: false,
      gain: 0,
    };
  }, [audio, info.name, info.id]);

  // Enable/disable voice
  useEffect(() => {
    if (info.type === 'vx') {
      if (isVxEnabled) {
        ref.current.userData.isDisabled = false;
        audio.setGainLinear(1);
        ref.current.material.opacity = 1;
      } else {
        ref.current.userData.isDisabled = true;
        audio.setGainLinear(0);
        ref.current.material.opacity = 0.1;
      }
    }
  }, [isVxEnabled]);

  // Disable console warning for the animated.mesh
  useEffect(() => {
    const originalWarn = console.warn;
    console.warn = () => {};

    return () => (console.warn = originalWarn);
  }, []);

  return (
    <group position={[info.position.x, info.position.y, info.position.z]}>
      <animated.mesh ref={ref} onClick={handleClick} scale={scale}>
        <sphereGeometry args={[1, 32, 32]} />
        <animated.meshStandardMaterial
          color={analyser.color}
          wireframe
          transparent
          opacity={opacity}
        />
      </animated.mesh>
      <DREI.Html
        position-y={info.position.y < 2 ? 1.7 : -1.7}
        center
        distanceFactor={10}
        wrapperClass='sphere__html'
      >
        <div
          style={{
            fontFamily: 'Futura PT',
            fontSize: isMobile ? '0.6rem' : '1rem',
            textTransform: 'uppercase',
            textAlign: 'center',
            color: 'white',
            opacity:
              hovered[0] && hovered[0].id === info.id
                ? 1
                : info.type === 'vx' && !isVxEnabled
                ? 0
                : 0.1,
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
