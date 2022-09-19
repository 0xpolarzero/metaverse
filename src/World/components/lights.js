import {
  AmbientLight,
  DirectionalLight,
  SpotLight,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  DirectionalLightHelper,
} from 'three';

function createLights() {
  const lightsArray = [];

  const ambientLight = new AmbientLight(0x6688cc, 5);
  lightsArray.push(ambientLight);

  // Light Red
  const fillLight1 = new DirectionalLight(0xff9999, 10);
  fillLight1.position.set(10, 2, 0);
  fillLight1.castShadow = true;
  lightsArray.push(fillLight1);

  // const helper1 = new DirectionalLightHelper(fillLight1, 5);
  // lightsArray.push(helper1);

  // Purple
  const fillLight2 = new DirectionalLight(0xff9999, 0);
  fillLight2.position.set(-10.5, 10, -2);
  fillLight2.castShadow = true;
  lightsArray.push(fillLight2);

  // const helper2 = new DirectionalLightHelper(fillLight2, 5);
  // lightsArray.push(helper2);

  const directionalLight1 = new DirectionalLight(0xffffaa, 0);
  directionalLight1.position.set(-5, 25, -1);
  lightsArray.push(directionalLight1);

  const directionalLight2 = new DirectionalLight(0xffffaa, 0);
  directionalLight2.position.set(5, 25, 1);
  lightsArray.push(directionalLight2);

  const directionals = [directionalLight1, directionalLight2];

  for (const dir of directionals) {
    dir.castShadow = true;
    dir.shadow.camera.near = 0.01;
    dir.shadow.camera.far = 500;
    dir.shadow.camera.right = 30;
    dir.shadow.camera.left = -30;
    dir.shadow.camera.top = 30;
    dir.shadow.camera.bottom = -30;
    dir.shadow.mapSize.width = 1024;
    dir.shadow.mapSize.height = 1024;
    dir.shadow.radius = 4;
    dir.shadow.bias = -0.00006;
  }

  // const helper3 = new DirectionalLightHelper(directionalLight1, 5);
  // lightsArray.push(helper3);
  // const helper4 = new DirectionalLightHelper(directionalLight2, 5);
  // lightsArray.push(helper4);

  const camLight = new SpotLight(
    0xffffaa,
    1,
    10, // max range
  );

  camLight.position.set(0, 0, -3);
  camLight.castShadow = true;
  camLight.receiveShadow = false;

  return lightsArray;
}

function createLightDirection() {
  const camLightDir = new Mesh(
    new SphereGeometry(0.5, 5, 5),
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    }),
  );
  camLightDir.position.set(0, 1, 0);
  camLightDir.castShadow = false;
  camLightDir.receiveShadow = false;

  return camLightDir;
}

export { createLights, createLightDirection };
