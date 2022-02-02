/* eslint-disable camelcase */
const vec3_normalize = (vec) => {
  let len = vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2]
  if (len < Number.EPSILON) {
    return [0, 0, 0]
  }
  len = 1.0 / Math.sqrt(len)
  return [vec[0] * len, vec[1] * len, vec[2] * len]
}
const vec3_subtract = (vec1, vec2) => {
  return [vec1[0] - vec2[0], vec1[1] - vec2[1], vec1[2] - vec2[2]]
}
const vec3_dot = (vec1, vec2) => {
  return vec1[0] * vec2[0] + vec1[1] * vec2[1] + vec1[2] * vec2[2]
}
const vec3_length = (vec) => {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1] + vec[2] * vec[2])
}
const vec3_scale = (vec, scl) => {
  return [vec[0] * scl, vec[1] * scl, vec[2] * scl]
}
const vec2_scale = (vec, scl) => {
  return [vec[0] * scl, vec[1] * scl]
}
const vec2_length = (vec) => {
  return Math.sqrt(vec[0] * vec[0] + vec[1] * vec[1])
}

const quat_conjugate = (quat) => {
  return [-quat[0], -quat[1], -quat[2], quat[3]]
}
const quat_multiply = (quat1, quat2) => {
  const ax = quat1[0]
  const ay = quat1[1]
  const az = quat1[2]
  const aw = quat1[3]
  const bx = quat2[0]
  const by = quat2[1]
  const bz = quat2[2]
  const bw = quat2[3]

  return [
    ax * bw + aw * bx + ay * bz - az * by,
    ay * bw + aw * by + az * bx - ax * bz,
    az * bw + aw * bz + ax * by - ay * bx,
    aw * bw - ax * bx - ay * by - az * bz,
  ]
}
const quat_rotateVec3 = (quat, vec3) => {
  const vq = [vec3[0], vec3[1], vec3[2], 0.0]
  const pq = quat_multiply(quat_multiply(quat, vq), quat_conjugate(quat))
  return [pq[0], pq[1], pq[2]]
}

// ///////////////////////////////////////////////
// Frustum Culling data.
let enableOcclusionCulling = false
const geomItemsData = []
const outOfFrustum = []
let frustumCulledCount = 0
let newlyCulled = []
let newlyUnCulled = []

let visibleCount = 0
const totalGeomStats = {
  triangles: 0,
  lines: 0,
  points: 0,
}
const visibleGeomStats = {
  triangles: 0,
  lines: 0,
  points: 0,
}
const geomStats_addTotal = (geomStats) => {
  // console.log('geomStats_add:', geomStats.triangles, visibleGeomStats.triangles)
  totalGeomStats.triangles += geomStats.triangles
  totalGeomStats.lines += geomStats.lines
  totalGeomStats.points += geomStats.points
}
const geomStats_subtractTotal = (geomStats) => {
  // console.log('geomStats_subtract:', geomStats.triangles, visibleGeomStats.triangles)
  totalGeomStats.triangles -= geomStats.triangles
  totalGeomStats.lines -= geomStats.lines
  totalGeomStats.points -= geomStats.points
}
const geomStats_add = (geomStats) => {
  // console.log('geomStats_add:', geomStats.triangles, visibleGeomStats.triangles)
  visibleCount++
  visibleGeomStats.triangles += geomStats.triangles
  visibleGeomStats.lines += geomStats.lines
  visibleGeomStats.points += geomStats.points
}
const geomStats_subtract = (geomStats) => {
  // console.log('geomStats_subtract:', geomStats.triangles, visibleGeomStats.triangles)
  visibleCount--
  visibleGeomStats.triangles -= geomStats.triangles
  visibleGeomStats.lines -= geomStats.lines
  visibleGeomStats.points -= geomStats.points
}

let cameraPos
let cameraInvOri
let isOrthographic = false
let frustumHeight = 0
let frustumWidth = 0
let frustumHalfAngleX = 0
let frustumHalfAngleY = 0
let solidAngleLimit = 0.004

const cull = (index) => {
  if (!outOfFrustum[index]) {
    outOfFrustum[index] = true
    frustumCulledCount++
    newlyCulled.push(index)
  }
}
const unCull = (index) => {
  if (outOfFrustum[index]) {
    outOfFrustum[index] = false
    // Occlusion culling can only determine if something is visible
    // meaning that we assume it is not, until it shows up in the occlusion buffer.
    if (enableOcclusionCulling) {
      occluded[index] = true
    }
    frustumCulledCount--
    newlyUnCulled.push(index)
  }
}

