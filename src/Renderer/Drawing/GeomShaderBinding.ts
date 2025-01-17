/* eslint-disable guard-for-in */

import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { MathFunctions } from '../../Utilities/MathFunctions'
import { GLAttrBuffer, GLAttrDesc, ShaderAttribute } from '../types/renderer'

/**
 * Returns a descriptor for the provided geom attribute.
 * Used to generate WebGLBuffers from the data provided by the geometry.
 * @private
 * @param gl - The webgl context
 * @param attrDataType - The geometry attribute value.
 *
 * @return
 */
const genDataTypeDesc = (gl: WebGL12RenderingContext, name: string): GLAttrDesc => {
  let dimension
  let elementSize
  let dataType
  switch (name) {
    case 'UInt8':
      dimension = 1
      elementSize = 4
      dataType = gl.UNSIGNED_BYTE
      break
    case 'SInt8':
      dimension = 1
      elementSize = 1
      dataType = gl.BYTE
      break
    case 'UInt16':
      dimension = 1
      elementSize = 2
      dataType = gl.UNSIGNED_SHORT
      break
    case 'SInt16':
      dimension = 1
      elementSize = 2
      dataType = gl.SHORT
      break
    case 'UInt32':
      dimension = 1
      elementSize = 4
      dataType = gl.UNSIGNED_INT
      break
    case 'SInt32':
      dimension = 1
      elementSize = 4
      dataType = gl.INT
      break
    case 'Float32':
      dimension = 1
      elementSize = 4
      dataType = gl.FLOAT
      break
    case 'Vec2f8':
      dimension = 2
      elementSize = 1
      dataType = gl.BYTE
      break
    case 'Vec2f16':
      dimension = 2
      elementSize = 2
      dataType = gl.HALF_FLOAT
      break
    case 'Vec2':
      dimension = 2
      elementSize = 4
      dataType = gl.FLOAT
      break
    case 'Vec3f8':
      dimension = 3
      elementSize = 1
      dataType = gl.BYTE
      break
    case 'Vec3f16':
      dimension = 3
      elementSize = 2
      dataType = gl.HALF_FLOAT
      break
    case 'Vec3':
      dimension = 3
      elementSize = 4
      dataType = gl.FLOAT
      break
    case 'Vec4':
    case 'Color':
      dimension = 4
      elementSize = 4
      dataType = gl.FLOAT
      break
    case 'RGBA':
      dimension = 4
      elementSize = 1
      dataType = gl.UNSIGNED_BYTE
      break
    default:
      throw 'Unhandled Type:' + name
  }
  return {
    name,
    dimension,
    elementSize,
    dataType,
  }
}
abstract class IGeomShaderBinding {
  abstract bind(renderstate: RenderState): void
  abstract unbind(renderstate: RenderState): void
  abstract destroy(): void
}

/** Class representing a geom shader binding.
 * @private
 */
class GeomShaderBinding extends IGeomShaderBinding {
  protected gl: WebGL12RenderingContext
  protected shaderAttrs: Record<string, ShaderAttribute>
  protected glattrbuffers: Record<string, GLAttrBuffer>
  protected indexBuffer: WebGLBuffer | null
  /**
   * Create a geom shader binding.
   * @param gl - The webgl rendering context.
   * @param shaderAttrs - The shader attributes.
   * @param geomAttrBuffers - The geomAttrBuffers value.
   * @param indexBuffer - The index buffer.
   */
  constructor(
    gl: WebGL12RenderingContext,
    shaderAttrs: Record<string, ShaderAttribute>,
    geomAttrBuffers: Record<string, GLAttrBuffer>,
    indexBuffer: WebGLBuffer | null
  ) {
    super()
    this.gl = gl
    this.shaderAttrs = shaderAttrs
    this.glattrbuffers = geomAttrBuffers
    this.indexBuffer = indexBuffer
  }

  /**
   * The bind method.
   * @param renderstate - The render state.
   * @return - The return value.
   */
  bind(renderstate?: RenderState): boolean {
    const gl = this.gl

    for (const attrName in this.shaderAttrs) {
      if (attrName == 'instancedIds') continue
      const shaderAttrDesc = this.shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) continue
      const geomAttrBuffer = this.glattrbuffers[attrName]
      if (!geomAttrBuffer) {
        gl.disableVertexAttribArray(location)
        continue
      }

      const dimension = geomAttrBuffer.dimension
      const dataType = geomAttrBuffer.dataType
      const normalized = geomAttrBuffer.normalized
      const isInteger = shaderAttrDesc.integer

      const stride = dimension * geomAttrBuffer.elementSize
      const offset =
        geomAttrBuffer.offset != undefined ? geomAttrBuffer.offset * dimension * geomAttrBuffer.elementSize : 0
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)

