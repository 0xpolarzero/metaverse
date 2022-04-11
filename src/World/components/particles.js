import {
  BufferGeometry,
  MathUtils,
  BufferAttribute,
  PointsMaterial,
  ShaderMaterial,
  Points,
  AdditiveBlending,
  Clock,
} from 'three'

import vShader from '../shaders/particles/vertex.glsl.js'
import fShader from '../shaders/particles/fragment.glsl.js'

import { createScene } from './scene'

function createParticlesGeometry() {
  // Texture loader
  //const loader = new TextureLoader();
  //const customParticles = loader.load('assets/particles.png');

  // Particles field
  const particlesGeometry = new BufferGeometry()
  const particlesCnt = 400

  // Initiating position in the world and random scale
  const posArray = new Float32Array(particlesCnt * 3)
  // .fill()
  // .map(() => MathUtils.randFloatSpread(10));
  const scaleArray = new Float32Array(particlesCnt)

  for (let i = 0; i < particlesCnt * 3; i++) {
    posArray[i * 3 + 0] = (Math.random() - 0.5) * 40 // largeur sur x
    posArray[i * 3 + 1] = (Math.random() - 1.0) * 15 // sur y
    posArray[i * 3 + 2] = (Math.random() - 0.5) * 50 // sur z
    // posArray[i] = (Math.random() - 0.5) * 5 * (Math.random() * 5);
  }

  for (let i = 0; i < particlesCnt; i++) {
    scaleArray[i] = Math.random()
  }

  particlesGeometry.setAttribute('position', new BufferAttribute(posArray, 3))
  particlesGeometry.setAttribute('aScale', new BufferAttribute(scaleArray, 1))

  return particlesGeometry
}

export { createParticlesGeometry }

function createParticlesMaterial() {
  const scene = createScene()

  const particlesUniforms = {
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 300 },
    uTime: { value: 0 },
    fogColor: { type: 'c', value: scene.fog.color },
    fogNear: { type: 'f', value: scene.fog.near },
    fogFar: { type: 'f', value: scene.fog.far },
  }

  return particlesUniforms
}

export { createParticlesMaterial }

// PROBLEME
// EN PLUS DU RESIZING, MAINTENANT UTIME DOIT ETRE ACTUALISE
// ET JE PEUX PAS LOOP UPDATABLES PUSH ICI
// DONC SINON FAUT TOUT REUNIR DANS LA MEME FONCTION ET ME FAIRE MON TICK

function resizeParticles() {
  const particlesMaterial = createParticlesMaterial()
  /* particlesMaterial.uniforms.uPixelRatio.value = Math.min(
    window.devicePixelRatio,
    2,
  );
 */
  //test
  //particlesMaterial.fog = false;

  return particlesMaterial
}

export { resizeParticles }

function createParticles() {
  const particlesGeometry = createParticlesGeometry()
  //const particlesMaterial = resizeParticles();
  const particlesMaterial = createParticlesMaterial()

  const particlesMesh = new Points(particlesGeometry, particlesMaterial)

  // ANIMATION

  /*
  particlesMesh.tick = (delta) => {
    particlesMesh.rotation.y += .1 * delta
  }
  */

  return particlesMesh
}

export { createParticles }
