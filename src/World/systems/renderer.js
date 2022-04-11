import { WebGLRenderer, VSMShadowMap, sRGBEncoding, PCFShadowMap } from 'three'

function createRenderer() {
  const renderer = new WebGLRenderer({ antialias: true })
  renderer.setPixelRatio(window.devicePixelRatio)
  renderer.setSize(window.innerWidth, window.innerHeight)
  renderer.shadowMap.enabled = true
  //renderer.shadowMap.type = VSMShadowMap;
  renderer.shadowMap.type = PCFShadowMap

  // To get better textures
  renderer.toneMappingExposure = 1
  renderer.outputEncoding = sRGBEncoding

  //const container = document.getElementById('container');
  const container = document.createElement('div')
  document.body.appendChild(container)

  container.appendChild(renderer.domElement)

  return renderer
}

export { createRenderer }
