import Konva from 'konva'
import { Layer } from 'konva/lib/Layer'
import { Line } from 'konva/lib/shapes/Line'
import { Vector2d } from 'konva/lib/types'

export function initLine() {
  function onDown(pos: Vector2d, layer: Layer) {
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

  function onMove(lastLine: Line, pos: Vector2d) {
    const newPoints = lastLine.points().concat([pos.x, pos.y])
    lastLine.points(newPoints)
  }

  return { onDown, onMove }
}
