
precision highp float;

uniform sampler2D image;
uniform vec4 color;
uniform int isTextured;

varying vec2 v_texCoord;

#ifdef ENABLE_ES3
  out vec4 fragColor;
#endif
void main(void) {
#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

  if (isTextured != 0)
    fragColor = texture2D(image, v_texCoord);
  else 
    fragColor = color;

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
