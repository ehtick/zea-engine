import { GLTexture2D } from '../GLTexture2D'
import { GLHDRImage } from '../GLHDRImage'
import { Color, Vec2, Vec3, Vec4, Mat4 } from '../../Math'
import {
  Parameter,
  MaterialFloatParam,
  BaseImage,
  HDRImage,
  MaterialColorParam,
  Mat4Parameter,
  ColorParameter,
  NumberParameter,
  BooleanParameter,
  ColorSpace,
} from '../../SceneTree'
import { GLMaterial } from '.'
import { BaseClass } from '../../Utilities/BaseClass'
import { ShaderUniform, ShaderUniforms } from '../types/renderer'
import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'

class ParamUniformBinding extends BaseClass {
  protected unif: ShaderUniform
  protected dirty: boolean = false
  // bind: (renderstate?: RenderState) => void
  // unbind: (renderstate?: RenderState) => void
  // destroy: () => void
  constructor(unif: ShaderUniform) {
    super()
    this.unif = unif
  }

  /**
   * The unbind method.
   */
  bind(renderstate?: RenderState): void {}

  /**
   * The unbind method.
   */
  unbind(renderstate?: RenderState): void {}

  /**
   * The destroy method.
   */
  destroy(): void {}
}

/** Class representing simple uniform binding.
 * @private
 */
class SimpleUniformBinding extends ParamUniformBinding {
  param: NumberParameter | BooleanParameter
  protected textureUnif: ShaderUniform
  protected textureTypeUnif: ShaderUniform
  protected texBinding: Record<string, ShaderUniform>
  protected gltexture: GLTexture2D | null = null
  protected textureType: number = -1
  protected val: number

  protected uniform1i: (unif: WebGLUniformLocation, value: number) => void
  protected uniformXX: (unif: WebGLUniformLocation, value: number) => void
  protected update: () => void

  /**
   * Create simple uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   * @param unifs - The dictionary of WebGL uniforms.
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: any,
    param: NumberParameter | BooleanParameter,
    unif: ShaderUniform,
    unifs: ShaderUniforms
  ) {
    super(unif)
    const name = param.getName()
    this.param = param
    this.unif = unif
    this.textureUnif = unifs[name + 'Tex']
    this.textureTypeUnif = unifs[name + 'TexType']
    this.uniform1i = gl.uniform1i.bind(gl)

    switch (this.unif.glslType) {
      case 'bool':
        // gl.uniform1ui(unif.location, value);// WebGL 2
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'uint':
        if (gl.name == 'webgl2') this.uniformXX = gl.uniform1ui.bind(gl)
        else this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'int':
        this.uniformXX = gl.uniform1i.bind(gl)
        break
      case 'float':
        this.uniformXX = gl.uniform1f.bind(gl)
        break
    }

    this.bind = this.bindValue

    const genGLTex = (image: BaseImage) => {
      let gltexture = GLTexture2D.getCachedGLTexture2D(image)
      const textureType = 1
      if (!gltexture) {
        if (image.type === 'HDR') {
          gltexture = new GLHDRImage(gl, <HDRImage>image)
        } else {
          gltexture = new GLTexture2D(gl, image)
        }
        GLTexture2D.setCachedGLTexture2D(image, gltexture)
      }
      this.texBinding = gltexture.preBind(this.textureUnif, unifs)
      gltexture.on('updated', () => {
        glMaterial.emit('updated')
      })
      this.gltexture = gltexture
      this.gltexture.addRef(this)
      this.textureType = textureType
      this.bind = this.bindTexture
      glMaterial.emit('updated')
    }

    let boundImage: BaseImage
    let imageLoadedId: number

    this.update = (): void => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else {
          if (typeof param.value == 'boolean') {
            this.val = param.value ? 1 : 0
          } else this.val = param.value
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (this.textureUnif && param instanceof MaterialFloatParam) {
      const connectImage = (image: BaseImage) => {
        if (!image.isLoaded()) {
          imageLoadedId = image.on('loaded', () => {
            genGLTex(boundImage)
          })
        } else {
          genGLTex(image)
        }
        boundImage = image
      }

      const disconnectImage = () => {
        const gltexture = GLTexture2D.getCachedGLTexture2D(boundImage)
        gltexture.removeRef(this)
        this.texBinding = null
        this.gltexture = null
        this.textureType = -1
        this.bind = this.bindValue

        if (imageLoadedId) {
          boundImage.off('loaded', imageLoadedId)
        }
        boundImage = null
        imageLoadedId = null
        glMaterial.emit('updated')
      }

      if (param.getImage()) connectImage(param.getImage())
      param.on('textureConnected', () => {
        connectImage(param.getImage())
      })
      param.on('textureDisconnected', () => {
        disconnectImage()
      })
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bindValue method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindValue(renderstate: RenderState): void {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    if (this.unif) this.uniformXX(this.unif.location, this.val)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindTexture(renderstate: RenderState): void {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture!.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }
}

/** Class representing complex uniform binding.
 * @private
 */
class ComplexUniformBinding extends ParamUniformBinding {
  protected param: Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>
  protected values: Float32Array
  protected uniformXX: (unif: WebGLUniformLocation, value: Float32Array | number[]) => void
  /**
   * Create complex uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: any,
    param: Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>,
    unif: ShaderUniform
  ) {
    super(unif)
    this.param = param

    switch (this.unif.glslType) {
      case 'vec2':
        this.uniformXX = gl.uniform2fv.bind(gl)
        break
      case 'vec3':
        this.uniformXX = gl.uniform3fv.bind(gl)
        break
      case 'vec4':
        this.uniformXX = gl.uniform4fv.bind(gl)
        break
    }
    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState): void {
    if (this.dirty) {
      this.values = <Float32Array>this.param.value.asArray()
      this.dirty = false
    }
    this.uniformXX(this.unif.location, this.values)
  }

  /**
   * The unbind method.
   */
  unbind(): void {}

