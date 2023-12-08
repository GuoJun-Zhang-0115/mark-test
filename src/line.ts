import Konva from 'konva'

export function initLine() {
  function onDown(pos: Konva.Vector2d, layer: Konva.Layer) {
    const lastLine = new Konva.Line({
      stroke: 'red',
      strokeWidth: 5,
      globalCompositeOperation: 'source-over',
      // round cap for smoother lines
      lineCap: 'round',
      lineJoin: 'round',
      // add point twice, so we have some drawings even on a simple click
      points: [pos.x, pos.y, pos.x, pos.y],
    })
    layer.add(lastLine)
    return lastLine
  }

  function onMove(lastLine: Konva.Line, pos: Konva.Vector2d) {
    const newPoints = lastLine.points().concat([pos.x, pos.y])
    lastLine.points(newPoints)
  }

  return { onDown, onMove }
}
