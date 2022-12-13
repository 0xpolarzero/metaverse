import { Clock } from 'three';

const clock = new Clock();

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera;
    this.scene = scene;
    this.renderer = renderer;
    this.updatables = [];
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // Tells each object to tick forward one frame (animated ones)
      this.tick();
      // Render a frame
      this.renderer.render(this.scene, this.camera);
    });
  }

  stop() {
    this.renderer.setAnimationLoop(null);
  }

  tick() {
    // Only call the getDelta function once per frame
    const delta = clock.getDelta();

    for (const object of this.updatables) {
      if (object) {
        object.tick(delta);
      }
    }
  }
}

export { Loop };
