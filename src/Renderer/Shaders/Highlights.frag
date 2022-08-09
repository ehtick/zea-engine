
precision highp float;

uniform float outlineThickness;
uniform sampler2D highlightDataTexture;

varying vec2 v_texCoord;

float M_PI = 3.141592653589793;
float diff(vec4 pixelA, vec4 pixelB)
{
  return abs(pixelA.r - pixelB.r) + abs(pixelA.g - pixelB.g) + abs(pixelA.b - pixelB.b) + abs(pixelA.a - pixelB.a);
}

// find the first pixel which is not the same as the center pixel.
vec4 RadialSearch(vec2 uv)
{
  vec2 texSize = vec2(textureSize(highlightDataTexture, 0));
  ivec2 pixelCenterCoord = ivec2(uv * texSize);
  vec4 pixelCenter = texelFetch(highlightDataTexture, pixelCenterCoord, 0);

  vec3 offset = vec3((1.0 / texSize.x), (1.0 / texSize.y), 0.0);

  vec4 result = pixelCenter;
  float weights = 1.0;
  float radius = 0.0;
  int differentPixels = 0;
  while (radius <= outlineThickness + 0.001) {
    radius += 1.0;
    
    int samples = int(2.0 * M_PI * radius);
    for (int i =0; i<samples; i++) {
      float theta = (float(i) / float(samples)) * 2.0 * M_PI;
      vec2 dir = vec2(radius * cos(theta) * offset.x, radius * sin(theta) * offset.y);
      
      ivec2 pixelCoord = ivec2((uv + dir) * texSize);
      vec4 pixel = texelFetch(highlightDataTexture, pixelCoord, 0);
      if ((pixel.r > 0.0 || pixel.g > 0.0 || pixel.b > 0.0)) {
        if (diff(pixel, pixelCenter) > 0.1) differentPixels++;
        // Blend the outer ring of pixels.
        // Note: disabled because I ran out of time. We can blend off the highlight towards
        // the edges to get a nicely anti-aliazed outline. 
        // float dist = length(vec2(pixelCoord) - vec2(pixelCenterCoord));
        // float blendStart = max(1.0, outlineThickness - 0.5);
        pixel.a = 1.0; //smoothstep(1.0, 0.0, dist - blendStart);

        result += pixel;
        weights += pixel.a;
      }
    }
  }

  // Note: at the boundary between 2 highlighted objects, we get a nice blending effect. 
  if (weights > 1.0) {
    result = result / weights;
  }

  // If all the pixels found are the same as the center pixel, we just
  // return the center pixel.
  if (differentPixels == 0) {
    return pixelCenter;
  }

  return result;
}


#ifdef ENABLE_ES3
out vec4 fragColor;
#endif

void main(void) {
    
  vec4 outlineColor = RadialSearch(v_texCoord);
  
  if (outlineColor.a > 0.0001) {
#ifndef ENABLE_ES3
    gl_FragColor = outlineColor;
#else
    fragColor = outlineColor;
#endif
  }
  else {
    discard;
  }
}