  /**
   * The destroy method.
   */
  destroy(): void {}
}

/** Class representing material uniform binding.
 * @private
 */
class MatrixUniformBinding extends ParamUniformBinding {
  protected param: Mat4Parameter
  protected uniformMatrixXXX: (unif: WebGLUniformLocation, transpose: boolean, value: Float32Array) => void
  protected values: Float32Array = new Float32Array(0)
  /**
   * Create material uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, param: any, unif: ShaderUniform) {
    super(unif)
    this.param = param

    switch (this.unif.glslType) {
      case 'mat3':
        this.uniformMatrixXXX = gl.uniformMatrix3fv.bind(gl)
        break
      case 'mat4':
        this.uniformMatrixXXX = gl.uniformMatrix4fv.bind(gl)
        break
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
      glMaterial.emit('updated')
    })
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bind(renderstate: RenderState): void {
    if (this.dirty) {
      this.values = (<Mat4>this.param.value).asArray()
      this.dirty = false
    }
    this.uniformMatrixXXX(this.unif.location, false, this.values)
  }

  /**
   * The unbind method.
   */
  unbind(): void {}

  /**
   * The destroy method.
   */
  destroy(): void {}
}

/** Class representing color uniform binding.
 * @private
 */
class ColorUniformBinding extends ParamUniformBinding {
  protected param: MaterialColorParam | ColorParameter
  protected unif: ShaderUniform
  protected textureUnif: ShaderUniform
  protected textureTypeUnif: ShaderUniform
  protected values: Float32Array
  protected gltexture: GLTexture2D
  protected textureType: number
  protected texBinding: Record<string, ShaderUniform>

  protected uniform1i: (unif: WebGLUniformLocation, value: number) => void
  protected uniform4fv: (unif: WebGLUniformLocation, value: Float32Array) => void
  protected update: () => void

  /**
   * Create color uniform binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param param - The param value.
   * @param unif - The WebGL uniform
   * @param unifs - The dictionary of WebGL uniforms.
   */
  constructor(
    gl: WebGL12RenderingContext,
    glMaterial: GLMaterial,
    param: MaterialColorParam | ColorParameter,
    unif: ShaderUniform,
    unifs: ShaderUniforms
  ) {
    super(unif)
    const name = param.getName()
    this.param = param
    this.textureUnif = unifs[name + 'Tex']
    this.textureTypeUnif = unifs[name + 'TexType']

    this.values = Float32Array.from([0, 0, 0, 0])
    this.bind = this.bindValue

    let boundImage: BaseImage
    let imageLoadedId: number

    this.update = () => {
      try {
        // Sometimes the value of a color param is an image.
        if (boundImage) {
        } else if (this.unif) {
          if (param instanceof MaterialColorParam && param.colorSpace == ColorSpace.Gamma) {
            this.values = param.value.toLinear().asArray()
          } else {
            this.values = param.value.asArray()
          }
        }
      } catch (e) {}
      glMaterial.emit('updated')
    }

    /**
     * The update method.
     */
    if (this.textureUnif && param instanceof MaterialColorParam) {
      const genGLTex = (image: BaseImage) => {
        boundImage = image
        let gltexture = GLTexture2D.getCachedGLTexture2D(image)
        const textureType = 1
        if (!gltexture) {
          if (image.type === 'FLOAT') {
            gltexture = new GLHDRImage(gl, <HDRImage>image)
          } else {
            gltexture = new GLTexture2D(gl, image)
          }
          GLTexture2D.setCachedGLTexture2D(image, gltexture)
        }
        this.texBinding = gltexture.preBind(this.textureUnif, unifs)
        gltexture.on('updated', () => {
          glMaterial.emit('updated')
        })
        this.gltexture = gltexture
        this.gltexture.addRef(this)
        this.textureType = textureType
        this.bind = this.bindTexture
        glMaterial.emit('updated')
      }

      const connectImage = (image: BaseImage) => {
        if (!image.isLoaded()) {
          imageLoadedId = image.once('loaded', () => {
            genGLTex(image)
          })
        } else {
          genGLTex(image)
        }
      }

      const disconnectImage = () => {
        this.gltexture.removeRef(this)
        this.gltexture = null
        this.texBinding = null
        this.textureType = null

        if (imageLoadedId) {
          boundImage.off('loaded', imageLoadedId)
        }

        this.bind = this.bindValue
        boundImage = null
        imageLoadedId = null
        glMaterial.emit('updated')
      }
      if (param.getImage()) connectImage(param.getImage())
      param.on('textureConnected', () => {
        connectImage(param.getImage())
      })
      param.on('textureDisconnected', () => {
        disconnectImage()
      })
    }

    this.dirty = true
    param.on('valueChanged', () => {
      this.dirty = true
    })

    this.uniform1i = gl.uniform1i.bind(gl)
    this.uniform4fv = gl.uniform4fv.bind(gl)
  }

