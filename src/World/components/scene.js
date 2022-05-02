import { Scene, Color, Fog } from 'three';

function createScene() {
  const scene = new Scene();
  scene.background = new Color('#353434');
  scene.fog = new Fog(0x000000, 1, 30);

  return scene;
}

export { createScene };
