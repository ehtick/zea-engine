import 'GLSLUtils.glsl'
import 'drawItemTexture.glsl'


vec4 setFragColor_highlight(float v_geomItemId){
  vec4 fragColor; 
  int geomItemId = int(v_geomItemId + 0.5);
  fragColor = getHighlightColor(geomItemId);
  return fragColor;
}