const checkGeomItem = (geomItemData) => {
  if (!geomItemData || !cameraPos) return

  // Some items, like Handles and the grid, or or the VR controllers that should not be culled.
  if (!geomItemData.cullable) {
    unCull(geomItemData.id)
    return
  }
  if (!geomItemData.visible) {
    return
  }
  const boundingRadius = geomItemData.boundingRadius

  if (isOrthographic) {
    // Cull very small items
    // Note: when in VR, the FoV becomes very wide and the pixel
    // height varies. It seems more consistent to just use solidAngle
    // which is resolution invariant.
    const vheight = boundingRadius / frustumHeight
    if (solidAngleLimit > 0 && vheight < solidAngleLimit) {
      cull(geomItemData.id)
      return
    }

    // Now we check if the item is within the view frustum.
    // We need the solid angle of the item for each axis (X & Y)
    // This is because at the corners of the screen, the object is slightly
    // further away, so the solid angle calculated above gets smaller.
    // This was causing items with big bounding spheres to be culled too early
    // at the corner of the screen.
    const vec = vec3_subtract(geomItemData.pos, cameraPos)
    const viewPos = quat_rotateVec3(cameraInvOri, vec)
    if (
      Math.abs(viewPos[0]) - boundingRadius > frustumWidth * 0.5 ||
      Math.abs(viewPos[1]) - boundingRadius > frustumHeight * 0.5
    ) {
      cull(geomItemData.id)
      return
    }
  } else {
    const vec = vec3_subtract(geomItemData.pos, cameraPos)
    const dist = vec3_length(vec)
    // unCull items close to the view.
    if (dist < boundingRadius) {
      unCull(geomItemData.id)
      return
    }
    // Cull very small items
    // Note: when in VR, the FoV becomes very wide and the pixel
    // height varies. It seems more consistent to just use solidAngle
    // which is resolution invariant.
    const solidAngle = Math.asin(boundingRadius / dist)
    if (solidAngleLimit > 0 && solidAngle < solidAngleLimit) {
      cull(geomItemData.id)
      return
    }

    // Now we check if the item is within the view frustum.
    // We need the solid angle of the item for each axis (X & Y)
    // This is because at the corners of the screen, the object is slightly
    // further away, so the solid angle calculated above gets smaller.
    // This was causing items with big bounding spheres to be culled too early
    // at the corner of the screen.
    const viewPos = quat_rotateVec3(cameraInvOri, vec)
    const viewVecXZ = [viewPos[0], viewPos[2]]
    const viewVecYZ = [viewPos[1], viewPos[2]]
    const distX = vec2_length(viewVecXZ)
    const distY = vec2_length(viewVecYZ)
    const solidAngleXZ = Math.asin(boundingRadius / distX)
    const solidAngleYZ = Math.asin(boundingRadius / distY)
    const viewVecNormXZ = vec2_scale(viewVecXZ, 1 / distX)
    const viewVecNormYZ = vec2_scale(viewVecYZ, 1 / distY)

    let viewAngle
    // If an item is behind the viewer
    if (viewPos[2] > 0) {
      viewAngle = [
        Math.PI - Math.abs(Math.asin(viewVecNormXZ[0])) - solidAngleXZ,
        Math.PI - Math.abs(Math.asin(viewVecNormYZ[0])) - solidAngleYZ,
      ]
    } else {
      viewAngle = [
        Math.abs(Math.asin(viewVecNormXZ[0])) - solidAngleXZ,
        Math.abs(Math.asin(viewVecNormYZ[0])) - solidAngleYZ,
      ]
    }
    // console.log(geomItemData.id, 'angle To Item:', frustumHalfAngleX, viewAngle[0], frustumHalfAngleY, viewAngle[1])
    if (viewAngle[0] > frustumHalfAngleX || viewAngle[1] > frustumHalfAngleY) {
      cull(geomItemData.id)
      return
    }
  }

  unCull(geomItemData.id)
}

const onViewPortChanged = (data, postMessage) => {
  if (data.isOrthographic) {
    isOrthographic = true
    frustumHeight = data.frustumHeight
    frustumWidth = data.frustumWidth
  } else {
    isOrthographic = false
    frustumHalfAngleX = data.frustumHalfAngleX
    frustumHalfAngleY = data.frustumHalfAngleY
  }

  solidAngleLimit = data.solidAngleLimit
  if (cameraPos && cameraInvOri) {
    geomItemsData.forEach(checkGeomItem)
    onDoneFrustumCull(postMessage)
  }
}

