import * as THREE from 'three'

// FLOOR
function createFloorMaterial() {
  const textureLoader = new THREE.TextureLoader()
  const floorTexture = textureLoader.load(
    '/assets/textures/Ground_Gravel_smmleglb_2K_surface_ms/smmleglb_2K_Albedo.jpg'
  )
  floorTexture.wrapS = THREE.RepeatWrapping
  floorTexture.wrapT = THREE.RepeatWrapping
  floorTexture.repeat.set(80, 80)
  const floorMaterial = new THREE.MeshStandardMaterial({
    map: floorTexture,
    //color: 'blue',
  })

  return floorMaterial
}

function createCeilingMaterial() {
  const textureLoader = new THREE.TextureLoader()
  const ceilingTexture = textureLoader.load(
    '/assets/textures/Ground_Gravel_smmleglb_2K_surface_ms/smmleglb_2K_Albedo.jpg'
  )
  ceilingTexture.wrapS = THREE.RepeatWrapping
  ceilingTexture.wrapT = THREE.RepeatWrapping
  ceilingTexture.repeat.set(80, 80)
  const ceilingMaterial = new THREE.MeshStandardMaterial({
    //map: ceilingTexture,
    color: 'red',
  })

  return ceilingMaterial
}

// WALL 1 / ARRIERE
function createWallBackMaterial() {
  const wallBackMaterial = new THREE.MeshStandardMaterial({ color: 'purple' })

  return wallBackMaterial
}

// WALL 2 / AVANT
function createWallFrontMaterial() {
  const wallFrontMaterial = new THREE.MeshStandardMaterial({ color: 'blue' })

  return wallFrontMaterial
}

// WALL 3 / GAUCHE
function createWallLeftMaterial() {
  const wallLeftMaterial = new THREE.MeshStandardMaterial({ color: 'green' })

  return wallLeftMaterial
}

// WALL 4 / DROITE
function createWallRightMaterial() {
  const wallRightMaterial = new THREE.MeshStandardMaterial({ color: 'yellow' })

  return wallRightMaterial
}

// OBJET TEST
function createObjectMaterial() {
  const objetTestMaterial = new THREE.MeshStandardMaterial({ color: 'black' })

  return objetTestMaterial
}

function createStructure() {
  const building = new THREE.Object3D()
  // ROOM DIMENSIONS
  const wallWidth = 120
  const wallHeight = 40

  // FLOOR
  const floorGeometry = new THREE.PlaneGeometry(wallWidth, wallWidth)
  const floorMaterial = createFloorMaterial()
  const floor = new THREE.Mesh(floorGeometry, floorMaterial)
  floor.rotateX(-Math.PI / 2)
  floor.receiveShadow = true
  floor.overdraw = true
  floor.position.set(0, 0, 0)
  building.add(floor)

  // CEILING
  const ceilingMaterial = createCeilingMaterial()
  const ceiling = new THREE.Mesh(floorGeometry, ceilingMaterial)
  ceiling.position.set(0, wallHeight, 0)
  ceiling.rotateX(Math.PI / 2)
  building.add(ceiling)

  // X : vers la droite
  // Y : vers le haut
  // Z : vers l'arrière

  const wallGeometry = new THREE.PlaneGeometry(wallWidth, wallHeight)

  // WALL 1 / arrière (purple)
  const wallBackMaterial = createWallBackMaterial()
  const wallBack = new THREE.Mesh(wallGeometry, wallBackMaterial)
  wallBack.rotateX(Math.PI)
  wallBack.position.set(0, wallHeight / 2, wallWidth / 2)
  wallBack.overdraw = true
  building.add(wallBack)

  const wallBackBox = new THREE.BoxHelper(wallBack)
  wallBackBox.update()

  // WALL 2 / avant (blue)
  const wallFrontMaterial = createWallFrontMaterial()
  const wallFront = new THREE.Mesh(wallGeometry, wallFrontMaterial)
  wallFront.rotateY(2 * Math.PI)
  wallFront.position.set(0, wallHeight / 2, -wallWidth / 2)
  wallFront.overdraw = true
  building.add(wallFront)

  const wallFrontBox = new THREE.BoxHelper(wallFront)
  wallFrontBox.update()

  // WALL 3 / gauche (green)
  const wallLeftMaterial = createWallLeftMaterial()
  const wallLeft = new THREE.Mesh(wallGeometry, wallLeftMaterial)
  wallLeft.rotateY(Math.PI / 2)
  wallLeft.position.set(-wallWidth / 2, wallHeight / 2, 0)
  wallLeft.overdraw = true
  building.add(wallLeft)

  const wallLeftBox = new THREE.BoxHelper(wallLeft)
  wallLeftBox.update()

  // WALL 4 / droite (yellow)
  const wallRightMaterial = createWallRightMaterial()
  const wallRight = new THREE.Mesh(wallGeometry, wallRightMaterial)
  wallRight.rotateY(-Math.PI / 2)
  wallRight.position.set(wallWidth / 2, wallHeight / 2, 0)
  wallRight.overdraw = true
  building.add(wallRight)

  const wallRightBox = new THREE.BoxHelper(wallRight)
  wallRightBox.update()

  // OBJET TEST
  const objetTestGeometry = new THREE.SphereGeometry(5, 32, 32)
  const objetTestMaterial = createObjectMaterial()
  const objetTest = new THREE.Mesh(objetTestGeometry, objetTestMaterial)
  objetTest.position.set(0, 0, 0)
  objetTest.castShadow = true
  objetTest.receiveShadow = false

  return {
    building,
    objetTest,
  }
}

export { createStructure }

/* 

// OLD FLOOR

let floorGeometry = new THREE.PlaneGeometry( 2000, 2000, 100, 100 );
    floorGeometry.rotateX( - Math.PI / 2 );

// vertex displacement

const vertex = new THREE.Vector3();
const color = new THREE.Color();

let position = floorGeometry.attributes.position;

for ( let i = 0, l = position.count; i < l; i ++ ) {

    vertex.fromBufferAttribute( position, i );

    vertex.x += Math.random() * 20 - 10;
    vertex.y += Math.random() * 2;
    vertex.z += Math.random() * 20 - 10;

    position.setXYZ( i, vertex.x, vertex.y, vertex.z );

}

floorGeometry = floorGeometry.toNonIndexed(); // ensure each face has unique vertices

position = floorGeometry.attributes.position;
const colorsFloor = [];

for ( let i = 0, l = position.count; i < l; i ++ ) {

    color.setHSL( Math.random() * 0.3 + 0.5, 0.75, Math.random() * 0.25 + 0.75 );
    colorsFloor.push( color.r, color.g, color.b );

}

floorGeometry.setAttribute( 'color', new THREE.Float32BufferAttribute( colorsFloor, 3 ) );

const floorMaterial = new THREE.MeshBasicMaterial( { vertexColors: true } );

const floor = new THREE.Mesh( floorGeometry, floorMaterial );

 */
