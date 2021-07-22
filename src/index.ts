import packageJson from '../package.json'

import { zeaDebug } from './helpers/zeaDebug'
import { LibsRegistry } from './LibsRegistry'
import { Env } from './Utilities/index'

import { SystemDesc } from './SystemDesc'
import { Registry } from './Registry'
import * as Math from './Math/index'
import * as Utilities from './Utilities/index'
import * as SceneTree from './SceneTree/index'
import * as Renderer from './Renderer/index'

const ZeaEngine = {
  SystemDesc,
  Registry,
  ...Math,
  ...Utilities,
  ...SceneTree,
  ...Renderer,
}

const libsRegistry = new LibsRegistry(packageJson.version)

zeaDebug('Zea Engine version %s', packageJson.version)
zeaDebug('Zea Engine env %O', Env)

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'
export * from './Renderer/index'

export { libsRegistry, packageJson, ZeaEngine }