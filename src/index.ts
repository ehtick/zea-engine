//@ts-ignore
import { version } from '../package.json'

/* NODE_START
// console.log(`Zea Engine v${version} - Node`)
// NODE_ELSE */
console.log(`Zea Engine v${version}`)
// NODE_END

import { LibsRegistry } from './LibsRegistry'
const libsRegistry = new LibsRegistry(version)
export { libsRegistry }

export * from './SystemDesc'
export * from './Registry'
export * from './Math/index'
export * from './Utilities/index'
export * from './SceneTree/index'

/* NODE_START
// NODE_ELSE */
export * from './Renderer/index'
// NODE_END
