
import { Float32, UInt32, SInt32, Color, Vec3, Vec4, RGBA } from '../Math'

/** Class representing a geom shader binding. */
class GeomShaderBinding {
  /**
   * Create a  geom shader binding.
   * @param {any} gl - The gl value.
   * @param {any} shaderAttrs - The shaderAttrs value.
   * @param {any} glattrbuffers - The glattrbuffers value.
   * @param {any} indexBuffer - The indexBuffer value.
   */
  constructor(gl, shaderAttrs, glattrbuffers, indexBuffer) {
    this.__gl = gl
    this.__shaderAttrs = shaderAttrs
    this.__glattrbuffers = glattrbuffers
    this.__indexBuffer = indexBuffer
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate param.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    const gl = this.__gl

    for (const attrName in this.__shaderAttrs) {
      if (attrName == 'instancedIds') continue
      const attrDesc = this.__shaderAttrs[attrName]
      const location = attrDesc.location
      if (location == -1) continue
      const glattrbuffer = this.__glattrbuffers[attrName]
      if (!glattrbuffer) {
        gl.disableVertexAttribArray(location)
        continue
      }

      let dimension
      let elementSize
      let dataType
      switch (glattrbuffer.dataType) {
        case UInt8:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_BYTE
          break
        case SInt8:
          dimension = 1
          elementSize = 4
          dataType = gl.BYTE
          break
        case UInt16:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_SHORT
          break
        case SInt16:
          dimension = 1
          elementSize = 4
          dataType = gl.SHORT
          break
        case UInt32:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_INT
          break
        case SInt32:
          dimension = 1
          elementSize = 4
          dataType = gl.INT
          break
        case Float32:
          dimension = 1
          elementSize = 4
          dataType = gl.FLOAT
          break
        case Vec3:
          dimension = 3
          elementSize = 4
          dataType = gl.FLOAT
          break
        case Vec3:
        case Color:
          dimension = 4
          elementSize = 4
          dataType = gl.FLOAT
          break
        case RGBA:
          dimension = 4
          elementSize = 1
          dataType = gl.UNSIGNED_BYTE
          break
        default: throw("Unhandled Type")
      }

      const stride = dimension * elementSize
      const offset =
        glattrbuffer.offset != undefined
          ? glattrbuffer.offset * dimension * elementSize
          : 0
      const normalized = glattrbuffer.normalized == true
      const instanced = attrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      gl.vertexAttribPointer(
        location,
        dimension,
        dataType,
        normalized,
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

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)

    return true
  }

  /**
   * The unbind method.
   */
  unbind() {
    const gl = this.__gl
    for (const attrName in this.__shaderAttrs) {
      const attrDesc = this.__shaderAttrs[attrName]
      const location = attrDesc.location
      if (location == -1) continue
      gl.disableVertexAttribArray(location)
      gl.vertexAttribDivisor(location, 0) // This makes it not-instanced

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy method.
   */
  destroy() {}
}

/** Class representing a VAO geom shader binding. */
class VAOGeomShaderBinding {
  /**
   * Create a VAO geom shader binding.
   * @param {any} gl - The gl value.
   * @param {any} shaderAttrs - The shaderAttrs value.
   * @param {any} glattrbuffers - The glattrbuffers value.
   * @param {any} indexBuffer - The indexBuffer value.
   */
  constructor(gl, shaderAttrs, glattrbuffers, indexBuffer) {
    this.__gl = gl
    this.__vao = gl.createVertexArray()
    gl.bindVertexArray(this.__vao)

    for (const attrName in shaderAttrs) {
      if (attrName == 'instancedIds') continue

      const attrDesc = shaderAttrs[attrName]
      const location = attrDesc.location
      if (location == -1) continue
      const glattrbuffer = glattrbuffers[attrName]
      if (!glattrbuffer) {
        // console.warn("glattrbuffer missing:" + attrName + " location:" + location);
        gl.disableVertexAttribArray(location)
        continue
      }

      let dimension
      let elementSize
      let dataType
      switch (glattrbuffer.dataType) {
        case UInt8:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_BYTE
          break
        case SInt8:
          dimension = 1
          elementSize = 4
          dataType = gl.BYTE
          break
        case UInt16:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_SHORT
          break
        case SInt16:
          dimension = 1
          elementSize = 4
          dataType = gl.SHORT
          break
        case UInt32:
          dimension = 1
          elementSize = 4
          dataType = gl.UNSIGNED_INT
          break
        case SInt32:
          dimension = 1
          elementSize = 4
          dataType = gl.INT
          break
        case Float32:
          dimension = 1
          elementSize = 4
          dataType = gl.FLOAT
          break
        case Vec3:
          dimension = 3
          elementSize = 4
          dataType = gl.FLOAT
          break
        case Vec3:
        case Color:
          dimension = 4
          elementSize = 4
          dataType = gl.FLOAT
          break
        case RGBA:
          dimension = 4
          elementSize = 1
          dataType = gl.UNSIGNED_BYTE
          break
        default: throw("Unhandled Type")
      }

      const stride = dimension * elementSize
      const offset =
        glattrbuffer.offset != undefined
          ? glattrbuffer.offset * dimension * elementSize
          : 0
      const normalized = glattrbuffer.normalized == true
      const instanced = attrDesc.instanced

      gl.enableVertexAttribArray(location)
      gl.bindBuffer(gl.ARRAY_BUFFER, glattrbuffer.buffer)
      gl.vertexAttribPointer(
        location,
        dimension,
        dataType,
        normalized,
        stride,
        offset
      )
      if (instanced) {
        gl.vertexAttribDivisor(location, 1) // This makes it instanced
      } else {
        gl.vertexAttribDivisor(location, 0) // This makes it not-instanced
      }

      // console.log("Binding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    this.__indexBuffer = indexBuffer
  }

  /**
   * The bind method.
   * @param {any} renderstate - The renderstate param.
   * @return {any} - The return value.
   */
  bind(renderstate) {
    this.__gl.bindVertexArray(this.__vao)
    if (this.__indexBuffer)
      this.__gl.bindBuffer(this.__gl.ELEMENT_ARRAY_BUFFER, this.__indexBuffer)
    return true
  }

  /**
   * The unbind method.
   */
  unbind() {
    const gl = this.__gl
    for (const attrName in this.__shaderAttrs) {
      const attrDesc = this.__shaderAttrs[attrName]
      const location = attrDesc.location
      if (location == -1) continue
      gl.disableVertexAttribArray(location)
      gl.vertexAttribDivisor(location, 0) // This makes it not-instanced

      // console.log("Unbinding :" + attrName + " to attr:" + location + " count:" + glattrbuffer.count + " dimension:" + dimension  + " stride:" + stride  + " offset:" + offset + " normalized:" + normalized + " instanced:" + instanced);
    }

    this.__gl.bindVertexArray(null)
    if (this.__indexBuffer) gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, null)
  }

  /**
   * The destroy method.
   */
  destroy() {
    this.__gl.deleteVertexArray(this.__vao)
  }
}

function generateShaderGeomBinding(
  gl,
  shaderAttrs,
  glattrbuffers,
  indexBuffer
) {
  if (gl.createVertexArray == null) {
    return new GeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer)
  } else {
    return new VAOGeomShaderBinding(gl, shaderAttrs, glattrbuffers, indexBuffer)
  }
}

export { generateShaderGeomBinding }
