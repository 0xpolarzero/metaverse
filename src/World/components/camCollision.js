import { displayNotif } from '../utils/notification';

import { Mesh, DodecahedronGeometry, MeshBasicMaterial, Box3 } from 'three';

function createCamColliders(objs) {
  const camSphereDetector = new Mesh(
    new DodecahedronGeometry(),
    new MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0,
    }),
  );

  return camSphereDetector;
}

const camSphereDetector = createCamColliders();
const informations = document.querySelector('#informations-container');

function getObjectProximity(camera, ...objs) {
  const camBB = new Box3().setFromObject(camSphereDetector);
  camBB.min.add(camera.position);
  camBB.max.add(camera.position);

  const bouleBBoxes = Array(objs.length);
  for (let i = 0; i < objs.length; i++) {
    const objBB = new Box3().setFromObject(objs[i]);
    bouleBBoxes[i] = objBB;
    objBB.desc = objs[i].userData.desc;
    if (objBB.intersectsBox(camBB)) {
      return objBB;
    }
  }

  return [camBB, bouleBBoxes];
}

function showUserSelection(camera, ...objs) {
  const object = getObjectProximity(camera, ...objs);
  if (object.desc !== undefined) showObjectInformation(object);
}

function showObjectInformation(object) {
  console.log(`Got ${object.desc}`);

  informations.style.display = 'flex';
  document.querySelector('#informations-box').textContent = object.desc;
}

function hideObjectInformations() {
  informations.style.display = 'none';
}

function showUserHint(camera, ...objs) {
  const object = getObjectProximity(camera, ...objs);
  if (object.desc !== undefined) {
    if (informations.style.display !== 'flex') {
      displayNotif('hint', 'Click to get infos about this object', 200);
    }
  } else {
    hideObjectInformations();
  }
}

export {
  createCamColliders,
  getObjectProximity,
  showUserSelection,
  hideObjectInformations,
  showUserHint,
};
