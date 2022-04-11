import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { Mesh, MeshPhongMaterial } from 'three';

// Convert fonts using facetype.js

/* 
function loadFont() {
  let copperplate;
  const loader = new FontLoader();
  loader.load(
    '../../assets/fonts/CopperplateGothicLightRegular.json',
    function (response) {
      copperplate = response;
    },
  );

  return copperplate;
}

export { loadFont };

function createTextGeo() {
  //const copperplate = loadFont();
  let copperplate;
  let infoClickText = 'Click to see infos';

  const infoClickGeo = new TextGeometry(infoClickText, {
    font: copperplate,
    size: 80,
    height: 5,
    curveSegments: 12,
    bevelEnabled: true,
    bevelThickness: 10,
    bevelSize: 8,
    bevelOffset: 0,
    bevelSegments: 5,
  });

  //infoClick.position.set(5, 0, 0);

  return infoClickGeo;
}

function createText() {
  const infoClickGeo = createTextGeo();
  const infoClickMat = new MeshPhongMaterial({ color: 'blue' });
  const infoClick = new Mesh(infoClickGeo, infoClickMat);

  infoClick.position.set(0, 0, 0);

  return infoClick;
}
export { createText };
 */

const text = 'aems';
const height = 2;
const size = 10;
const curveSegments = 10;
const bevelThickness = 1;
const bevelSize = 0.3;
const bevelSegments = 3;
const bevelEnabled = true;
let font = undefined;

function loadFont() {
  var loader = new FontLoader();
  loader.load(
    '../../assets/fonts/CopperplateGothicLightRegular.json',
    function (res) {
      font = res;
      createText();
    },
  );
}

export { loadFont };

function createText() {
  const textGeo = new TextGeometry('FUCK YOU', {
    font: font,
    size: size,
    height: height,
    curveSegments: curveSegments,
    weight: 'normal',
    bevelThickness: bevelThickness,
    bevelSize: bevelSize,
    bevelSegments: bevelSegments,
    bevelEnabled: bevelEnabled,
  });
  textGeo.computeBoundingBox();
  textGeo.computeVertexNormals();

  const textMat = new MeshPhongMaterial({ color: 'yellow' });
  const text = new Mesh(textGeo, textMat);
  text.position.x = -textGeo.boundingBox.max.x / 2;
  text.castShadow = true;

  return text;
}

export { createText };
