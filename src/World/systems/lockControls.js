import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

function lockControls(camera) {
  // LOCK SCREEN & INFOS
  const controls = new PointerLockControls(camera, document.body);
  const instructions = document.getElementById('instructions');
  const blocker = document.getElementById('container');

  instructions.addEventListener('click', function () {
    controls.lock();
  });

  controls.addEventListener('lock', function () {
    instructions.style.display = 'none';
    blocker.style.display = 'none';
  });

  controls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    instructions.style.display = '';
  });
}

export { lockControls };
