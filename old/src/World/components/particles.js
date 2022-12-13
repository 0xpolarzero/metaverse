import {
  BufferGeometry,
  BufferAttribute,
  Points,
  ShaderMaterial,
  AdditiveBlending,
} from 'three';
import vShader from '../shaders/particles/vertex.glsl';
import fShader from '../shaders/particles/fragment.glsl';
import { createScene } from './scene';

const scene = createScene();

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
  const particlesUniforms = {
    uPixelRatio: {
      value: Math.min(window.devicePixelRatio, window.innerHeight / 350),
    },
    uSize: { value: 300 },
    uTime: { value: 0 },
    fogColor: { type: 'c', value: scene.fog.color },
    fogNear: { type: 'f', value: scene.fog.near },
    fogFar: { type: 'f', value: scene.fog.far },
  };

  return particlesUniforms;
}

function initParticles(resizer) {
  const particlesGeometry = createParticlesGeometry();
  const particlesUniforms = createParticlesMaterial();
  const particlesMaterial = new ShaderMaterial({
    blending: AdditiveBlending, // more shining
    uniforms: particlesUniforms,
    vertexShader: vShader,
    fragmentShader: fShader,
    transparent: true,
    depthWrite: false, // prevent them from hiding each other
  });
  const particlesMesh = new Points(particlesGeometry, particlesMaterial);

  function moveParticles(delta) {
    particlesMaterial.uniforms.uTime.value = delta;
  }

  resizer.onResize = () => {
    particlesMaterial.uniforms.uPixelRatio.value = Math.min(
      window.devicePixelRatio,
      window.innerHeight / 350,
    );
  };

  return { particlesMesh, moveParticles };
}

export { initParticles };
