import {
  Vector3,
  Clock,
  GridHelper,
  AxesHelper,
  Box3Helper,
  Points,
  ShaderMaterial,
  AdditiveBlending,
} from 'three';

// Import JSM modules
import { Octree } from 'three/examples/jsm/math/Octree';
import { Capsule } from 'three/examples/jsm/math/Capsule';

// Import components
import { createScene } from './components/scene';
import { createCamera } from './components/camera';
import { createLights } from './components/lights';
import { createCrosshair } from './components/crosshair';
import {
  createCamColliders,
  getObjectProximity,
  showUserSelection,
  hideObjectInformations,
  showUserHint,
} from './components/camCollision';
import {
  createParticlesGeometry,
  createParticlesMaterial,
} from './components/particles';
import { loadBlends, createBlendsEnv } from './components/objects/blends';
import { createStructure } from './components/objects/structure';

// Import systems
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { lockControls } from './systems/lockControls';
import { detectTabSwitch } from './systems/tabs';

// Import audio
import { getAudioReady } from './audio/main';
import { loadSFX } from './audio/positioned';
import { spatializeSound } from './audio/spatialize';

// Import shaders
import vShader from './shaders/particles/vertex.glsl.js';
import fShader from './shaders/particles/fragment.glsl.js';

// BASIC SCENE INPUTS
let scene;
let camera;
let renderer;
let resizer;
let loop;

// Audio
let audioLoaded = false;
let sfxBoule1;

const worldOctree = new Octree();

class World {
  constructor(container) {
    scene = createScene();
    camera = createCamera();
    scene.add(camera);
    renderer = createRenderer();
    loop = new Loop(camera, scene, renderer);
    resizer = new Resizer(container, camera, renderer);

    // Grid to help localization
    const gridHelper = new GridHelper(30, 30);
    scene.add(gridHelper);
    gridHelper.position.set(0, -4.5, 0);
    const axesHelper = new AxesHelper(50);
    axesHelper.setColors('blue', 'red', 'green');
    scene.add(axesHelper);
    axesHelper.position.set(0, -4, 0);

    const {
      ambientLight,
      directionalLight1,
      directionalLight2,
      fillLight1,
      fillLight2,
      helper1,
      helper2,
      helper3,
      helper4,
    } = createLights();

    scene.add(
      ambientLight,
      directionalLight1,
      directionalLight2,
      fillLight1,
      fillLight2,
      helper1,
      helper2,
      helper3,
      helper4,
    );

    const sprite = createCrosshair();
    camera.add(sprite);
  }

  async initObjects() {
    const { boule1, boule2, boule3, bouleTrans } = await loadBlends();
    scene.add(boule1, boule2, boule3, bouleTrans);
    loop.updatables.push(boule1, boule2, boule3);
  }

  async initStructure() {
    await createStructure(worldOctree, scene);
  }

  async initAudio() {
    getAudioReady();

    sfxBoule1 = await loadSFX();
    audioLoaded = true;
  }

