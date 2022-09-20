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
  // const fillLight1 = new DirectionalLight(0xff9999, 0);
  // Purple
  // const fillLight2 = new DirectionalLight(0xff9999, 0);

  const dirLight = new DirectionalLight(0xff9999, 1);
  dirLight.position.set(-5, 25, -1);
  lightsArray.push(dirLight);

  dirLight.castShadow = true;
  dirLight.shadow.camera.near = 0.01;
  dirLight.shadow.camera.far = 500;
  dirLight.shadow.camera.right = 30;
  dirLight.shadow.camera.left = -30;
  dirLight.shadow.camera.top = 30;
  dirLight.shadow.camera.bottom = -30;
  dirLight.shadow.mapSize.width = 1024;
  dirLight.shadow.mapSize.height = 1024;
  dirLight.shadow.radius = 4;
  dirLight.shadow.bias = -0.00006;

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
