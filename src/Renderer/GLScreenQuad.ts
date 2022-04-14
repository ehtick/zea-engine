import { Vec2, Color } from '../Math/index'
import { ScreenQuadShader } from './Shaders/ScreenQuadShader'
import { generateShaderGeomBinding } from './Drawing/GeomShaderBinding'
import { GLTexture2D } from './GLTexture2D'
import { RenderState } from './RenderStates'
import { WebGL12RenderingContext } from './types/webgl'

/** Class representing a GL screen quad.
 * @private
 */
class GLScreenQuad {
  protected __gl: WebGL12RenderingContext
  protected __pos: number[]
  protected __size: number[]
  protected flipY: boolean
  protected __glshader: ScreenQuadShader
  protected __quadBinding: any // GeomShaderBinding | VAOGeomShaderBinding
  protected ready: boolean
  /**
   * Create a GL screen quad.
   * @param gl - The webgl rendering context.
   * @param shaderopts - shader options
   */
  constructor(gl: WebGL12RenderingContext, shaderopts: Record<string, any>) {
    this.__gl = gl
    this.__pos = [0.0, 0.0]
    this.__size = [1.0, 1.0]
    this.flipY = true
    this.__glshader = new ScreenQuadShader(gl)

    if (!gl.__quadVertexIdsBuffer) gl.setupInstancedQuad()

    const shaderComp = this.__glshader.compileForTarget('GLScreenQuad', shaderopts)
    this.__quadBinding = generateShaderGeomBinding(
      this.__gl,
      shaderComp.attrs,
      gl.__quadattrbuffers,
      gl.__quadIndexBuffer
    )

    this.ready = true
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param textureOrColor - The texture or color value.
   * @param pos - The pos value.
   * @param size - The size value.
   */
  bind(renderstate: RenderState, textureOrColor?: GLTexture2D | Color, pos?: Vec2, size?: Vec2): void {
    const unifs = renderstate.unifs
    const gl = this.__gl
    if (textureOrColor && textureOrColor instanceof GLTexture2D) {
      gl.uniform1i(unifs.isTextured.location, 1)
      textureOrColor.bindToUniform(renderstate, renderstate.unifs.image)
    } else if (textureOrColor && textureOrColor instanceof Color) {
      gl.uniform1i(unifs.isTextured.location, 0)
      gl.uniform4fv(unifs.color.location, textureOrColor.asArray())
    }

    {
      const unif = unifs.pos
      if (unif) {
        let list = pos ? (pos instanceof Vec2 ? pos.asArray() : pos) : this.__pos
        gl.uniform2fv(unif.location, <Float32List>list)
      }
    }
    {
      const unif = unifs.size
      if (unif) {
        let list = size ? (size instanceof Vec2 ? size.asArray() : size) : this.__size
        gl.uniform2fv(unif.location, <Float32List>list)
      }
    }

    this.__quadBinding.bind(renderstate)
  }

  /**
   * The bindShader method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bindShader(renderstate: RenderState): boolean {
    return this.__glshader.bind(renderstate, 'GLScreenQuad')
  }

  /**
   * The draw method.
   * @param renderstate - The object tracking the current state of the renderer
   * @param textureOrColor - The texture or color value.
   * @param pos - The pos value.
   * @param size - The size value.
   */
  draw(renderstate: RenderState, textureOrColor?: GLTexture2D | Color, pos?: Vec2, size?: Vec2) {
    this.bind(renderstate, textureOrColor, pos, size)
    const gl = this.__gl
    gl.drawElements(gl.TRIANGLES, 6, gl.UNSIGNED_SHORT, 0)
  }
}

export { GLScreenQuad }
