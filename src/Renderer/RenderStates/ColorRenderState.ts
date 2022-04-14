import { GLEnvMap } from '../GLEnvMap'
import { RenderState } from './RenderState'

class ColorRenderState extends RenderState {
  envMap?: GLEnvMap

  exposure: number // must initialize these
  gamma: number
}

export { ColorRenderState }
