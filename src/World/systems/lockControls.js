import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js'
// import { GUI } from '/vendor/dat.gui/build/dat.gui.module.js';
import { createCamera } from '../components/camera'

const camera = createCamera()

function lockControls() {
  // LOCK SCREEN & INFOS
  lockControls = new PointerLockControls(camera, document.body)
  const instructions = document.getElementById('instructions')
  const blocker = document.getElementById('container')
  const navbar = document.getElementById('navbar')

  instructions.addEventListener('click', function () {
    lockControls.lock()
  })
  /* 
    function buttonFunction() {
        lockControls.lock();
    }

    const params = {
        ENTER: buttonFunction
    };

    //const gui = new GUI();
    const gui = new GUI({autoPlace: false, width: 100, height: 1000});
    const customContainer = document.getElementById('gui-container');
    customContainer.appendChild(gui.domElement);
    //gui.domElement.id = 'gui';
    //gui-container.appendChild(gui.domElement);
    
    //const folder = gui.addFolder('My folder');
    gui.add(params, 'ENTER');

    gui.open();
    ////////////////////////////////////////////////////////////////////////////
 */
  lockControls.addEventListener('lock', function () {
    instructions.style.display = 'none'
    blocker.style.display = 'none'
    //navbar.style.display = '';
    //gui.hide();
  })

  lockControls.addEventListener('unlock', function () {
    blocker.style.display = 'block'
    instructions.style.display = ''
    // ici dire genre exclude navbar from click ou lock
    //gui.open();
    //gui.show();
  })
}

export { lockControls }
