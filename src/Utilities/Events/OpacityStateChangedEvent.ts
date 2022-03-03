import { BaseEvent } from '../BaseEvent'

class OpacityStateChangedEvent extends BaseEvent {
  isOpaque: boolean
  constructor(isOpaque: boolean) {
    super()
    this.isOpaque = isOpaque
  }
}

export { OpacityStateChangedEvent }
