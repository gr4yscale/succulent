precision mediump float;

#pragma glslify: cnoise2 = require(glsl-noise/classic/2d)
#pragma glslify: snoise2 = require(glsl-noise/simplex/2d)

uniform float iGlobalTime;
varying vec2 vUv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_vertPosition;

const vec4 diffuseColor = vec4(1.0, 1.0, 1.0, 1.0);

const vec4 specularColor = vec4(1.0, 1.0, 1.0, 1.0);
const float shininess = 24.0;

//const vec3 lightDirection = vec3(1.0,1.0,0.8);
const vec3 lightDirection = vec3(1.0,1.0,0.8);
const vec3 lightPosition = vec3(4.0, 0.85, 1.5);

//http://stackoverflow.com/a/25735581
//https://en.wikipedia.org/wiki/Blinn%E2%80%93Phong_shading_model

void main() {
  float color = cnoise2(vUv.yx * (cos(iGlobalTime * 0.6) * 80.)) * 2.0;
  float stripesA = sin(vUv.x * 100.) * 4.0;
  float stripesB = sin(vUv.x * 10.) * 4.0;

  vec3 base;
  base.x = 0.8 + (sin(vUv.y * 100.) * 0.5);
  base.y = vUv.x;
  base.z = vUv.y + sin(iGlobalTime);

  ///////// LIGHTING

  // Diffuse
  float d = dot(v_normal,lightDirection);

  // Specular

  vec3 viewDirection = normalize(-v_vertPosition);

  vec3 halfVector = normalize(lightDirection + viewDirection);
  float nDoth = dot(v_normal, halfVector);
  float s = pow(nDoth, shininess);

  //vec4 lightingPower = (d * diffuseColor) + (s * specularColor);
  vec4 lightingPower = (s * specularColor);

  vec4 finalColor = vec4(base.xyz, 1.0) * lightingPower;

  gl_FragColor = lightingPower;
}
