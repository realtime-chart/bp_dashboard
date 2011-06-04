#ifdef GL_ES
precision highp float;
#endif

varying vec3 vLightWeighting;
varying vec4 vColor;

void main(void){
	gl_FragColor = vColor * vec4(vLightWeighting,1.0) * vec4(1.0, 1.0, 1.0, 1.0);
}
