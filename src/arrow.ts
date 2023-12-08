import Konva from 'konva'

export function initArrow() {
  function onDown(pos: Konva.Vector2d, layer: Konva.Layer) {
    const rect = new Konva.Arrow({
      x: pos.x,
      y: pos.y,
      points: [0, 0, 0, 0],
      pointerLength: 25,
      pointerWidth: 25,
      fill: 'red',
      stroke: 'red',
      strokeWidth: 10,
    })
    layer.add(rect)
    return rect
  }

  function onMove(arrow: Konva.Arrow, pos: Konva.Vector2d) {
    const x = arrow.getAttr('x')
    const y = arrow.getAttr('y')

    arrow.setAttr('points', [0, 0, pos.x - x, pos.y - y])
  }

  return { onDown, onMove }
}
