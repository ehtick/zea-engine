import { GLFbo } from '../GLFbo'
import { RenderState } from './RenderState'

class GeomDataRenderState extends RenderState {
  geomDataFbo?: GLFbo // only used in geomdata buffer rendering
  floatGeomBuffer: boolean
  occlusionCulling: number
}

export { GeomDataRenderState }
