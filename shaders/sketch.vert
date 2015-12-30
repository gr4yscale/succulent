precision mediump float;

varying vec2 vUv;
varying vec3 v_normal;
varying vec3 v_position;
varying vec3 v_vertPosition;


void main() {
  // pass varyings to frag shader
  vUv = uv;
  v_normal = normal;

  vec4 vertPos4 = modelViewMatrix * vec4(position, 1.0);
  v_vertPosition = vec3(vertPos4) / vertPos4.w;

  v_position = position;

  gl_Position = projectionMatrix * modelViewMatrix * vec4( position.x, position.y, position.z, 1.0 );
}
