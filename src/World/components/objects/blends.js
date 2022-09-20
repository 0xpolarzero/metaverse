import {
  MathUtils,
  Mesh,
  SphereGeometry,
  MeshBasicMaterial,
  PointsMaterial,
  Points,
  BufferGeometry,
  Float32BufferAttribute,
} from 'three';

function loadBlends(objects) {
  let bulletsArray = [];

  for (const obj of objects) {
    const geometry = new SphereGeometry(1, 32, 32);

    const particlesGeometry = new BufferGeometry();
    const particlesCnt = 2000;

    const posArray = new Float32Array(particlesCnt * 3);

    for (let i = 0; i < particlesCnt * 3; i++) {
      posArray[i] = Math.random();
    }

    particlesGeometry.setAttribute(
      'position',
      new Float32BufferAttribute(posArray, 3),
    );

    const material = new PointsMaterial({
      size: 0.01,
      color: obj.color,
    });

    const object = new Points(geometry, material);

    object.position.set(obj.position.x, obj.position.y, obj.position.z);
    object.castShadow = true;
    object.tick = (delta) => {
      const radiansPerSecond = MathUtils.degToRad(obj.speed);
      object.rotation.y += radiansPerSecond * delta;
    };
    object.userData = { desc: obj.type };

    bulletsArray.push(object);
  }

  return bulletsArray;
}

export { loadBlends };
