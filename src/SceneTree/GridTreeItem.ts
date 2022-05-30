import { Color, Xfo, Vec3, Box3 } from '../Math/index'
import { TreeItem } from './TreeItem'
import { Material } from './Material'
import { GeomItem } from './GeomItem'
import { Grid } from './Geometry/Shapes/Grid'
import { Lines } from './Geometry/Lines'
import { Registry } from '../Registry'
import { Vec3Attribute } from './Geometry/Vec3Attribute'
import { LinesMaterial } from './Materials'

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
   * @param gridSize
   * @param resolution
   * @param gridColor
   */
  constructor(gridSize = 5, resolution = 50, gridColor = new Color('#DCDCDC')) {
    super('GridTree')

    this.disableBoundingBox = true
    this.setSelectable(false)

    const gridMaterial = new LinesMaterial('gridMaterial')
    gridMaterial.baseColorParam.value = gridColor
    gridMaterial.overlayParam.value = 0.0

    const grid = new Grid(gridSize, gridSize, resolution, resolution, true)
    const gridItem = new GeomItem('GridItem', grid, gridMaterial)
    gridItem.setSelectable(false)
    this.addChild(gridItem, false)
    const axisLine = new Lines()
    axisLine.setNumVertices(2)
    axisLine.setNumSegments(1)
    axisLine.setSegmentVertexIndices(0, 0, 1)
    const positions = <Vec3Attribute>axisLine.getVertexAttribute('positions')
    positions.setValue(0, new Vec3(gridSize * -0.5, 0.0, 0.0))
    positions.setValue(1, new Vec3(gridSize * 0.5, 0.0, 0.0))

    const gridXAxisMaterial = new LinesMaterial('gridXAxisMaterial')
    gridXAxisMaterial.baseColorParam.value = new Color(gridColor.luminance(), 0, 0)
    gridXAxisMaterial.overlayParam.value = 0.0
    const gridXAxis = new GeomItem('xAxisLine', axisLine, gridXAxisMaterial)
    gridXAxis.setSelectable(false)
    this.addChild(gridXAxis, false)

    const gridYAxisMaterial = new LinesMaterial('gridYAxisMaterial')
    gridYAxisMaterial.baseColorParam.value = new Color(0, gridColor.luminance(), 0)
    gridYAxisMaterial.overlayParam.value = 0.0

    const zAxisLineItem = new GeomItem('yAxisLine', axisLine, gridYAxisMaterial)
    zAxisLineItem.setSelectable(false)

    const geomOffset = new Xfo()
    geomOffset.ori.setFromAxisAndAngle(new Vec3(0, 0, 1), Math.PI * 0.5)
    zAxisLineItem.geomOffsetXfoParam.value = geomOffset
    this.addChild(zAxisLineItem, false)
  }

  /**
   * @private
   * @return - Reset Bounding Box
   */
  _cleanBoundingBox(): Box3 {
    return new Box3()
  }
}

Registry.register('GridTreeItem', GridTreeItem)

export { GridTreeItem }
