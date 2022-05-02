const vShader = `

    uniform float uPixelRatio;
    uniform float uSize;
    uniform float uTime;
    in float aScale;

    void main()
    {
        vec4 modelPosition = modelMatrix * vec4(position, 1.0);
        modelPosition.y += sin((0.3 * uTime) + modelPosition.x * 300.0) * aScale * 0.15;
        modelPosition.x += cos((0.3 * uTime) + modelPosition.y * 10.0) * aScale * 0.1;
        modelPosition.z += cos((0.1 * uTime) + modelPosition.x * 10.0) * aScale * 0.1;
        vec4 viewPosition = viewMatrix * modelPosition;
        vec4 projectionPosition = projectionMatrix * viewPosition;

        gl_Position = projectionPosition;
        gl_PointSize = uSize * aScale * uPixelRatio;
        gl_PointSize *= (1.0 / - (viewPosition.z - 4.0));
    }
`;

export default vShader;

// in replacing attribute
