import { LoadingManager } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

async function createStructure(collider, scene) {
  const loadingManager = new LoadingManager(() => {
    const loadingScreen = document.querySelector('#loading-screen');
    loadingScreen.classList.add('fade-out');
    loadingScreen.addEventListener('transitionend', hideLoader);
  });

  // LOADING THE STRUCTURE
  const loader = new GLTFLoader(loadingManager).setPath('./assets/models/');

  // LOADING WITH THE APPLIED TEXTURE
  loader.load('structureDivided.glb', (gltf) => {
    scene.add(gltf.scene);
    collider.fromGraphNode(gltf.scene);

    gltf.scene.traverse((child) => {
      if (child.isMesh) {
        child.castShadow = false;
        child.receiveShadow = true;

        if (child.material.map) {
          child.material.map.anisotropy = 8;
        }
      }
    });
  });
}

function hideLoader(e) {
  e.target.remove();
}

export { createStructure };
