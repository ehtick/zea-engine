import { AttrValue } from '../Math/index'
import { ScreenQuadShader } from './Shaders/ScreenQuadShader.js'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding.js'
import { GLTexture2D } from './GLTexture2D'

/** Class representing a GL screen quad.
 * @private
 */
class GLScreenQuad {
  /**
   * Create a GL screen quad.
   * @param {WebGLRenderingContext} gl - The webgl rendering context.
   */
  constructor(gl) {
    this.__gl = gl

    this.__pos = [0.0, 0.0]
    this.__size = [1.0, 1.0]
    this.flipY = true
    this.__glshader = new ScreenQuadShader(gl)

    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    const shaderComp = this.__glshader.compileForTarget('GLScreenQuad')
    this.__quadBinding = generateShaderGeomBinding(gl, shaderComp.attrs, gl.__quadattrbuffers, gl.__quadIndexBuffer)

    this.ready = true
  }

  /**
   * The bind method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {GLTexture2D} texture - The texture param.
   * @param {Vec2} pos - The pos value.
   * @param {Vec2} size - The size value.
   */
  bind(renderstate, texture, pos = undefined, size = undefined) {
    const unifs = renderstate.unifs
    if (texture) {
      texture.bindToUniform(renderstate, renderstate.unifs.image)
    }

    const gl = this.__gl
    {
      const unif = unifs.pos
      if (unif) {
        gl.uniform2fv(unif.location, pos ? (pos instanceof AttrValue ? pos.asArray() : pos) : this.__pos)
      }
    }
    {
      const unif = unifs.size
      if (unif) {
        gl.uniform2fv(unif.location, size ? (size instanceof AttrValue ? size.asArray() : size) : this.__size)
      }
    }
    // if ('flipY' in unifs)
    //     gl.uniform1i(unifs.flipY.location, this.flipY ? 1 : 0);

    // if ('textureDim' in unifs)
    //     gl.uniform2fv(unifs.textureDim.location, [texture.width, texture.height]);

    this.__quadBinding.bind(renderstate)
  }

  /**
   * The bindShader method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @return {any} - The return value.
   */
  bindShader(renderstate) {
    return this.__glshader.bind(renderstate, 'GLScreenQuad')
  }

  /**
   * The draw method.
   * @param {object} renderstate - The object tracking the current state of the renderer
   * @param {GLTexture2D} texture - The texture value.
   * @param {Vec2} pos - The pos value.
   * @param {Vec2} size - The size value.
   */
  draw(renderstate, texture, pos = undefined, size = undefined) {
    this.bind(renderstate, texture, pos, size)

    this.__gl.drawQuad()
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

export { GLScreenQuad }
