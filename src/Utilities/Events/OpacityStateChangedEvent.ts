import { BaseEvent } from '../BaseEvent'

class OpacityStateChangedEvent extends BaseEvent {
  isOpaque: boolean
  isOpaqueStateChanged: boolean
  constructor(isOpaque: boolean, isOpaqueStateChanged: boolean) {
    super()
    this.isOpaque = isOpaque
    this.isOpaqueStateChanged = isOpaqueStateChanged
  }
}

export { OpacityStateChangedEvent }
