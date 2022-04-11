import { Mesh, DodecahedronGeometry, MeshBasicMaterial, Box3 } from 'three';

function createCamColliders() {
  const camSphereDetector = new Mesh(
    new DodecahedronGeometry(),
    new MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0,
    }),
  );

  return {
    camSphereDetector,
  };
}

export { createCamColliders };

const { camSphereDetector } = createCamColliders();
const informations = document.querySelector('#informations-container');

// Passing the camera as an argument and translating the BBox by its position
// to fix the world position/local position impedance
function camCollisionNew(camera, ...objs) {
  const camBB = new Box3().setFromObject(camSphereDetector);
  camBB.min.add(camera.position);
  camBB.max.add(camera.position);

  // Setting up an array to be passed back to the prior context
  const bouleBBoxes = Array(objs.length);
  for (let i = 0; i < objs.length; i++) {
    const objBB = new Box3().setFromObject(objs[i]);
    bouleBBoxes[i] = objBB;
    objBB.name = `Bounding Box ${i + 1}`;
    const objDesc = objs[i].userData.desc;
    if (objBB.intersectsBox(camBB)) {
      console.log(`Got it! ${objBB.name}`);

      informations.style.display = 'flex';
      let ele = document.querySelector('#informations-box');
      ele.textContent = objDesc;
    }
  }

  return [camBB, bouleBBoxes];
}

export { camCollisionNew };
