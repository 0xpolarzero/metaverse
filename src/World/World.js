/* eslint-disable import/extensions */
// Ajouter un curseur au milieu de l'écran pour pouvoir pointer les objets et avoir les infos
// Avec échap pouvoir récupérer le curseur
// https://threejs.org/examples/?q=fp#games_fps
// Three.js r 136

import {
  Vector3,
  LOD,
  IcosahedronGeometry,
  MeshLambertMaterial,
  Mesh,
  Clock,
  Box3,
  BoxHelper,
  DodecahedronGeometry,
  MeshStandardMaterial,
  GridHelper,
  AxesHelper,
  TextureLoader,
  MeshBasicMaterial,
  Box3Helper,
  LoadingManager,
  Points,
  ShaderMaterial,
  AdditiveBlending,
  //} from '../../vendor/three136custom/build/three.module.js';
} from 'three';

// Import jsm modules
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Octree } from 'three/examples/jsm/math/Octree';
import { Capsule } from 'three/examples/jsm/math/Capsule';
// import { PointerLockControls } from '/../../vendor/three136custom/examples/jsm/controls/PointerLockControls.js';
// import { Interaction } from '../../vendor/three136custom/examples/interaction/interactionIndex.js';

// Import components
import { createScene } from './components/scene';
import { createCamera } from './components/camera';
import { createLights } from './components/lights';
import { createCrosshair } from './components/crosshair';
import { createCamColliders, camCollisionNew } from './components/camCollision';
import {
  createParticlesGeometry,
  createParticlesMaterial,
} from './components/particles';
import {
  loadBlendsStatic,
  loadBlendsObj,
  loadBlendsAnimated,
} from './components/objects/blends';

// Import systems
import { createRenderer } from './systems/renderer';
import { Resizer } from './systems/Resizer';
import { Loop } from './systems/Loop';
import { lockControls } from './systems/lockControls';

// Import shaders
import vShader from './shaders/particles/vertex.glsl.js';
import fShader from './shaders/particles/fragment.glsl.js';

// Import audio
//import * as ResonanceAudio from '../../vendor/resonance-audio/build/resonance-audio.js';
/* import { createRequire } from '../../../../node_modules/module';
const require = createRequire(import.meta.url);
const ResonanceAudio = require('resonance-audio'); */