const onViewChanged = (data, postMessage) => {
  cameraPos = data.cameraPos
  cameraInvOri = quat_conjugate(data.cameraOri)
  solidAngleLimit = data.solidAngleLimit
  if (geomItemsData.length > 0) {
    geomItemsData.forEach(checkGeomItem)
    onDoneFrustumCull(postMessage)
  }
}

let inFrustumDrawIdsBufferPopulated = false
const generateInFrustumIndices = () => {
  let offset = 0
  outOfFrustum.forEach((value, index) => {
    if (index > 0 && !value && geomItemsData[index].visible && !geomItemsData[index].isTransparent) offset++
  })
  // Create a float array that can be used as an instances
  // attribute to pass into the drawing of the bounding boxes.
  const inFrustumIndices = new Float32Array(offset)
  offset = 0
  outOfFrustum.forEach((value, index) => {
    if (index > 0 && !value && geomItemsData[index].visible && !geomItemsData[index].isTransparent) {
      inFrustumIndices[offset] = index
      offset++
    }
  })
  return inFrustumIndices
}

const onDoneFrustumCull = (postMessage) => {
  if (!enableOcclusionCulling) {
    const countInFrustum = geomItemsData.length - 1 - frustumCulledCount

    newlyCulled.forEach((index) => {
      if (index > 0 && geomItemsData[index] && geomItemsData[index].visible) {
        geomStats_subtract(geomItemsData[index].geomStats)
      }
    })
    newlyUnCulled.forEach((index) => {
      if (index > 0 && geomItemsData[index] && geomItemsData[index].visible) {
        geomStats_add(geomItemsData[index].geomStats)
      }
    })

    postMessage({
      type: 'CullResults',
      newlyCulled,
      newlyUnCulled,
      visible: countInFrustum,
      total: geomItemsData.length - 1,
      visibleGeomStats,
      totalGeomStats,
    })
  } else {
    // console.log('FrustumCullResults:', 'newlyCulled:', newlyCulled, 'newlyUnCulled:', newlyUnCulled, outOfFrustum)
    // const countInFrustum = geomItemsData.length - 1 - frustumCulledCount

    // if (countInFrustum > 300) {
    //   console.log('countInFrustum:', countInFrustum)
    // }
    if (newlyCulled.length > 0 || newlyUnCulled.length > 0 || !inFrustumDrawIdsBufferPopulated) {
      const inFrustumIndices = generateInFrustumIndices()

      newlyCulled.forEach((index) => {
        if (index > 0 && geomItemsData[index] && geomItemsData[index].visible && !occluded[index]) {
          geomStats_subtract(geomItemsData[index].geomStats)
        }
      })

      // if (countInFrustum > 300) {
      //   console.log('countInFrustum:', countInFrustum)
      // }
      if (newlyCulled.length > 0 || newlyUnCulled.length > 0 || !inFrustumDrawIdsBufferPopulated) {
        const inFrustumIndices = generateInFrustumIndices()

        // When occlusion culling is on, we only uncull items after they
        // are detected in the occlusion buffer. Transparent items are not
        // rendered to the occlusion buffer, so must be unculled immediately.
        const newlyUnCulled_transparent = []
        newlyUnCulled.forEach((index) => {
          if (index > 0 && geomItemsData[index] && geomItemsData[index].visible && geomItemsData[index].isTransparent) {
            newlyUnCulled_transparent.push(index)
            geomStats_add(geomItemsData[index].geomStats)
          }
        })
        if (newlyCulled.length > 0 || newlyUnCulled_transparent.length > 0) {
          postMessage(
            { type: 'InFrustumIndices', newlyCulled, newlyUnCulled: newlyUnCulled_transparent, inFrustumIndices },
            [inFrustumIndices.buffer]
          )
        } else {
          postMessage({ type: 'InFrustumIndices', inFrustumIndices }, [inFrustumIndices.buffer])
        }
      })
      if (newlyCulled.length > 0 || newlyUnCulled_transparent.length > 0) {
        postMessage(
          {
            type: 'InFrustumIndices',
            newlyCulled,
            newlyUnCulled: newlyUnCulled_transparent,
            visible: visibleCount,
            total: geomItemsData.length - 1,
            visibleGeomStats,
            totalGeomStats,
            inFrustumIndices,
          },
          [inFrustumIndices.buffer]
        )
      } else {
        postMessage(
          {
            type: 'InFrustumIndices',
            inFrustumIndices,
            newlyCulled: [],
            newlyUnCulled: [],
            visible: visibleCount,
            total: geomItemsData.length - 1,
            visibleGeomStats,
            totalGeomStats,
          },
          [inFrustumIndices.buffer]
        )
      }
      inFrustumDrawIdsBufferPopulated = true
    } else {
      // Note: the inFrustumDrawIdsBuffer is already up to date we can skip this.
      postMessage({ type: 'InFrustumIndices' })
    }
  }
  newlyCulled = []
  newlyUnCulled = []
}

