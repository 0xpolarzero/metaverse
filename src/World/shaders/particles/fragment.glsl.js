const fShader = `

  uniform float uTime;
  uniform vec3 fogColor;
  uniform float fogNear;
  uniform float fogFar;

  void main()
  {
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float opacity = clamp(distanceToCenter / 10000000.0, 0.0, 1.0);
    float strength = 0.05 / distanceToCenter - 0.1 - opacity;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
    gl_FragColor.a *= pow( gl_FragCoord.z, 5.0 );
    
    #ifdef USE_FOG
      #ifdef USE_LOGDEPTHBUF_EXT
          float depth = gl_FragDepthEXT / gl_FragCoord.w;
      #else
          float depth = gl_FragCoord.z / gl_FragCoord.w;
      #endif
      float fogFactor = smoothstep( fogNear, fogFar, depth );
      gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
    #endif
  }
`;

export default fShader;

//gl_FragColor.a += pow( cos(uTime) * aScaleFrag, 1.0 ) - 1.0;
