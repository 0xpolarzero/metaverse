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
  const ambientLight = new AmbientLight(0x6688cc, 0);

  // Light Red
  const fillLight1 = new DirectionalLight(0xff9999, 5);
  fillLight1.position.set(10, 2, 0);
  fillLight1.castShadow = true;

  const helper1 = new DirectionalLightHelper(fillLight1, 5);

  // Purple
  const fillLight2 = new DirectionalLight(0xff9999, 5);
  fillLight2.position.set(-10.5, 10, -2);
  fillLight2.castShadow = true;

  const helper2 = new DirectionalLightHelper(fillLight2, 5);

  const directionalLight1 = new DirectionalLight(0xffffaa, 5);
  directionalLight1.position.set(-5, 25, -1);

  const directionalLight2 = new DirectionalLight(0xffffaa, 5);
  directionalLight2.position.set(5, 25, 1);

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

  const helper3 = new DirectionalLightHelper(directionalLight1, 5);
  const helper4 = new DirectionalLightHelper(directionalLight2, 5);

  const camLight = new SpotLight(
    0xffffaa,
    1,
    10, // max range
  );

  camLight.position.set(0, 0, -3);
  camLight.castShadow = true;
  camLight.receiveShadow = false;

  return {
    ambientLight,
    fillLight1,
    fillLight2,
    directionalLight1,
    directionalLight2,
    camLight,
    helper1,
    helper2,
    helper3,
    helper4,
  };
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
