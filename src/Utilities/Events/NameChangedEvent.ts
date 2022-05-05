import { BaseEvent } from '../BaseEvent'

class NameChangedEvent extends BaseEvent {
  oldName: string
  newName: string
  constructor(oldName: string, newName: string) {
    super()
    this.oldName = oldName
    this.newName = newName
  }
}

export { NameChangedEvent }
