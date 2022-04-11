import { MathUtils, Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { setupModel } from './setupModel';

async function loadBlendsStatic() {
  const loaderStatic = new GLTFLoader().setPath('./assets/models/');

  const [boule1Data, boule2Data, boule3Data, bouleTransData] =
    await Promise.all([
      loaderStatic.loadAsync('boule1.glb'),
      loaderStatic.loadAsync('boule2.glb'),
      loaderStatic.loadAsync('boule3.glb'),
      loaderStatic.loadAsync('bouleTrans.glb'),
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
  boule1Obj.userData = { desc: 'boule 1' };
  boule1Obj.name = `premier objet`;

  const boule2Obj = new Mesh(objGeometry, objMaterial);
  boule2Obj.position.set(0, -3.5, -3);
  boule2Obj.userData = { desc: 'boule 2' };
  boule2Obj.name = `deuxieme objet`;

  const boule3Obj = new Mesh(objGeometry, objMaterial);
  boule3Obj.position.set(-3, -3.5, 0);
  boule3Obj.userData = { desc: 'boule 3' };
  boule3Obj.name = `troisieme objet`;

  return {
    boule1Obj,
    boule2Obj,
    boule3Obj,
  };
}

export { loadBlendsObj };
