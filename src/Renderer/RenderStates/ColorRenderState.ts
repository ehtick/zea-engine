import { Color } from '../../Math'
import { GLEnvMap } from '../GLEnvMap'
import { GLScreenQuad } from '../GLScreenQuad'
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
}

export { ColorRenderState }
