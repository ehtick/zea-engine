import { parseGeomsBinary } from './parseGeomsBinary'

const handleMessage = function (srcData, postMessage) {
  parseGeomsBinary(srcData, (resultData, transferables) => {
    postMessage(resultData, transferables)
  })
}

/* NODE_START
export { handleMessage }
// NODE_ELSE */
self.onmessage = function (event) {
  if (!event.data) {
    // Note: we see this occur when loading one large asset many times.
    // Like when loading the portafil.
    // It may be due to memory issues, but its not clear.
    console.warn('GeomLibrary worker.postMessage failed. data was lost on the way to the web worker.')
    return
  }
  handleMessage(event.data, self.postMessage)
}
// NODE_END
