import { GLBaseViewport } from '../GLBaseViewport'
import { Mat4, Vec2, Xfo } from '../../Math'
import { GLGeom } from '../Drawing'
import { GLShader } from '../GLShader'
import { Shaderopts, Uniforms } from '../types/renderer'
import { WebGL12RenderingContext } from '../types/webgl'

export interface ViewportRenderState {
  region: number[]
  viewMatrix: Mat4
  projectionMatrix?: Mat4
  isOrthographic: number
  viewportFrustumSize?: Vec2
  fovY?: number
}
export interface StackObj {
  enabled: Set<number>
  disabled: Set<number>
  functions: Record<string, number | number[]>
}

class RenderState {
  gl: WebGL12RenderingContext
  stack: Array<StackObj> = []
  top: StackObj | null

  glShader?: GLShader
  shaderkey?: string
  shaderopts: Shaderopts
  directives?: string[]
  
  attrs: Record<string, Record<string, any>> // not Attribute
  unifs: Uniforms

  drawItemsTexture?: any

  glGeom?: GLGeom

  vrviewport?: any

  passIndex: number
  pass?: string

  vrPresenting?: boolean
  supportsInstancing?: boolean
  viewport?: GLBaseViewport // Viewport
  viewports?: Array<ViewportRenderState>

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
    this.top = { enabled: new Set<number>(), disabled: new Set<number>(), functions: {} }
    this.stack.push(this.top)
  }

  popGLStack() {
    const prevTop = this.top
    this.top = this.stack.pop()

    // As we pop the stack we must restore the GL state to what it was.
    if (this.stack.length > 0) {
      prevTop.enabled.forEach((prop: number) => {
        let i
        for (i = this.stack.length - 1; i >= 0; i--) {
          const stackItem = this.stack[i]
          if (stackItem.enabled.has(prop)) {
            break
          } else if (stackItem.disabled.has(prop)) {
            this.gl.disable(prop)
            break
          }
        }
        if (i < 0) {
          this.gl.disable(prop)
        }
      })
      prevTop.disabled.forEach((prop: number) => {
        let i
        for (i = this.stack.length - 1; i >= 0; i--) {
          const stackItem = this.stack[i]
          if (stackItem.disabled.has(prop)) {
            break
          } else if (stackItem.enabled.has(prop)) {
            this.gl.enable(prop)
            break
          }
        }
        if (i < 0) {
          this.gl.enable(prop)
        }
      })
    }
    //   for (let key in prevTop.enabled) {
    //   }
    //   for (let key in prevTop.disabled) {
    //     const prop = prevTop.enabled[key]
    //     if (stackItem.enabled[key] == prop) {
    //       break
    //     } else if (stackItem.disabled[key] == prop) {
    //       this.gl.enable(prop)
    //       break
    //     }
    //   }
    // }
    /*
      for (let key in prevTop.functions) {
        const args = prevTop[key]
        for (let i = this.stack.length - 1; i >= 0; i--) {
          const stackItem = this.stack[i]
          const prevArgs = stackItem.functions[key]
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
      }*/
    // }
  }

  glEnable(prop: number) {
    this.gl.enable(prop)
    this.top.enabled.add(prop)
  }
  glDisable(prop: number) {
    this.gl.disable(prop)
    this.top.disabled.add(prop)
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
