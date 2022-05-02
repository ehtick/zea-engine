// @ts-ignore
import unpackBase64Str from './unpack.wasm'

/* NODE_START
// For synchronous loading, uncomment these lines.
// @ts-ignore
import { handleMessage } from './ArchiveUnpacker-worker.js'
class ArchiveUnpackerWorkerPool {
  constructor() {
    const buffer = Buffer.from(unpackBase64Str, 'base64')
    handleMessage(
      {
        type: 'init',
        buffer
      },
      (results) => {
        console.log(results)
      }
    )
  }
  addTask(taskData, transerable) {
    return new Promise((resolve) => {
      handleMessage(taskData, (results) => {
        resolve(results)
      })
    })
  }

  terminate() {}
}

// NODE_ELSE */

const buffer = Uint8Array.from(atob(unpackBase64Str), (c) => c.charCodeAt(0))

import { WorkerPool } from '../../Utilities/WorkerPool'
// @ts-ignore
import ArchiveUnpackerWorker from 'web-worker:./ArchiveUnpacker-worker.js'
class ArchiveUnpackerWorkerPool extends WorkerPool<ArchiveUnpackerWorker> {
  constructor() {
    super(true)
  }
  constructWorker(): Promise<ArchiveUnpackerWorker> {
    return new Promise<ArchiveUnpackerWorker>((resolve) => {
      const worker = new ArchiveUnpackerWorker()
      worker.onmessage = (event: Record<string, any>) => {
        if (event.data.type == 'WASM_LOADED') resolve(worker)
      }
      worker.postMessage({
        type: 'init',
        buffer: buffer.buffer,
      })
    })
  }
}

// NODE_END

function checkStatus(response: any): any {
  if (!response.ok) {
    return false
  }

  return response
}

/**
 * Archive unpacker plugin.
 */
class ArchiveUnpackerPlugin {
  protected threadPool: ArchiveUnpackerWorkerPool = new ArchiveUnpackerWorkerPool()

  constructor() {}

  init(): void {}

  /**
   * The type of file this plugin handles.
   * @return The type of file.
   */
  getType(): string {
    return 'archive'
  }

  /**
   * Loads an archive file, returning a promise that resolves to the JSON data value.
   * Note: using the resource loader to centralize data loading enables progress to be tracked and displayed
   * @param url - The url of the data to load.
   * @return - The promise value.
   */
  loadFile(url: string): Promise<unknown> {
    const promise = new Promise((resolve, reject) => {
      fetch(url)
        .then((response) => {
          if (checkStatus(response)) return response.arrayBuffer()
          else {
            reject(new Error(`loadArchive: ${response.status} - ${response.statusText} : ${url}`))
            return null
          }
        })
        .then((buffer) => {
          if (!buffer) {
            reject('Buffer is null')
            return
          }
          const resourceId = url
          this.threadPool
            .addTask(
              {
                type: 'unpack',
                resourceId,
                buffer,
              },
              [buffer]
            )
            .then((data: object) => {
              // @ts-ignore
              // if (data.type == 'FINISHED') resolve(data.entries)
              // else resolve(null)
              if (data.type === 'FINISHED') {
                // const data = data
                // const text = [
                //   '==================== ArchiveUnpackerWorker.js ====================',
                //   `Filename: ${data.resourceId}`,
                //   '------------------------------------------------------',
                // ];
                // for(const file in data.entries) {
                //   text.push(`${file}:${data.entries[file].byteLength}`);
                // }
                // console.log(text.join('\n'))

                // @ts-ignore
                resolve(data.entries)
                // @ts-ignore
              } else if (data.type === 'ERROR') {
                // @ts-ignore
                reject(new Error(`Unable to load Resource: ${resourceId}`))
              }
            })
        })
    })

    return promise
  }
}

export { ArchiveUnpackerPlugin }
