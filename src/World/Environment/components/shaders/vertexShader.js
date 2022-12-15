const vertexShader = /* glsl */ `
varying vec2 vUv;

void main() {
  vec4 worldPosition = modelMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  
  vUv = uv;
}
          `;

export default vertexShader;
