import { MathUtils, Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupModel } from './setupModel';

const modelsArray = [];

async function loadBlends() {
  const loader = new GLTFLoader().setPath('./assets/models/');

  const [boule1Data, boule2Data, boule3Data, bouleTransData] =
    await Promise.all([
      loader.loadAsync('boule1.glb'),
      loader.loadAsync('boule2.glb'),
      loader.loadAsync('boule3.glb'),
      loader.loadAsync('bouleTrans.glb'),
    ]);

  const boule1 = setupModel(boule1Data);
  boule1.position.set(10, -3.5, 0);
  boule1.castShadow = true;

  const boule2 = setupModel(boule2Data);
  boule2.position.set(0, -3.5, -3);
  boule2.castShadow = true;

  const boule3 = setupModel(boule3Data);
  boule3.position.set(-3, -3.5, 0);
  boule3.castShadow = true;

  const bouleTrans = setupModel(bouleTransData);
  bouleTrans.position.set(-5, -3.5, -5);
  bouleTrans.castShadow = true;

  boule1.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(35);
    boule1.rotation.y += radiansPerSecond * delta;
  };

  boule2.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(10);
    boule2.rotation.y -= radiansPerSecond * delta;
  };

  boule3.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(50);
    boule3.rotation.x += radiansPerSecond * delta;
  };

  modelsArray.push(boule1, boule2, boule3);

  return {
    boule1,
    boule2,
    boule3,
    bouleTrans,
  };
}

function createBlendsEnv() {
  const objGeometry = new SphereGeometry(2, 32, 16);
  const objMaterial = new MeshBasicMaterial({
    color: 'red',
    transparent: true,
    opacity: 0,
  });

  const envArray = [];

  // Create an enveloppe for each blend, for detection and interaction
  for (let i = 0; i < modelsArray.length; i++) {
    const object = new Mesh(objGeometry, objMaterial);
    object.position.set(
      modelsArray[i].position.x,
      modelsArray[i].position.y,
      modelsArray[i].position.z,
    );
    object.userData = { desc: `model ${i + 1}` };
    envArray.push(object);
  }

  return envArray;
}

export { loadBlends, createBlendsEnv };
