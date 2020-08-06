import { Color, Xfo, Vec3 } from '../Math/index'
import { TreeItem } from './TreeItem'
import { Material } from './Material'
import { GeomItem } from './GeomItem'
import { Grid } from './Geometry/Shapes/Grid'
import { Lines } from './Geometry/Lines'
import { sgFactory } from './SGFactory.js'

/**
 *
 *
 * @extends {TreeItem}
 */
export default class GridTreeItem extends TreeItem {
  /**
   * Creates an instance of GridTree.
   *
   * @param {number} [gridSize=5]
   * @param {number} [resolution=50]
   * @param {string} [gridColor=new Color('#DCDCDC')]
   */
  constructor(gridSize = 5, resolution = 50, gridColor = new Color('#DCDCDC')) {
    super('GridTree')

    const gridMaterial = new Material('gridMaterial', 'LinesShader')
    gridMaterial.getParameter('BaseColor').setValue(gridColor)
    const grid = new Grid(gridSize, gridSize, resolution, resolution, true)
    this.addChild(new GeomItem('GridItem', grid, gridMaterial), false)
    const axisLine = new Lines()
    axisLine.setNumVertices(2)
    axisLine.setNumSegments(1)
    axisLine.setSegmentVertexIndices(0, 0, 1)
    const positions = axisLine.getVertexAttribute('positions')
    positions.getValueRef(0).set(gridSize * -0.5, 0.0, 0.0)
    positions.getValueRef(1).set(gridSize * 0.5, 0.0, 0.0)
    const gridXAxisMaterial = new Material('gridXAxisMaterial', 'LinesShader')
    gridXAxisMaterial.getParameter('BaseColor').setValue(new Color(gridColor.luminance(), 0, 0))
    this.addChild(new GeomItem('xAxisLine', axisLine, gridXAxisMaterial), false)
    const gridZAxisMaterial = new Material('gridZAxisMaterial', 'LinesShader')
    gridZAxisMaterial.getParameter('BaseColor').setValue(new Color(0, gridColor.luminance(), 0))
    const geomOffset = new Xfo()
    geomOffset.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    const zAxisLineItem = new GeomItem('yAxisLine', axisLine, gridZAxisMaterial)
    zAxisLineItem.setGeomOffsetXfo(geomOffset)
    this.addChild(zAxisLineItem, false)
    this.setSelectable(false, true)
    const bBox = this._cleanBoundingBox(this.__boundingBoxParam.getValue())
    this.__boundingBoxParam.setValue(bBox)
  }

  /**
   *
   * @private
   * @param {Box3} bBox
   * @return {Box3} - Reset Bounding Box
   */
  _cleanBoundingBox(bBox) {
    bBox.reset()
    return bBox
  }
}

sgFactory.registerClass('GridTreeItem', GridTreeItem)

export { GridTreeItem }