  /**
   * The bindValue method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindValue(renderstate?: RenderState): void {
    if (!this.unif) return // Note: Normals parms have no unif and can only be bound to a texture.
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    if (this.unif) this.uniform4fv(this.unif.location, this.values)
    if (this.textureTypeUnif) this.uniform1i(this.textureTypeUnif.location, 0)
  }

  /**
   * The bindTexture method.
   * @param renderstate - The object tracking the current state of the renderer
   */
  bindTexture(renderstate: RenderState): void {
    if (this.dirty) {
      this.update()
      this.dirty = false
    }
    this.gltexture.bindToUniform(renderstate, this.textureUnif, this.texBinding)
  }
}

const logged: { [key: string]: { [key: string]: boolean } } = {}

/** Class representing material shader binding.
 * @private
 */
class MaterialShaderBinding {
  protected uniformBindings: ParamUniformBinding[] = []
  /**
   * Create material shader binding.
   * @param gl - The webgl rendering context.
   * @param glMaterial - The glMaterial value.
   * @param unifs - The dictionary of WebGL uniforms.
   * @param warnMissingUnifs - The warnMissingUnifs value.
   */
  constructor(gl: WebGL12RenderingContext, glMaterial: any, unifs: ShaderUniforms, warnMissingUnifs: any) {
    const bindParam = (param: Parameter<any>) => {
      const name = param.getName()
      const unif = unifs[name]
      if (unif == undefined) {
        const textureUnif = unifs[name + 'Tex']
        if (textureUnif) {
          this.uniformBindings.push(
            new ColorUniformBinding(gl, glMaterial, <MaterialColorParam | ColorParameter>param, unif, unifs)
          )
          return
        }

        // Note: we now bind the Material even for rendering geom datas,
        // which can mean many params have no uniform in the shader, which is fine.
        if (warnMissingUnifs) {
          // Note: this silent error caused me a lot of searching. make it noisy.
          const shaderName = glMaterial.getMaterial().getShaderName()
          if (!logged[shaderName]) {
            logged[shaderName] = {}
          }
          if (!logged[shaderName][name]) {
            // TODO: Many of these warnings are because when we change shaders
            // we do not remove obsolete params, but we probably should.
            console.warn(
              'Material:' + glMaterial.getMaterial().getName(),
              'with Shader ',
              shaderName,
              'Param has no unif',
              name
            )
            logged[shaderName][name] = true
          }
        }
        return
      }
      switch (unif.glslType) {
        case 'bool':
        case 'uint':
        case 'int':
        case 'float':
          this.uniformBindings.push(
            new SimpleUniformBinding(gl, glMaterial, <NumberParameter | BooleanParameter>param, unif, unifs)
          )
          break
        case 'vec2':
        case 'vec3':
        case 'vec4':
          this.uniformBindings.push(
            new ComplexUniformBinding(
              gl,
              glMaterial,
              <Parameter<Vec2> | Parameter<Vec3> | Parameter<Vec4> | Parameter<Color>>param,
              unif
            )
          )
          break
        case 'color':
          this.uniformBindings.push(
            new ColorUniformBinding(gl, glMaterial, <MaterialColorParam | ColorParameter>param, unif, unifs)
          )
          break
        case 'mat4':
          this.uniformBindings.push(new MatrixUniformBinding(gl, glMaterial, <Mat4Parameter>param, unif))
          break
        default:
          console.warn('Param :' + name + ' has unhandled data type:' + unif.glslType)
          return
      }
      return
    }
    const params = glMaterial.getMaterial().getParameters()
    for (const param of params) {
      bindParam(param)
    }
  }

  /**
   * The bind method.
   * @param renderstate - The object tracking the current state of the renderer
   * @return - The return value.
   */
  bind(renderstate: RenderState): boolean {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.bind(renderstate)
    }
    return true
  }

  /**
   * The unbind method.
   */
  unbind(renderstate: RenderState): void {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.unbind(renderstate)
    }
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    for (const uniformBinding of this.uniformBindings) {
      uniformBinding.destroy()
    }
  }
}

export { MaterialShaderBinding }
