import { GLBaseViewport } from './GLBaseViewport'
import { Mat4, Xfo } from '../Math'
import { GLGeom } from './Drawing'
import { GLShader } from './GLShader'
import { Shaderopts, Uniforms } from './types/renderer'
import { WebGL12RenderingContext } from './types/webgl'

class RenderState {
  gl: WebGL12RenderingContext
  stack: Array<Record<string, number | number[]>> = []
  top: Record<string, number | number[]> | null

  glShader?: GLShader
  shaderkey?: string
  shaderopts: Shaderopts
  attrs: Record<string, Record<string, any>> // not Attribute
  unifs: Uniforms
  directives?: string[]

  drawItemsTexture?: any

  glGeom?: GLGeom

  vrviewport?: any

  passIndex: number
  pass?: string

  vrPresenting?: boolean
  supportsInstancing?: boolean
  viewport?: GLBaseViewport // Viewport
  viewports?: Array<GLBaseViewport>

  bindViewports: (unifs: Uniforms, cb: any) => void
  bindRendererUnifs: (unifs: Uniforms) => void

  boundTextures: number
  boundRendertarget: WebGLFramebuffer | null

  viewXfo?: Xfo
  viewScale: number
  region?: number[]
  cameraMatrix?: Mat4

  constructor(gl: WebGL12RenderingContext) {
    this.gl = gl
    this.pushGLStack()
  }

  pushGLStack() {
    this.top = {}
    this.stack.push(this.top)
  }

  popGLStack() {
    const prevTop = this.top
    this.top = this.stack.pop()

    // As we pop the stack we must restore the GL state to what it was.
    if (this.stack.length > 0) {
      for (let key in prevTop) {
        const args = prevTop[key]
        for (let i = this.stack.length - 1; i >= 0; i--) {
          const stackItem = this.stack[i]
          const prevArgs = stackItem[key]
          if (prevArgs) {
            if (prevArgs != args) {
              if (Array.isArray(prevArgs)) {
                this.gl[key](...prevArgs)
              } else {
                this.gl[key](prevArgs)
              }
            }
            break
          }
        }
      }
    }
  }

  setGLParam(key: string, args: number | number[]) {
    this.top[key] = args
    if (Array.isArray(args)) {
      this.gl[key](...args)
    } else {
      this.gl[key](args)
    }
  }
}

export { RenderState }