// BASIC SCENE INPUTS
let scene;
let camera;
let renderer;
let resizer;
let loop;

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
    /* 
    // Transparent objects to provide targets for the lights
    const { boule1Obj, boule2Obj, boule3Obj } = loadBlendsObj();
    scene.add(boule1Obj, boule2Obj, boule3Obj);
     */

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

    //fillLight1.target = boule1Obj;

    const sprite = createCrosshair();
    camera.add(sprite);
  }

  async asyncInit() {
    const { boule1, boule2, boule3, bouleTrans } = await loadBlendsStatic();

    const modelsStatic = {
      boule1,
      boule2,
      boule3,
    };
    scene.add(boule1, boule2, boule3, bouleTrans);

    // INTERACTION
    // const interaction = new Interaction(renderer, scene, camera);
    // const box = document.querySelector('#event-box');

    /*
    function blink( dom ) {

      clearTimeout( dom.timer );
      dom.className = 'marker active';
      dom.timer = setTimeout( function() {

        dom.className = 'marker';

      }, 300 );

    }
    */

    //////////////////////////////////////////////////////////////////////////////////////////
    // TEST INTERACTION

    /* 
    //function camRaycast() {

      const firstObject = new THREE.Mesh( new THREE.SphereGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( { color: 0xffff00 } ));
      firstObject.position.set( 0, -3, 20 );
      scene.add( firstObject );
  
      const secondObject = new THREE.Mesh( new THREE.SphereGeometry( 5, 5, 5 ), new THREE.MeshBasicMaterial( { color: 'red' } ) );
      secondObject.position.set( 0, -3, -5 );
      camera.add( secondObject );

      const firstBB = new THREE.Box3().setFromObject( firstObject );
  
      const secondBB = new THREE.Box3().setFromObject( secondObject );
  
      //const collision = firstBB.intersectsBox( secondBB );
      if ( firstBB.intersectsBox( secondBB ) ) {

        console.log( 'yes bv' );

      };

    //} 

      //camRaycast();

 */

    /* function camGetObject() {

      let camera_world_pos = new THREE.Vector3();
      let camera_world_dir = new THREE.Vector3();
      let camRaycaster = new THREE.Raycaster();
      
      camera.getWorldPosition( camera_world_pos );
      camera.getWorldDirection( camera_world_dir );
      camRaycaster.set( camera_world_pos, camera_world_dir );
      let camIntersects = camRaycaster.intersectObjects( modelsStatic );
      if ( camIntersects.length > 0 ) {

          console.log( 'okfrero' );
      
      }

    } */

    loop.updatables.push(boule1, boule2, boule3);

    //////////////////////////////////////////////////////////////////////////////////////////

    //interaction.update();
  }

  initialInit() {
    // CREATING THE GAME VARIABLES
    const GRAVITY = 30;
    const STEPS_PER_FRAME = 5;

    const worldOctree = new Octree();

    const playerCollider = new Capsule(
      new Vector3(10, 0.35, 0), // Lower part of capsule
      new Vector3(10, 1, 0), // Higher part of capsule + camera
      0.35,
    );
    const playerVelocity = new Vector3();
    const playerDirection = new Vector3();

    let playerOnFloor = false;
    let mouseTime = 0;

    const keyStates = {};
    // const objects = [];

    // DETECTING INPUT FROM THE PLAYER
    // Key movements
    document.addEventListener('keydown', (event) => {
      keyStates[event.code] = true;
    });

    document.addEventListener('keyup', (event) => {
      keyStates[event.code] = false;
    });

    /* 
    document.addEventListener( 'mousedown', () => {
      document.body.requestPointerLock();
      mouseTime = performance.now();
    } );
 */

    // Mouse
    lockControls();

    document.body.addEventListener('mousemove', (event) => {
      if (document.pointerLockElement === document.body) {
        camera.rotation.y -= event.movementX / 500;
        camera.rotation.x -= event.movementY / 500;
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

    // INTERACTION WITH THE MODELS
    const { camSphereDetector } = createCamColliders();
    camera.add(camSphereDetector);
    const { boule1Obj, boule2Obj, boule3Obj } = loadBlendsObj();
    let bouleObjs = [boule1Obj, boule2Obj, boule3Obj];
    scene.add(...bouleObjs);

    // HELPERS FOR VISUAL
    const [camBB, boulesBB] = camCollisionNew(camera, ...bouleObjs);
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
    document.addEventListener('mouseup', () => {
      camCollisionNew(camera, ...bouleObjs);
    });

    const informations = document.getElementById('informations-container');
    document.addEventListener('keydown', () => {
      if (keyStates.KeyH || keyStates.keyR) {
        informations.style.display = 'none';
      }
    });

    // LOADING SCREEN / From Mugen87 on discourse.threejs.org
    const loadingManager = new LoadingManager(() => {
      const loadingScreen = document.getElementById('loading-screen');
      loadingScreen.classList.add('fade-out');
      loadingScreen.addEventListener('transitionend', onTransitionEnd);
    });

    // LOADING THE STRUCTURE
    const loader = new GLTFLoader(loadingManager).setPath('./assets/models/');

    // LOADING WITH THE APPLIED TEXTURE
    loader.load('structureDivided.glb', (gltf) => {
      scene.add(gltf.scene);
      worldOctree.fromGraphNode(gltf.scene);

      gltf.scene.traverse((child) => {
        if (child.isMesh) {
          child.castShadow = false;
          child.receiveShadow = true;

          if (child.material.map) {
            child.material.map.anisotropy = 8;
          }
        }
      });

      animate();
    });

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
        controls(deltaTime);
        updatePlayer(deltaTime);
        // updateSpheres( deltaTime );
        teleportPlayerIfOob();

        //camCollisionNew(camera, ...bouleObjs);
        //hideText();
        moveParticles(deltaFlies);
      }

      renderer.render(scene, camera);

      requestAnimationFrame(animate);
    }

    function onTransitionEnd(event) {
      event.target.remove();
    }
  } // fin init

  start() {
    loop.start();
  }

  stop() {
    loop.stop();
  }
} // fin World

export { World };
