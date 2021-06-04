import { Color, Xfo, Vec3 } from '../Math/index'
import { TreeItem } from './TreeItem'
import { Material } from './Material'
import { GeomItem } from './GeomItem'
import { Grid } from './Geometry/Shapes/Grid'
import { Lines } from './Geometry/Lines'
import { Registry } from '../Registry'

/**
 * The GridTreeItem displays a grid of a given size and resolution. The Grid is oriented on the XY plane
 * and highlights the X and Y axes with Red and Green lines. Grids are useful in displaying scene scale and coordinate system.
 * The Grid geometry does not return a bounding box and so does not effect the bounding of the scene.
 *
 * @extends {TreeItem}
 */
class GridTreeItem extends TreeItem {
  /**
   * Creates an instance of GridTree.
   *
   * @param {number} [gridSize=5]
   * @param {number} [resolution=50]
   * @param {string} [gridColor=new Color('#DCDCDC')]
   */
  constructor(gridSize = 5, resolution = 50, gridColor = new Color('#DCDCDC')) {
    super('GridTree')

    this.setSelectable(false)

    const gridMaterial = new Material('gridMaterial', 'LinesShader')
    gridMaterial.getParameter('BaseColor').setValue(gridColor)
    gridMaterial.getParameter('Overlay').setValue(0.0)
    gridMaterial.getParameter('StippleValue').setValue(0)
    gridMaterial.getParameter('OccludedStippleValue').setValue(1)

    const grid = new Grid(gridSize, gridSize, resolution, resolution, true)
    const gridItem = new GeomItem('GridItem', grid, gridMaterial)
    this.addChild(gridItem, false)
    const axisLine = new Lines()
    axisLine.setNumVertices(2)
    axisLine.setNumSegments(1)
    axisLine.setSegmentVertexIndices(0, 0, 1)
    const positions = axisLine.getVertexAttribute('positions')
    positions.getValueRef(0).set(gridSize * -0.5, 0.0, 0.0)
    positions.getValueRef(1).set(gridSize * 0.5, 0.0, 0.0)

    const gridXAxisMaterial = new Material('gridXAxisMaterial', 'LinesShader')
    gridXAxisMaterial.getParameter('BaseColor').setValue(new Color(gridColor.luminance(), 0, 0))
    gridXAxisMaterial.getParameter('Overlay').setValue(0.0)
    gridXAxisMaterial.getParameter('StippleValue').setValue(0)
    gridXAxisMaterial.getParameter('OccludedStippleValue').setValue(1)
    const gridXAxis = new GeomItem('xAxisLine', axisLine, gridXAxisMaterial)
    this.addChild(gridXAxis, false)

    const gridYAxisMaterial = new Material('gridYAxisMaterial', 'LinesShader')
    gridYAxisMaterial.getParameter('BaseColor').setValue(new Color(0, gridColor.luminance(), 0))
    gridYAxisMaterial.getParameter('Overlay').setValue(0.0)
    gridYAxisMaterial.getParameter('StippleValue').setValue(0)
    gridYAxisMaterial.getParameter('OccludedStippleValue').setValue(1)
    const zAxisLineItem = new GeomItem('yAxisLine', axisLine, gridYAxisMaterial)

    const geomOffset = new Xfo()
    geomOffset.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    zAxisLineItem.setGeomOffsetXfo(geomOffset)
    this.addChild(zAxisLineItem, false)

    this.setSelectable(false)
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

Registry.register('GridTreeItem', GridTreeItem)

export { GridTreeItem }
