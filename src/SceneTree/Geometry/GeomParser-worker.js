import { parseGeomsBinary } from './parseGeomsBinary'

self.onmessage = function (event) {
  if (!event.data) {
    // Note: we see this occur when loading one large asset many times.
    // Like when loading the portafil.
    // It may be due to memory issues, but its not clear.
    console.warn('GeomLibrary worker.postMessage failed. data was lost on the way to the web worker.')
    return
  }
  parseGeomsBinary(event.data, (data, transferables) => {
    self.postMessage(data, transferables)
  })
}
