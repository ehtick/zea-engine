
precision highp float;
precision highp int;

import 'constants.glsl'
import 'drawItemTexture.glsl'


uniform color BaseColor;
uniform float Rounded;
uniform float BorderWidth;

/* VS Outputs */
varying vec2 v_texCoord;
varying vec3 v_viewPos;
varying float v_geomItemId;

#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

#if defined(DRAW_GEOMDATA)
  uniform int isOrthographic;
  import 'surfaceGeomData.glsl'
#endif // DRAW_GEOMDATA


void main(void) {

#ifndef ENABLE_ES3
  vec4 fragColor;
#endif

int geomItemId = int(v_geomItemId + 0.5);

float dist = length(v_texCoord - 0.5);
if (dist > 0.5)
  discard;

#if defined(DRAW_COLOR)

  vec4 highlightColor = getHighlightColor(geomItemId);
  if (dist > 0.5 - (BorderWidth * 0.5)) {
    if(highlightColor.r > 0.001 || highlightColor.g > 0.001 || highlightColor.b > 0.001 || highlightColor.a > 0.001) {
      fragColor.rgb = highlightColor.rgb;
      fragColor.a = 1.0;
    } else {
      fragColor = vec4(0.,0.,0.,1.);
    }
  }
  else {
    // Modulate the lighting using the texture coord so the point looks round.
    float NdotV = cos(dist * PI);

    fragColor = BaseColor * mix(1.0, NdotV, Rounded);

    if(highlightColor.r > 0.001 || highlightColor.g > 0.001 || highlightColor.b > 0.001) {
      fragColor.rgb = mix(fragColor.rgb, highlightColor.rgb, highlightColor.a);
    } 
  }

#elif defined(DRAW_GEOMDATA)
  fragColor = setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, v_geomItemId, 0.0, isOrthographic);
#endif // DRAW_GEOMDATA


  

#ifndef ENABLE_ES3
  gl_FragColor = fragColor;
#endif
}
