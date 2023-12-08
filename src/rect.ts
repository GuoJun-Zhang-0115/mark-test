import Konva from 'konva'
import { Layer } from 'konva/lib/Layer'
import { Rect } from 'konva/lib/shapes/Rect'
import { Vector2d } from 'konva/lib/types'

export function initRect() {
  function onDown(pos: Vector2d, layer: Layer) {
    const rect = new Konva.Rect({
      x: pos.x,
      y: pos.y,
      width: 0,
      height: 0,
      stroke: 'red',
      strokeWidth: 4,
      // draggable: true,
    })
    layer.add(rect)
    return rect
  }

  function onMove(rect: Rect, pos: Vector2d) {
    const x = rect.getAttr('x')
    const y = rect.getAttr('y')
    rect.setAttr('width', pos.x - x)
    rect.setAttr('height', pos.y - y)
  }

  return { onDown, onMove }
}
