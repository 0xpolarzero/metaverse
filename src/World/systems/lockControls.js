import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';
import { createCamera } from '../components/camera';

const camera = createCamera();

function lockControls() {
  // LOCK SCREEN & INFOS
  lockControls = new PointerLockControls(camera, document.body);
  const instructions = document.getElementById('instructions');
  const blocker = document.getElementById('container');

  instructions.addEventListener('click', function () {
    lockControls.lock();
  });

  lockControls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  });

  lockControls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
  });
}

export { lockControls };
