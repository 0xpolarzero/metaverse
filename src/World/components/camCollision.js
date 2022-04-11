import * as THREE from 'three'
import { createCamera } from './camera'
import { createScene } from './scene'

const camera = createCamera()
const scene = createScene()

function createCamColliders() {
  const camSphereDetector = new THREE.Mesh(
    //new THREE.SphereGeometry(1, 32, 32),
    new THREE.DodecahedronGeometry(),
    new THREE.MeshBasicMaterial({
      color: 'red',
      transparent: true,
      opacity: 0,
    })
  )
  //camSphereDetector.position.set(10, -3.5, 0);
  // camSphereDetector.position.copy(camera.position);

  const camHelper = new THREE.BoxHelper(camSphereDetector, 0xffff00)
  camSphereDetector.attach(camHelper)

  return {
    camSphereDetector,
  }
}

export { createCamColliders }

const { camSphereDetector } = createCamColliders()
const informations = document.getElementById('informations-container')

// Passing the camera as an argument and translating the BBox by its position
// to fix the world position/local position impedance
function camCollisionNew(camera, ...objs) {
  const camBB = new THREE.Box3().setFromObject(camSphereDetector)
  camBB.min.add(camera.position)
  camBB.max.add(camera.position)

  // Setting up an array to be passed back to the prior context
  const bouleBBoxes = Array(objs.length)
  for (let i = 0; i < objs.length; i++) {
    const objBB = new THREE.Box3().setFromObject(objs[i])
    bouleBBoxes[i] = objBB
    objBB.name = `Bounding Box ${i + 1}`
    const objDesc = objs[i].userData.desc
    if (objBB.intersectsBox(camBB)) {
      console.log(`Got it! ${objBB.name}`)

      informations.style.display = 'flex'
      let ele = document.getElementById('informations-box')
      ele.innerHTML = `${objDesc}`
    }
  }

  return [camBB, bouleBBoxes]
}

export { camCollisionNew }
