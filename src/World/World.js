import { Clock, GridHelper, Box3Helper } from 'three';

// Import JSM modules
import { Octree } from 'three/examples/jsm/math/Octree';

// Import components
import { createScene } from './components/scene';
import { createCamera } from './components/camera';
import { createLights } from './components/lights';
import { createCrosshair } from './components/crosshair';
import {
  updatePlayer,
  controls,
  teleportPlayerIfOob,
} from './components/player';
import {
  createCamColliders,
  getObjectProximity,
  showUserSelection,
  hideObjectInformations,
  showUserHint,
} from './components/camCollision';
import { initParticles } from './components/particles';
import { loadBlends, createBlendsEnv } from './components/objects/blends';
import { createStructure } from './components/objects/structure';

// Import systems
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { lockControls } from './systems/lockControls';
import { detectTabSwitch } from './systems/tabs';

// Import audio
import {
  createAudioScene,
  resetAudio,
  updateListener,
  updateRoomParameters,
} from './audio/main';

import { displayNotif } from './utils/notification';

// BASIC SCENE INPUTS
let scene;
let camera;
let renderer;
let resizer;
let loop;

// Audio
let envArray;
let audioLoaded = false;

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
    const gridHelper = new GridHelper(23, 30);
    scene.add(gridHelper);
    gridHelper.position.set(0, -4.6, 0);
    // const axesHelper = new AxesHelper(50);
    // axesHelper.setColors('blue', 'red', 'green');
    // scene.add(axesHelper);
    // axesHelper.position.set(0, -4, 0);

    const lights = createLights();
    scene.add(...lights);

    const sprite = createCrosshair();
    camera.add(sprite);
  }

  async initStructure() {
    await createStructure(worldOctree, scene);
  }

  async initAudio(status) {
    await createAudioScene(status)
      .then((objs) => {
        // Remove the objects if they already exist
        envArray && scene.remove(...envArray);
        // Get them (again) with the new positions
        envArray = loadBlends(objs);
        scene.add(...envArray);
        loop.updatables.push(envArray[0]);
      })
      .catch((err) => {
        displayNotif('error', 'The audio file could not be loaded.');
        console.log(err);
      });
    audioLoaded = true;
  }

  initSystem() {
    const STEPS_PER_FRAME = 5;
    const keyStates = {};

    // DETECTING INPUT FROM THE PLAYER
    // Key movements
    document.addEventListener('keydown', (e) => {
      keyStates[e.code] = true;
    });

    document.addEventListener('keyup', (e) => {
      keyStates[e.code] = false;
    });

    document.body.addEventListener('mousemove', (e) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= e.movementX / 10000;
        camera.rotation.x -= e.movementY / 10000;
      }
    });

    async function getUserInteraction() {
      // INTERACTION WITH THE MODELS
      const camSphereDetector = createCamColliders();
      camera.add(camSphereDetector);

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
      // scene.add(...boulesHelpers);

      // Informations display
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

    // Particles
    const { particlesMesh, moveParticles } = initParticles(resizer);
    scene.add(particlesMesh);

    const clock = new Clock();

    // ANIMATING THE WORLD
    function animate() {
      const deltaTime = Math.min(0.05, clock.getDelta()) / STEPS_PER_FRAME;
      const deltaFlies = clock.getElapsedTime();

      // we look for collisions in substeps to mitigate the risk of
      // an object traversing another too quickly for detection.

      for (let i = 0; i < STEPS_PER_FRAME; i++) {
        // System
        controls(deltaTime, keyStates, camera);
        updatePlayer(deltaTime, worldOctree, camera);
        teleportPlayerIfOob(camera);

        // Visual effects
        moveParticles(deltaFlies);

        if (audioLoaded) {
          updateListener(camera);
        }
      }

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    lockControls(camera);
    // Get the user interaction (camera with models) only after a click on the page
    const isInteractionReady = () => {
      if (audioLoaded) {
        getUserInteraction();
        document.removeEventListener('click', isInteractionReady);
      }
    };
    document.addEventListener('click', isInteractionReady);
    // Detect tab switching (stops audio and animation)
    // detectTabSwitch();

    const randomize = document.querySelector('.random-pos');
    randomize.addEventListener('click', (e) => {
      resetAudio();
      this.initAudio('random');
      e.stopPropagation();
    });

    const parameters = document.querySelectorAll('input[type="range"]');
    parameters.forEach((param) => {
      param.addEventListener('click', (e) => {
        updateRoomParameters(e.target);
        e.stopPropagation();
      });
    });

    // The structure is already loaded so the animation can start
    animate();
  }

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
}

export { World };
