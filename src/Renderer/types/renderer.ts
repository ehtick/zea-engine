import { String } from 'cypress/types/lodash'
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

// //////////////////////////////////
// ShaderParseResult
// This is what the parser found when inspecting the GLSL code.
export interface ShaderParseAttribute {
  glslType: string
  instanced: boolean
  integer: boolean
}
export interface ShaderParseUniform {
  glslType: string
}
export interface ShaderParseResult {
  glsl: string
  numLines: number
  // A mapping of name to GLSL type.
  uniforms: Record<string, ShaderParseUniform>
  // A mapping of name to type .
  attributes: Record<string, ShaderParseAttribute>
}

// //////////////////////////////////
// ShaderUniform and ShaderAttribute
// This is what the WebGL API told us it found when parsing the compiled code.
// Note: Unused uniforms and attributes will be missing, so will deviate
// from the parse results above.
export interface ShaderUniform {
  name: string
  location: WebGLUniformLocation
  glslType: string
}
export interface ShaderAttribute {
  name: string
  glslType: string
  location: number
  instanced: boolean
  integer: boolean
}

export type ShaderAttributes = Record<string, ShaderAttribute>
export type ShaderUniforms = Record<string, ShaderUniform>

export interface ShaderCompileResult {
  shaderkey?: string
  unifs: ShaderUniforms
  attrs: ShaderAttributes
  shaderHdls?: Record<string, WebGLShader>
  shaderProgramHdl?: WebGLProgram
}

// //////////////////////////////////
// Given a Zea Type name (Float, Vec2, Color), provide a description of the
// data in the GPU. See genDataTypeDesc
export interface GLAttrDesc {
  name: string
  dimension: number
  elementSize: number
  dataType: number
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

export enum GeomType {
  TRIANGLES = 0,
  LINES = 1,
  POINTS = 2,
}
