import { PerspectiveCamera } from 'three';

function createCamera() {
  const camera = new PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000,
  );
  camera.rotation.order = 'YXZ';
  // camera.position.set(0, 0, 0);

  return camera;
}

export { createCamera };
