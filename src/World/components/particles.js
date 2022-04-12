import { BufferGeometry, BufferAttribute, Points } from 'three';
import { createScene } from './scene';

function createParticlesGeometry() {
  // Particles field
  const particlesGeometry = new BufferGeometry();
  const particlesCnt = 400;

  // Initiating position in the world and random scale
  const posArray = new Float32Array(particlesCnt * 3);
  const scaleArray = new Float32Array(particlesCnt);

  for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i * 3 + 0] = (Math.random() - 0.5) * 40; // largeur sur x
    posArray[i * 3 + 1] = (Math.random() - 1.0) * 15; // sur y
    posArray[i * 3 + 2] = (Math.random() - 0.5) * 50; // sur z
  }

  for (let i = 0; i < particlesCnt; i++) {
    scaleArray[i] = Math.random();
  }

  particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3));
  particlesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1));

  return particlesGeometry;
}

function createParticlesMaterial() {
  const scene = createScene();

  const particlesUniforms = {
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 300 },
    uTime: { value: 0 },
    fogColor: { type: 'c', value: scene.fog.color },
    fogNear: { type: 'f', value: scene.fog.near },
    fogFar: { type: 'f', value: scene.fog.far },
  };

  return particlesUniforms;
}

export { createParticlesGeometry, createParticlesMaterial };
