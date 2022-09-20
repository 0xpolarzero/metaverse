import { MathUtils, Mesh, SphereGeometry, MeshBasicMaterial } from 'three';

function loadBlends(objects) {
  let bulletsArray = [];

  for (const obj of objects) {
    const object = new Mesh(
      new SphereGeometry(1, 16, 16),
      new MeshBasicMaterial({
        color: obj.color,
      }),
    );
    object.position.set(obj.position.x, obj.position.y, obj.position.z);
    object.castShadow = true;
    object.tick = (delta) => {
      const radiansPerSecond = MathUtils.degToRad(object.speed);
      object.rotation.y += radiansPerSecond * delta;
    };
    object.userData = { desc: obj.type };

    bulletsArray.push(object);
  }

  return bulletsArray;
}

export { loadBlends };
