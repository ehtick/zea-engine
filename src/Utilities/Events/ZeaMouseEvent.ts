import { Ray, Vec2 } from '../../Math'
import { ZeaPointerEvent, POINTER_TYPES } from './ZeaPointerEvent'

class ZeaMouseEvent extends ZeaPointerEvent {
  button: number
  clientX: number
  clientY: number
  rendererX: number
  rendererY: number
  altKey: boolean
  metaKey: boolean
  ctrlKey: boolean
  shiftKey: boolean
  private sourceEvent: globalThis.MouseEvent
  constructor(sourceEvent: globalThis.MouseEvent, rect: DOMRect) {
    super(POINTER_TYPES.mouse)
    this.sourceEvent = sourceEvent

    this.button = sourceEvent.button
    this.clientX = sourceEvent.clientX
    this.clientY = sourceEvent.clientY

    // Note: the rendererX/Y values are relative to the viewport,
    // but are available outside the viewport. So when a mouse
    // drag occurs, and drags outside the viewport, these values
    // provide consistent coords.
    // offsetX/Y are only valid inside the viewport and so cause
    // jumps when the mouse leaves the viewport.
    this.rendererX = this.clientX - rect.left
    this.rendererY = this.clientY - rect.top

    this.altKey = sourceEvent.altKey
    this.metaKey = sourceEvent.metaKey
    this.ctrlKey = sourceEvent.ctrlKey
    this.shiftKey = sourceEvent.shiftKey
  }

  stopPropagation(): void {
    super.stopPropagation()
    if (this.sourceEvent) this.sourceEvent.stopPropagation()
  }
  preventDefault(): void {
    if (this.sourceEvent) this.sourceEvent.preventDefault()
  }
}
export { ZeaMouseEvent }
