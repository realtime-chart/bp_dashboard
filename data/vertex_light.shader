attribute vec3 aVertexNormal;
attribute vec3 aVertexPosition;
attribute vec4 aVertexColor;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

uniform vec3 uAmbientColor;
uniform vec3 uLightingDirection;
uniform vec3 uDirectionalColor;

varying vec3 vLightWeighting;

varying vec4 vColor;

uniform float f; // this is incremented every frame
uniform float t; // this is time in milliseconds since epoch


void main(void){
  gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition, sin(f/100.0) + 2.0);
  vec4 transformedNormal = uNMatrix * vec4(aVertexNormal, 1.0);
  float fDirectionalLightWeighting = max(dot(transformedNormal.xyz, uLightingDirection), 0.0);
  vLightWeighting = uAmbientColor + uDirectionalColor * fDirectionalLightWeighting;
  vColor = aVertexColor;
}



