precision mediump float;

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)

uniform float iGlobalTime;
varying vec2 vUv;

void main() {
  float color = cnoise2(vUv.yx * (cos(iGlobalTime * 0.1) * 50.)) * 2.0;
  gl_FragColor = vec4( color * 2.0 * sin(vUv.x * 3.0), sin(vUv.x), cos(vUv.x * color * cos(iGlobalTime)) - 0.25, 1. );
}
