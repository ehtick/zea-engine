/* eslint-disable guard-for-in */
import { Points } from './Points'
import { Lines } from './Lines'
import { Mesh } from './Mesh'
import { BinReader } from '../BinReader'
import { Version } from '../Version'
import { CompoundGeomLoader } from './CompoundGeomLoader'

// key, toc, geomIndexOffset, geomsRange, isMobileDevice, bufferSlice, genBuffersOpts, context
const parseGeomsBinary = (data: any, callback: any): void => {
  // eslint-disable-next-line guard-for-in
  for (const key in data.context.versions) {
    const v = data.context.versions[key]
    const version = new Version('')
    version.major = v.major
    version.minor = v.minor
    version.patch = v.patch
    version.branch = v.branch
    data.context.versions[key] = version
  }

  const geomDatas = []
  const byteOffset = data.byteOffset
  // console.log('byteOffset:' + byteOffset, ' geomsRange:', data.geomsRange)
  const transferables = []
  for (let i = data.geomsRange[0]; i < data.geomsRange[1]; i++) {
    const reader = new BinReader(data.bufferSlice, data.toc[i] - byteOffset, data.isMobileDevice)
    const className = reader.loadStr()
    const pos = reader.pos()
    // const name = reader.loadStr()
    // console.log(
    //   i +
    //     ':' +
    //     byteOffset +
    //     ' className:' +
    //     className +
    //     ' name:' +
    //     name /* + " pos:" + (data.toc[i] - byteOffset) + " bufferSlice.byteLength:" +  bufferSlice.byteLength*/
    // )
    let geom
    switch (className) {
      case 'Points':
        geom = new Points()
        break
      case 'Lines':
        geom = new Lines()
        break
      case 'Mesh':
        geom = new Mesh()
        break
      case 'CompoundGeom':
        geom = new CompoundGeomLoader()
        break
      default:
        throw new Error('Unsupported Geom type:' + className)
    }
    try {
      reader.seek(pos) // Reset the pointer to the start of the item data.
      geom.readBinary(reader, data.context)
    } catch (e) {
      console.warn('Error loading:' + geom.name + '\n:' + e)
      geomDatas.push({})
      continue
    }

    const geomBuffers = geom.genBuffers(data.genBuffersOpts)

    // Transfer the bbox point buffers.
    const bbox = geom.getBoundingBox()
    transferables.push(bbox.p0.__data.buffer)
    transferables.push(bbox.p1.__data.buffer)

    geomDatas.push({
      name: geom.name,
      type: className,
      geomBuffers,
      bbox,
    })
  }

  // If the entire buffer was passed to the worker, we pass it back.
  // The browser will then throw it away if we have already cloned
  // arrays out of it, or it will wait till all those shared arrays
  // are in the GPU and freed(see GLGeomLibrary freeDataAfterUpload)
  // then it will free it in one go.
  transferables.push(data.bufferSlice)

  callback(
    {
      taskId: data.taskId,
      geomLibraryId: data.geomLibraryId,
      geomFileID: data.geomFileID,
      geomIndexOffset: data.geomIndexOffset,
      geomsRange: data.geomsRange,
      geomDatas,
    },
    transferables
  )
}

export { parseGeomsBinary }
