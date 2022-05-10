import { XRViewport } from '../../Renderer/VR/XRViewport'
import { XRController } from '../../Renderer/VR/XRController'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'
import { BaseTool, TreeItem } from '../../SceneTree'
import { Xfo } from '../../Math'

let capturedItem: TreeItem | BaseTool = null
class XRPointerEvent extends ZeaPointerEvent {
  xfo: Xfo
  xrSelectEvent: any
  hitTestResults: any
  constructor(viewport: XRViewport, xfo: Xfo, xrSelectEvent: any, hitTestResults: any) {
    super(POINTER_TYPES.xr)
    this.viewport = viewport
    this.xfo = xfo
    this.xrSelectEvent = xrSelectEvent
    this.hitTestResults = hitTestResults
  }

  stopPropagation(): void {
    this.propagating = false
  }

  setCapture(item: TreeItem | BaseTool): void {
    capturedItem = item
  }

  getCapture(): TreeItem | BaseTool {
    return capturedItem
  }

  releaseCapture(): void {
    capturedItem = null
  }
}
export { XRPointerEvent }
