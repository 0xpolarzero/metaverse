import {
  AmbientLight,
  DirectionalLight,
  SpotLight,
  SphereGeometry,
  MeshBasicMaterial,
  Mesh,
  DirectionalLightHelper,
  Group,
} from 'three'

function createLights() {
  const ambientLight = new AmbientLight(0x6688cc, 0)

  // couleur rosée
  const fillLight1 = new DirectionalLight(0xff9999, 5)
  fillLight1.position.set(10, 2, 0)
  fillLight1.castShadow = true

  const helper1 = new DirectionalLightHelper(fillLight1, 5)

  // violet : 0x8888ff
  const fillLight2 = new DirectionalLight(0xff9999, 5)
  fillLight2.position.set(-10.5, 10, -2)
  fillLight2.castShadow = true

  const helper2 = new DirectionalLightHelper(fillLight2, 5)

  const directionalLight1 = new DirectionalLight(0xffffaa, 5)
  directionalLight1.position.set(-5, 25, -1)
  directionalLight1.castShadow = true
  directionalLight1.shadow.camera.near = 0.01
  directionalLight1.shadow.camera.far = 500
  directionalLight1.shadow.camera.right = 30
  directionalLight1.shadow.camera.left = -30
  directionalLight1.shadow.camera.top = 30
  directionalLight1.shadow.camera.bottom = -30
  directionalLight1.shadow.mapSize.width = 1024
  directionalLight1.shadow.mapSize.height = 1024
  directionalLight1.shadow.radius = 4
  directionalLight1.shadow.bias = -0.00006

  const helper3 = new DirectionalLightHelper(directionalLight1, 5)

  const directionalLight2 = new DirectionalLight(0xffffaa, 5)
  directionalLight2.position.set(5, 25, 1)
  directionalLight2.castShadow = true
  directionalLight2.shadow.camera.near = 0.01
  directionalLight2.shadow.camera.far = 500
  directionalLight2.shadow.camera.right = 30
  directionalLight2.shadow.camera.left = -30
  directionalLight2.shadow.camera.top = 30
  directionalLight2.shadow.camera.bottom = -30
  directionalLight2.shadow.mapSize.width = 1024
  directionalLight2.shadow.mapSize.height = 1024
  directionalLight2.shadow.radius = 4
  directionalLight2.shadow.bias = -0.00006

  const helper4 = new DirectionalLightHelper(directionalLight2, 5)

  const camLight = new SpotLight(
    0xffffaa,
    1,
    10 // max range
    //Math.PI / 4, // angle of light dispersion (max Math.PI/2)
  )
  camLight.position.set(0, 0, -3)
  camLight.castShadow = true
  camLight.receiveShadow = false

  return {
    ambientLight,
    fillLight1,
    fillLight2,
    directionalLight1,
    directionalLight2,
    camLight,
    helper1,
    helper2,
    helper3,
    helper4,
  }
}

export { createLights }

function createLightDirection() {
  const camLightDir = new Mesh(
    new SphereGeometry(0.5, 5, 5),
    new MeshBasicMaterial({
      transparent: true,
      opacity: 0,
    })
  )
  camLightDir.position.set(0, 1, 0)
  camLightDir.castShadow = false
  camLightDir.receiveShadow = false

  return camLightDir
}

export { createLightDirection }
