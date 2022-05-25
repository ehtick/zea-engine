/* eslint-disable guard-for-in */

import { RenderState } from '../RenderStates/index'
import { WebGL12RenderingContext } from '../types/webgl'
import { MathFunctions } from '../../Utilities/MathFunctions'

const convertBuffer = (
  gl: WebGL12RenderingContext,
  srcData:
    | Int8Array
    | Uint8Array
    | Uint8ClampedArray
    | Int16Array
    | Uint16Array
    | Int32Array
    | Uint32Array
    | Float32Array,
  attrDesc: any
): Uint8Array | Uint16Array | Int16Array | Float32Array => {
  // console.log('convertBuffer:', attrDesc.name, srcData)
  switch (attrDesc.dataType) {
    case gl.BYTE:
    case gl.UNSIGNED_BYTE: {
      if (srcData instanceof Uint8Array) return srcData
      const tgt = new Uint8Array(srcData.length)
      // https://www.khronos.org/opengl/wiki/Vertex_Specification#Component_type
      if (attrDesc.name == 'normals') {
        // We assume the input values are normalized
        // so we scale by 255. In the shader, normalized integers wil
        // be scaled back to 0..1 by dividing by 255
        // convert the values that are in the ra
        srcData.forEach((value, i) => (tgt[i] = MathFunctions.remap(value, -1, 1, 0, 255)))
      } else {
        srcData.forEach((value, i) => (tgt[i] = MathFunctions.remap(value, 0, 1, 0, 255)))
      }
      return tgt
    }
    case gl.UNSIGNED_SHORT: {
      if (srcData instanceof Uint16Array) return srcData
      const tgt = new Uint16Array(srcData.length)
      srcData.forEach((value, i) => (tgt[i] = value))
      return tgt
    }
    case gl.SHORT: {
      if (srcData instanceof Int16Array) return srcData
      const tgt = new Int16Array(srcData.length)
      srcData.forEach((value, i) => (tgt[i] = value))
      return tgt
    }
    case gl.HALF_FLOAT: {
      if (srcData instanceof Uint16Array) return srcData
      if (srcData instanceof Float32Array) {
        return MathFunctions.convertFloat32ArrayToUInt16Array(srcData)
      }
      const tgt = new Uint16Array(srcData.length)
      srcData.forEach((value, i) => (tgt[i] = value))
      return tgt
    }
    case gl.FLOAT: {
      if (srcData instanceof Float32Array) return srcData
      const tgt = new Float32Array(srcData.length)
      srcData.forEach((value, i) => (tgt[i] = value))
      return tgt
    }
    default:
      throw `Unhandled attribute type: ${attrDesc.dataType} for ${srcData.constructor.name}`
  }
}

/**
 * Returns a descriptor for the provided geom attribute.
 * @private
 * @param gl - The webgl context
 * @param attrDataType - The geometry attribute value.
 *
 * @return
 */
const genDataTypeDesc = (gl: WebGL12RenderingContext, name: string, attrData: any) => {
  let dimension
  let elementSize
  let dataType
  let normalized = attrData.normalized
  // console.log('genDataTypeDesc:', name, attrData.dataType)
  switch (name) {
    case 'positions':
    case 'positionsNext':
      dimension = 3
      elementSize = 2
      dataType = gl.HALF_FLOAT
      normalized = false
      break
    case 'normals':
      dimension = 3
      elementSize = 1
      dataType = gl.UNSIGNED_BYTE
      normalized = false
      break
    case 'texCoords':
      dimension = 2
      elementSize = 2
      dataType = gl.HALF_FLOAT
      normalized = false
      break
    case 'vertexColors':
      dimension = 4
      elementSize = 1
      dataType = gl.UNSIGNED_BYTE
      normalized = false
      break
    default:
      switch (attrData.dataType) {
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
        case 'Vec2':
          dimension = 2
          elementSize = 4
          dataType = gl.FLOAT
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
          throw 'Unhandled Type'
      }
  }

  return {
    name,
    dimension,
    elementSize,
    dataType,
    normalized,
  }
}
abstract class IGeomShaderBinding {
  abstract bind(renderstate: RenderState): void
  abstract unbind(): void
  abstract destroy(): void
}

/** Class representing a geom shader binding.
 * @private
 */
class GeomShaderBinding extends IGeomShaderBinding {
  protected gl: WebGL12RenderingContext
  protected shaderAttrs: Record<string, any>
  protected glattrbuffers: Record<string, any>
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
    shaderAttrs: Record<string, any>,
    geomAttrBuffers: Record<string, any>,
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

      const geomAttrDesc = genDataTypeDesc(this.gl, attrName, geomAttrBuffer)

      const stride = geomAttrDesc.dimension * geomAttrDesc.elementSize
      const offset =
        geomAttrBuffer.offset != undefined
          ? geomAttrBuffer.offset * geomAttrDesc.dimension * geomAttrDesc.elementSize
          : 0
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)
      gl.vertexAttribPointer(
        location,
        geomAttrDesc.dimension,
        geomAttrDesc.dataType,
        geomAttrDesc.normalized,
        stride,
        offset
      )

      if (gl.vertexAttribDivisor) {
        if (instanced == true) {
          gl.vertexAttribDivisor(location, 1) // This makes it instanced
        } else {
          gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
        }
      }

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.indexBuffer)

    return true
  }

  /**
   * The unbind method.
   */
  unbind(): void {
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
    shaderAttrs: Record<string, any>,
    geomAttrBuffers: Record<string, any>,
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
      if (!geomAttrBuffer) {
        if (attrName.endsWith('Next')) {
          geomAttrBuffer = geomAttrBuffers[attrName.substring(0, attrName.length - 4)]
          shaderAttrDesc.offset = 1
        }

        if (!geomAttrBuffer) {
          // console.warn("geomAttrBuffer missing:" + attrName + " location:" + location);
          gl.disableVertexAttribArray(location)
          continue
        }
      }

      const geomAttrDesc = genDataTypeDesc(gl, attrName, geomAttrBuffer)

      const stride = geomAttrDesc.dimension * geomAttrDesc.elementSize
      const offset =
        shaderAttrDesc.offset != undefined
          ? shaderAttrDesc.offset * geomAttrDesc.dimension * geomAttrDesc.elementSize
          : 0
      const normalized = geomAttrBuffer.normalized == true
      const instanced = shaderAttrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, geomAttrBuffer.buffer)
      gl.vertexAttribPointer(location, geomAttrDesc.dimension, geomAttrDesc.dataType, normalized, stride, offset)

      if (gl.vertexAttribDivisor) {
        if (instanced == true) {
          gl.vertexAttribDivisor(location, 1) // This makes it instanced
        } else {
          gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
        }
      }
      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + geomAttrBuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    // gl.bindVertexArray(null)

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
  unbind(): void {
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
  geomAttrBuffers: Record<string, any>,
  indexBuffer: WebGLBuffer | null
): IGeomShaderBinding {
  if (gl.createVertexArray == null) {
    return new GeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  } else {
    return new VAOGeomShaderBinding(gl, shaderAttrs, geomAttrBuffers, indexBuffer)
  }
}

export { generateShaderGeomBinding, genDataTypeDesc, IGeomShaderBinding, convertBuffer }
