
precision highp float;
precision highp int;

import 'constants.glsl'


uniform color BaseColor;
uniform sampler2D BaseColorTex;
uniform int BaseColorTexType;

uniform float BorderWidth;
uniform int highlightSubIndex;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying vec2 v_geomItemIds;
varying vec4 v_color;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

#if defined(DRAW_GEOMDATA)
  uniform int isOrthographic;
  import 'surfaceGeomData.glsl'
#elif defined(DRAW_HIGHLIGHT)
  import 'surfaceHighlight.glsl'
#endif // DRAW_HIGHLIGHT


void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

float dist = length(v_texCoord - 0.5);
if (dist > 0.5)
  discard;

#if defined(DRAW_COLOR)

  if (dist > 0.5 - (BorderWidth * 0.5))
    fragColor = vec4(0.,0.,0.,1.);
  else {
    // Modulate the lighting using the texture coord so the point looks round.
    float NdotV = cos(dist * PI);

    vec4 baseColor = BaseColor * v_color;
    ivec2 texSize = textureSize(BaseColorTex, 0);
    if (texSize.x == 1 && texSize.y > 1) {
      vec4 gradient = texture2D(BaseColorTex, vec2(0.5, dist * 2.0));
      baseColor *= gradient;
    }

    fragColor = baseColor;
  }

#elif defined(DRAW_GEOMDATA)
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, v_geomItemIds.x, v_geomItemIds.y, isOrthographic);
#elif defined(DRAW_HIGHLIGHT)
  if (highlightSubIndex != -1 && int(v_geomItemIds.y + 0.5) != highlightSubIndex) discard;
  fragColor = setFragColor_highlight(v_geomItemIds.x);
#endif // DRAW_HIGHLIGHT


  

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
