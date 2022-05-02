import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';
import { resumeAudio, stopAudio } from '../audio/main';

function lockControls(camera) {
  // LOCK SCREEN & INFOS
  const controls = new PointerLockControls(camera, document.body);
  const menu = document.querySelector('#user-menu');
  const blocker = document.querySelector('#container');

  controls.pointerSpeed = 0.3;

  menu.addEventListener('click', function () {
    controls.lock();
  });

  controls.addEventListener('lock', function () {
    menu.style.display = 'none';
    blocker.style.display = 'none';
    resumeAudio();
  });

  controls.addEventListener('unlock', function () {
    blocker.style.display = 'block';
    menu.style.display = '';
    stopAudio();
  });
}

export { lockControls };
