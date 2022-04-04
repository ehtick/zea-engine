import { Scene } from '../../SceneTree'
import { BaseEvent } from '../BaseEvent'

class SceneSetEvent extends BaseEvent {
  scene: Scene
  constructor(scene: Scene) {
    super()
    this.scene = scene
  }
}

export { SceneSetEvent }
