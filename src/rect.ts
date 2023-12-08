import Konva from 'konva'

export function initRect() {
  function onDown(pos: Konva.Vector2d, layer: Konva.Layer) {
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

  function onMove(rect: Konva.Rect, pos: Konva.Vector2d) {
    const x = rect.getAttr('x')
    const y = rect.getAttr('y')
    rect.setAttr('width', pos.x - x)
    rect.setAttr('height', pos.y - y)
  }

  return { onDown, onMove }
}
