import { PerspectiveCamera, Vector3 } from 'three'

function createCamera() {
  const camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
  camera.rotation.order = 'YXZ'
  camera.position.set(0, 30, 0)

  //camera.position.set(10, 0, 10);

  return camera
}

export { createCamera }
/* 
function getCamPos() {
  const camera = createCamera();

  const camPos = new Vector3();
  camera.getWorldPosition(camPos);

  return camPos;
}

export { getCamPos };
 */