  initSystem() {
    // CREATING THE GAME VARIABLES
    const GRAVITY = 30;
    const STEPS_PER_FRAME = 5;
    const initialPosition = [10, 10];

    const playerCollider = new Capsule(
      new Vector3(initialPosition[0], 0.35, initialPosition[1]), // Lower part of capsule
      new Vector3(initialPosition[0], 1, initialPosition[1]), // Higher part of capsule + camera
      0.35,
    );

    const playerVelocity = new Vector3();
    const playerDirection = new Vector3();

    let playerOnFloor = false;

    const keyStates = {};

    // DETECTING INPUT FROM THE PLAYER
    // Key movements
    document.addEventListener('keydown', (e) => {
      keyStates[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      keyStates[e.code] = false;
    });

    // Mouse
    lockControls();

    document.body.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX / 500;
        camera.rotation.x -= e.movementY / 500;
      }
    });

    // INITIATING COLLISION
    function playerCollisions() {
      const result = worldOctree.capsuleIntersect(playerCollider);
      playerOnFloor = false;

      if (result) {
        playerOnFloor = result.normal.y > 0;
        if (!playerOnFloor) {
          playerVelocity.addScaledVector(
            result.normal,
            -result.normal.dot(playerVelocity),
          );
        }
        playerCollider.translate(result.normal.multiplyScalar(result.depth));
      }
    }

    function updatePlayer(deltaTime) {
      let damping = Math.exp(-4 * deltaTime) - 1;

      if (!playerOnFloor) {
        playerVelocity.y -= GRAVITY * deltaTime;
        // small air resistance
        damping *= 0.1;
      }

      playerVelocity.addScaledVector(playerVelocity, damping);
      const deltaPosition = playerVelocity.clone().multiplyScalar(deltaTime);
      playerCollider.translate(deltaPosition);

      playerCollisions();

      camera.position.copy(playerCollider.end);
    }

    // INITIATING MOVEMENT
    function getForwardVector() {
      camera.getWorldDirection(playerDirection);
      playerDirection.y = 0;
      playerDirection.normalize();

      return playerDirection;
    }

    function getSideVector() {
      camera.getWorldDirection(playerDirection);
      playerDirection.y = 0;
      playerDirection.normalize();
      playerDirection.cross(camera.up);

      return playerDirection;
    }

    // INITIATING PLAYER CONTROLS
    function controls(deltaTime) {
      // gives a bit of air control
      const speedDelta = deltaTime * (playerOnFloor ? 25 : 8);

      if (keyStates.KeyW || keyStates.KeyZ || keyStates.ArrowUp) {
        playerVelocity.add(getForwardVector().multiplyScalar(speedDelta));
      }

      if (keyStates.KeyS || keyStates.ArrowDown) {
        playerVelocity.add(getForwardVector().multiplyScalar(-speedDelta));
      }

      if (keyStates.KeyA || keyStates.KeyQ || keyStates.ArrowLeft) {
        playerVelocity.add(getSideVector().multiplyScalar(-speedDelta));
      }

      if (keyStates.KeyD || keyStates.ArrowRight) {
        playerVelocity.add(getSideVector().multiplyScalar(speedDelta));
      }

      if (playerOnFloor) {
        if (keyStates.Space) {
          playerVelocity.y = 10;
        }
      }
    }

    // PREVENT THE PLAYER FROM GOING OUT OF THE BOX
    function teleportPlayerIfOob() {
      if (camera.position.y <= -25) {
        playerCollider.start.set(0, 0.35, 0);
        playerCollider.end.set(0, 1, 0);
        playerCollider.radius = 0.35;
        camera.position.copy(playerCollider.end);
        camera.rotation.set(0, 0, 0);
      }
    }

    function getUserInteraction() {
      // INTERACTION WITH THE MODELS
      const camSphereDetector = createCamColliders();
      camera.add(camSphereDetector);
      const envArray = createBlendsEnv();
      scene.add(...envArray);

      // HELPERS FOR VISUAL
      const [camBB, boulesBB] = getObjectProximity(camera, ...envArray);
      const camHelper = new Box3Helper(camBB, 0xffff00);
      // For debugging
      camHelper.name = 'camHelper';
      camera.add(camHelper);
      // Adding the objects to the scene individually
      const boulesHelpers = Array(boulesBB.length);
      for (let i = 0; i < boulesBB.length; i++) {
        const helper = new Box3Helper(boulesBB[i], 0xffff00);
        helper.name = `Box3Helper for boule ${i}`;
        boulesHelpers[i] = helper;
      }
      scene.add(...boulesHelpers);

      // DETECTORS FOR INFORMATIONS DISPLAY
      const informations = document.querySelector('#informations-container');

      document.addEventListener('keydown', () => {
        if (keyStates.KeyH || keyStates.keyR) {
          hideObjectInformations();
        }
      });

      document.addEventListener('mouseup', () => {
        showUserSelection(camera, ...envArray);
      });

      let hintInterval = window.setInterval(() => {
        showUserHint(camera, ...envArray);
      }, 200);
    }

    // PARTICLES
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
    scene.add(particlesMesh);

    function moveParticles(deltaFlies) {
      particlesMaterial.uniforms.uTime.value = deltaFlies;
    }

    resizer.onResize = () => {
      particlesMaterial.uniforms.uPixelRatio.value = Math.min(
        window.devicePixelRatio,
        2,
      );
    };

    const clock = new Clock();

    // ANIMATING THE WORLD
    function animate() {
      const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
      const deltaFlies = clock.getElapsedTime();

      // we look for collisions in substeps to mitigate the risk of
      // an object traversing another too quickly for detection.

      for (let i = 0; i < STEPS_PER_FRAME; i++) {
        // System
        controls(deltaTime);
        updatePlayer(deltaTime);
        teleportPlayerIfOob();

        // Visual effects
        moveParticles(deltaFlies);
      }

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    let interval = window.setInterval(() => {
      console.log(camera.rotation.x, camera.rotation.y, camera.rotation.z);
    }, 1000);

    // Get the user interaction (camera with models)
    getUserInteraction();
    // Detect tab switching (stops audio and animation)
    detectTabSwitch();
    // The structure is already loaded so the animation can start
    animate();
  }

  // Audio
  if(audioLoaded) {
    spatializeSound(sfxBoule1, camera);
    console.log('.');
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