// ///////////////////////////////////////////////
// Occlusion Culling data.
const occluded = []
const processOcclusionData = (data) => {
  const visibleItems = data.visibleItems

  const newlyCulled = []
  const newlyUnCulled = []
  visibleItems.some((value, index) => {
    if (index == 0) return false
    if (index >= geomItemsData.length) return true

    const geomItemData = geomItemsData[index]
    if (!outOfFrustum[index]) {
      if (value == 0) {
        // Not transparent object can not be occlusion culled, because we do not render them to the
        // occlusion buffer. This means they cannot occlude, or be considered occluded.
        if (!occluded[index] && geomItemData.cullable && geomItemData.visible && !geomItemData.isTransparent) {
          occluded[index] = true
          if (!outOfFrustum[index]) {
            newlyCulled.push(index)
            geomStats_subtract(geomItemData.geomStats)
          }
        }
      } else {
        if (occluded[index]) {
          occluded[index] = false
          newlyUnCulled.push(index)
          geomStats_add(geomItemData.geomStats)
        }
      }
    } else {
      // Note: We have detected a geometry in the occlusion buffer that was flagged as culled by the
      // frustum culling. This is most likely a small item culled due to solid angle being too small
      // yet the occlusion rendering picked up a bounding box. We leave this item as culled.
      // if (value != 0) {
      // }
    }
  })
  if (newlyCulled.length > 0 || newlyUnCulled.length > 0) {
    postMessage({
      type: 'CullResults',
      newlyCulled,
      newlyUnCulled,
      visible: visibleCount,
      total: geomItemsData.length - 1,
      visibleGeomStats,
      totalGeomStats,
    })
  }
}

// ///////////////////////////////////////////////
// Messaging
const handleMessage = (data, postMessage) => {
  if (data.type == 'Init') {
    enableOcclusionCulling = data.enableOcclusionCulling
  } else if (data.type == 'ViewportChanged') {
    onViewPortChanged(data, postMessage)
  } else if (data.type == 'ViewChanged') {
    onViewChanged(data, postMessage)
  } else if (data.type == 'UpdateGeomItems') {
    data.removedItemIndices.forEach((index) => {
      const geomItem = geomItemsData[index]
      if (geomItem && geomItem.visible) {
        geomStats_subtractTotal(geomItem.geomStats)
        if (!enableOcclusionCulling || !occluded[index]) {
          geomStats_subtract(geomItem.geomStats)
        }
      }
      geomItemsData[index] = null
      outOfFrustum[index] = true
    })
    data.geomItems.forEach((geomItem) => {
      const index = geomItem.id
      // New geoms default to being un-culled
      // Existing geoms that may be changing state, like changing
      // visibility or transformations should simply update.
      if (!geomItemsData[index]) {
        outOfFrustum[index] = false
        if (geomItem.visible) {
          geomStats_addTotal(geomItem.geomStats)
          geomStats_add(geomItem.geomStats)
        }
      } else {
        // are either adding a new item, or unhiding an existing item.
        const becomingVisible = !geomItemsData[index].visible && geomItem.visible
        const becomingInVisible = geomItemsData[index].visible && !geomItem.visible
        if (becomingVisible) {
          geomStats_addTotal(geomItem.geomStats)
          if (!outOfFrustum[index] && !occluded[index]) {
            geomStats_add(geomItem.geomStats)
          }
        } else if (becomingInVisible) {
          geomStats_subtractTotal(geomItem.geomStats)
          if (!outOfFrustum[index] && (!enableOcclusionCulling || !occluded[index])) {
            geomStats_subtract(geomItem.geomStats)
          }
        }
      }
      geomItemsData[index] = geomItem
      checkGeomItem(geomItemsData[index])
    })
    inFrustumDrawIdsBufferPopulated = false
    onDoneFrustumCull(postMessage)
  } else if (data.type == 'OcclusionData') {
    processOcclusionData(data, postMessage)
  }
}

self.onmessage = function (event) {
  handleMessage(event.data, self.postMessage)
}

export { handleMessage }
