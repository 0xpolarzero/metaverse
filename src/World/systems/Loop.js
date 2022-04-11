import { Clock } from 'three'

const clock = new Clock()

class Loop {
  constructor(camera, scene, renderer) {
    this.camera = camera
    this.scene = scene
    this.renderer = renderer
    // pour lister les objets qui envoient un tick à chaque frame
    this.updatables = []
  }

  start() {
    this.renderer.setAnimationLoop(() => {
      // tells each object to tick forward one frame (animated ones)
      this.tick()
      // render a frame
      this.renderer.render(this.scene, this.camera)
    })
  }

  stop() {
    this.renderer.setAnimationLoop(null)
  }

  tick() {
    // only call the getDelta function once per frame
    const delta = clock.getDelta()

    for (const object of this.updatables) {
      if (object) {
        object.tick(delta)
      }
    }
  }
}

export { Loop }
