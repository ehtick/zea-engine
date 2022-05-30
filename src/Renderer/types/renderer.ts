import { Mat4 } from '../../Math/Mat4'
import { Vec2 } from '../../Math/Vec2'

export type Shaderopts = Record<string, string[]>

export interface Viewport {
  region?: number[]
  viewMatrix?: Mat4
  projectionMatrix?: Mat4
  viewportFrustumSize?: Vec2
  isOrthographic?: boolean
  fovY?: number
}

export type Uniforms = Record<string, Uniform>
export interface Uniform {
  name: string
  location: number
  type: string
}
export interface Attribute {
  type: string
  instanced: boolean
}
export interface ShaderParseResult {
  glsl: string
  numLines: number
  uniforms: Record<string, string>
  attributes: Record<string, Attribute>
}

export interface GLAttrDesc {
  name: string
  dimension: number
  elementSize: number
  dataType: number
  normalized?: boolean
}

export interface GLAttrBuffer {
  dataType: number
  name: string
  dimension: number
  elementSize: number
  normalized: boolean
  shared: boolean
  numValues: number
  offset?: number
  buffer?: WebGLBuffer
}

export interface LayoutItem {
  pos: Vec2
  size: Vec2
}

export interface Bindings {
  textureTypeUnif: WebGLUniformLocation
}

export type JSON = Record<string, any>
