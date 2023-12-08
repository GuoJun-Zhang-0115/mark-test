import Konva from 'konva'

export function initEllipse() {
  function onDown(pos: Konva.Vector2d, layer: Konva.Layer) {
    const rect = new Konva.Ellipse({
      x: pos.x,
      y: pos.y,
      radiusX: 0,
      radiusY: 0,
      stroke: 'red',
      strokeWidth: 4,
    })
    layer.add(rect)
    return rect
  }

  function onMove(ellipse: Konva.Ellipse, pos: Konva.Vector2d) {
    const x = ellipse.getAttr('x')
    const y = ellipse.getAttr('y')

    pos.x - x >= 0 && ellipse.setAttr('radiusX', pos.x - x)
    pos.y - y >= 0 && ellipse.setAttr('radiusY', pos.y - y)
  }

  return { onDown, onMove }
}
