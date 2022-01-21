import { GLBaseViewport } from '../../Renderer'

import { BaseEvent } from '../BaseEvent'

/**
 * ZeaUIEvent are emitted from a 2D UI, such as from a HTMLCanvas element generated from
 * a mouse or touch interaction, or key presses
 */
class ZeaUIEvent extends BaseEvent {
  viewport: GLBaseViewport
  propagating = true

  constructor() {
    super()
  }
}
export { ZeaUIEvent }
