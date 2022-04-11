import {
  MathUtils,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  Box3,
  BoxHelper,
  Object3D,
  Vector3,
} from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import { setupModelAnimated } from './setupModel';
import { setupModelStatic } from './setupModel';

async function loadBlendsAnimated() {
  const loaderAnimated = new GLTFLoader();

  const [flamingoData] = await Promise.all([
    // loaderAnimated.loadAsync('/assets/models/Flamingo.glb'),
  ]);

  // console.log('Datas!! ANIMATED', flamingoData);

  // const flamingo = setupModelAnimated(flamingoData);
  // flamingo.position.set(0, 0, 0);

  return {
    // flamingo,
  };
}

export { loadBlendsAnimated };

async function loadBlendsStatic() {
  const loaderStatic = new GLTFLoader().setPath('./assets/models/');

  // Importation des modèles
  const [boule1Data, boule2Data, boule3Data, bouleTransData] =
    await Promise.all([
      loaderStatic.loadAsync('boule1.glb'),
      loaderStatic.loadAsync('boule2.glb'),
      loaderStatic.loadAsync('boule3.glb'),
      loaderStatic.loadAsync('bouleTrans.glb'),
    ]);

  // Définition des positions

  const boule1 = setupModelStatic(boule1Data);
  boule1.position.set(10, -3.5, 0);
  //boule1.cursor = 'pointer';
  boule1.castShadow = true;

  const boule2 = setupModelStatic(boule2Data);
  boule2.position.set(0, -3.5, -3);
  //boule2.cursor = 'pointer';
  boule2.castShadow = true;

  const boule3 = setupModelStatic(boule3Data);
  boule3.position.set(-3, -3.5, 0);
  //boule3.cursor = 'pointer';
  boule3.castShadow = true;

  const bouleTrans = setupModelStatic(bouleTransData);
  bouleTrans.position.set(-5, -3.5, -5);
  //boule3.cursor = 'pointer';
  bouleTrans.castShadow = true;

  // Définition des animations
  boule1.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(35);
    boule1.rotation.y += 0.1 * delta;
  };

  boule2.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(10);
    boule2.rotation.y -= radiansPerSecond * delta;
  };

  boule3.tick = (delta) => {
    const radiansPerSecond = MathUtils.degToRad(50);
    boule3.rotation.x += radiansPerSecond * delta;
  };

  return {
    boule1,
    boule2,
    boule3,
    bouleTrans,
  };
}

export { loadBlendsStatic };

function loadBlendsObj() {
  const objGeometry = new SphereGeometry(2, 32, 16);
  const objMaterial = new MeshBasicMaterial({
    color: 'red',
    transparent: true,
    opacity: 0,
  });

  const boule1Obj = new Mesh(objGeometry, objMaterial);
  boule1Obj.position.set(10, -3.5, 0);
  boule1Obj.userData = { desc: 'boule 1 ici' };
  // TESTER AUSSI userData.desc = blabla
  boule1Obj.name = `premier objet`;

  const boule2Obj = new Mesh(objGeometry, objMaterial);
  boule2Obj.position.set(0, -3.5, -3);
  boule2Obj.userData = { desc: 'boule 2 là' };
  boule2Obj.name = `deuxieme objet`;

  const boule3Obj = new Mesh(objGeometry, objMaterial);
  boule3Obj.position.set(-3, -3.5, 0);
  boule3Obj.userData = { desc: 'boule 3 voilà' };
  boule3Obj.name = `troisieme objet`;

  return {
    boule1Obj,
    boule2Obj,
    boule3Obj,
  };
}

export { loadBlendsObj };
