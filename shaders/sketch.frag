precision mediump float;

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

uniform float iGlobalTime;
varying vec2 vUv;

void main() {
  float color = cnoise2(vUv.yx * (cos(iGlobalTime * 0.6) * 80.)) * 2.0;
  gl_FragColor = vec4( sin(vUv.y * 3.0), (sqrt( vUv.x)) * cos(color), cos(vUv.x * cos(iGlobalTime)) + (color), 1. );
}
