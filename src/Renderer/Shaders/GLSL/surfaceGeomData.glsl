  uniform int floatGeomBuffer;
  uniform int passId;
  uniform int occlusionCulling;

  import 'GLSLBits.glsl'
  
  vec4 setFragColor_geomData(vec3 v_viewPos, int floatGeomBuffer, int passId, float geomItemId, float elemItemId, int isOrthographic){
    vec4 fragColor;

    float viewDist;
    if (isOrthographic > 0) {
      viewDist = abs(v_viewPos.z);
    } else {
      viewDist = length(v_viewPos);
    }
    if (floatGeomBuffer != 0) {
      fragColor.r = float(passId); 
      fragColor.g = float(geomItemId);
      fragColor.b = elemItemId;
      fragColor.a = viewDist;
    }
    else {
      ///////////////////////////////////
      // UInt8 buffer
      fragColor.r = mod(geomItemId, 256.) / 255.;
      fragColor.g = (floor(geomItemId / 256.) + float(passId) * 32.) / 255.;

      // encode the dist as a 16 bit float
      vec2 float16bits = encode16BitFloatInto2xUInt8(viewDist);
      fragColor.b = float16bits.x;
      fragColor.a = float16bits.y;
    }

    if (occlusionCulling != 0) {
      // Calculate a simple stochastic transparency to reduce the cost of the reduction shader.
      // We only need one pixel to be visible to consider the geometry visible, so here we 
      // keep only one in 7x7 (49) pixels. This signficatly reduces the cost of reducing the scene
      // to the reduction data buffer.
      // Note: this is not a stochastic transparency, as we are simply setting black pixels to 
      // reduce the number of reduction points for this geometry. The black pixels (not discarded)
      // still occlude other geometries, but during reduction count to nothing.
      int x = int(gl_FragCoord.x * 1000.0);
      int y = int(gl_FragCoord.y * 1000.0);
      if (imod(x, 7) != 0 || imod(y, 7) != 0) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
      };
    }
    return fragColor;
  }

  // Note: the older code imported drawItemId.glsl and newer code is importing geomItemId.glsl
  // This code keeps compatibility with the older shaders.
  vec4 setFragColor_geomData(vec3 v_viewPos, int floatGeomBuffer, int passId, float geomItemId, int isOrthographic){
    return setFragColor_geomData(v_viewPos, floatGeomBuffer, passId, geomItemId, -1.0, isOrthographic);
  }