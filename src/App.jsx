import { Canvas } from '@react-three/fiber';
import { Texture } from 'three';
import * as DREI from '@react-three/drei';
import { Perf } from 'r3f-perf';
import { isMobile } from 'react-device-detect';
import React, { useEffect, useMemo } from 'react';
import World from './World';
import Interface, { Crosshair } from './Interface';

const App = () => {
  const gradientTexture = useMemo(() => {
    const canvas = document.createElement('canvas');
    const context = canvas.getContext('2d');

    // Set the canvas size
    canvas.width = 2;
    canvas.height = 2;

    // Create a gradient fill
    const gradient = context.createLinearGradient(0, 0, 1, 1);
    gradient.addColorStop(0, '#00bfff');
    gradient.addColorStop(0.5, '#add8e6');
    gradient.addColorStop(0.5, '#4b0082');
    gradient.addColorStop(1, '#9400d3');
    context.fillStyle = gradient;
    context.fillRect(0, 0, 2, 2);

    // Create a three.js texture from the canvas
    const texture = new Texture(canvas);
    texture.wrapS = Texture.RepeatWrapping;
    texture.wrapT = Texture.RepeatWrapping;

    return texture;
  }, []);

  useEffect(() => {
    if (isMobile) {
      screen.orientation.lock('landscape');
    }
  }, [isMobile]);

  return (
    <>
      <DREI.KeyboardControls
        map={[
          { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
          { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
          { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
          { name: 'right', keys: ['ArrowRight', 'KeyD'] },
          { name: 'sprint', keys: ['ShiftLeft', 'ShiftRight'] },
          { name: 'jump', keys: ['Space'] },
          { name: 'interact', keys: ['Click', 'KeyE'] },
        ]}
      >
        <Canvas
          background={gradientTexture}
          shadows
          camera={{
            fov: 75,
            near: 0.1,
            far: 1000,
            position: [-4, 2, -4],
          }}
        >
          <Perf position='top-left' />
          <World />
        </Canvas>
      </DREI.KeyboardControls>
      <Interface />
      <Crosshair />
    </>
  );
};

export default App;
