import { Color } from '../../Math'
import { GLEnvMap } from '../GLEnvMap'
import { GLScreenQuad } from '../GLScreenQuad'
import { HighlightRenderState } from './HighlightRenderState'
import { RenderState } from './RenderState'

class ColorRenderState extends RenderState {
  envMap?: GLEnvMap

  renderMode: string
  outlineMethod: string
  outlineThickness: number
  outlineColor: Color
  hiddenLineColor: Color
  screenQuad: GLScreenQuad

  exposure: number // must initialize these
  gamma: number

  toHighlightRenderState(): HighlightRenderState {
    const highlightRenderState = new HighlightRenderState(this.gl)
    highlightRenderState.boundRendertarget = this.boundRendertarget 
    highlightRenderState.viewXfo = this.viewXfo 
    highlightRenderState.viewScale = this.viewScale 
    highlightRenderState.region = this.region
    highlightRenderState.cameraMatrix = this.cameraMatrix 

    highlightRenderState.viewport = this.viewport 
    highlightRenderState.viewports = this.viewports 
  
    highlightRenderState.vrPresenting = this.vrPresenting 
    return highlightRenderState
  }
}

export { ColorRenderState }