      if (isInteger) {
        gl.vertexAttribIPointer(location, dimension, dataType, stride, offset)
      } else {
        gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset)
      }

      if (instanced == true) {
        gl.vertexAttribDivisor(location, 1) // This makes it instanced
      } else {
        gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
      }

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    if (this.indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

    return true
  }

  /**
   * The unbind method.
   */
  unbind(renderstate: RenderState): void {
    const gl = this.gl
    for (const attrName in this.shaderAttrs) {
      const shaderAttrDesc = this.shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) {
        gl.enableVertexAttribArray(location)
      }
      if (shaderAttrDesc.instanced) {
        gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
      }
      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy() {}
}

/** Class representing vertex array objects (VAO) geom shader binding.
 * @private
 */
class VAOGeomShaderBinding extends IGeomShaderBinding {
  protected vao: WebGLVertexArrayObject | null
  protected gl: WebGL12RenderingContext
  protected indexBuffer: WebGLBuffer | null
  /**
   * Create VAO geom shader binding.
   * @param gl - The webgl rendering context.
   * @param shaderAttrs - The shaderAttrs value.
   * @param geomAttrBuffers - The geomAttrBuffers value.
   * @param indexBuffer - The indexBuffer value.
   */
  constructor(
    gl: WebGL12RenderingContext,
    shaderAttrs: Record<string, ShaderAttribute>,
    geomAttrBuffers: Record<string, GLAttrBuffer>,
    indexBuffer: WebGLBuffer | null
  ) {
    super()
    this.gl = gl
    this.vao = gl.createVertexArray()
    gl.bindVertexArray(this.vao)

    for (const attrName in shaderAttrs) {
      if (attrName == 'instancedIds') continue

      const shaderAttrDesc = shaderAttrs[attrName]
      const location = shaderAttrDesc.location
      if (location == -1) continue
      let geomAttrBuffer = geomAttrBuffers[attrName]
      let offset = 0
      if (!geomAttrBuffer) {
        if (attrName.endsWith('Next')) {
          geomAttrBuffer = geomAttrBuffers[attrName.substring(0, attrName.length - 4)]
          offset = 1 * geomAttrBuffer.dimension * geomAttrBuffer.elementSize
        }

        if (!geomAttrBuffer) {
          // console.warn("geomAttrBuffer missing:" + attrName + " location:" + location);
          gl.disableVertexAttribArray(location)
          continue
        }
      }

      const dimension = geomAttrBuffer.dimension
      const dataType = geomAttrBuffer.dataType
      const stride = geomAttrBuffer.dimension * geomAttrBuffer.elementSize
      const isInteger = shaderAttrDesc.integer
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)

      if (isInteger) {
        gl.vertexAttribIPointer(location, dimension, dataType, stride, offset)
      } else {
        const normalized = geomAttrBuffer.normalized == true
        gl.vertexAttribPointer(location, dimension, dataType, normalized, stride, offset)
      }
      if (gl.vertexAttribDivisor) {
        if (instanced == true) {
          gl.vertexAttribDivisor(location, 1) // This makes it instanced
        } else {
          gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
        }
      }
      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    this.indexBuffer = indexBuffer
    if (this.indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
  }

  /**
   * The bind method.
   * @param renderstate - The render state.
   * @return - The return value.
   */
  bind(renderstate?: RenderState): boolean {
    const gl = this.gl
    gl.bindVertexArray(this.vao)
    if (this.indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)
    return true
  }

  /**
   * The unbind method.
   */
  unbind(renderstate: RenderState): void {
    const gl = this.gl
    gl.bindVertexArray(null)
    if (this.indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy is called by the system to cause explicit resources cleanup.
   * Users should never need to call this method directly.
   */
  destroy(): void {
    const gl = this.gl
    // Ensure we detach the index buffer before deleting the VAO.
    if (this.indexBuffer) {
      gl.bindVertexArray(this.vao)
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
    }
    gl.deleteVertexArray(this.vao)
  }
}

function generateShaderGeomBinding(
  gl: WebGL12RenderingContext,
  shaderAttrs: Record<string, any>,
  geomAttrBuffers: Record<string, GLAttrBuffer>,
  indexBuffer: WebGLBuffer | null
): IGeomShaderBinding {
  if (gl.createVertexArray == null) {
    return new GeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  } else {
    return new VAOGeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  }
}

export { generateShaderGeomBinding, genDataTypeDesc, IGeomShaderBinding }
