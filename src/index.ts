import Konva from 'konva'
import { initLine } from './line'
import { initRect } from './rect'
import { Vector2d } from 'konva/lib/types'
import { Layer } from 'konva/lib/Layer'
import { Stage } from 'konva/lib/Stage'

const width = document.body.offsetWidth
const height = document.body.offsetHeight - 50

const { onDown: onLineDown, onMove: onLineMove } = initLine()
const { onDown: onRectDown, onMove: onRectMove } = initRect()

const menuDiv = document.getElementById('menu')!

let onDown: (pos: Vector2d, layer: Layer) => any
let onMove: (shape: any, pos: Vector2d) => void
resetDwonAndMove()

let selectType = ''
menuDiv.addEventListener('click', (e) => {
  const target = e.target as HTMLElement
  selectType = target.id
  switch (selectType) {
    case 'select':
      resetDwonAndMove()
      setDraggable(true)
      break
    case 'line':
      onDown = onLineDown
      onMove = onLineMove
      setDraggable(false)
      break
    case 'rect':
      onDown = onRectDown
      onMove = onRectMove
      setDraggable(false)
      break
    case 'toJson':
      console.log(stage.toJSON())
      resetDwonAndMove()
      setDraggable(false)
      break
    default:
      break
  }
  Array.from(menuDiv.children).forEach((element) => {
    element.className = ''
    if (element.id === selectType) {
      element.className = 'active'
    }
  })
})

function resetDwonAndMove() {
  onDown = () => {}
  onMove = () => {}
}

// first we need Konva core things: stage and layer
const stage = new Konva.Stage({
  container: 'container',
  width: width,
  height: height,
})

const layer = new Konva.Layer()
stage.add(layer)

function setDraggable(status: boolean) {
  layer.getChildren().forEach((child) => {
    child.setAttr('draggable', status)
  })
}

let isPaint = false
let activeObj

stage.on('mousedown touchstart', function (e) {
  isPaint = true
  const pos = stage.getPointerPosition()!
  activeObj = onDown(pos, layer)
})

stage.on('mouseup touchend', function () {
  isPaint = false
})

// and core function - drawing
stage.on('mousemove touchmove', function (e) {
  if (!isPaint) {
    return
  }
  const pos = stage.getPointerPosition()!
  onMove(activeObj, pos)
})

stage.on('pointermove', function (e) {
  if (selectType === 'select') {
    if (e.target instanceof Stage) {
      document.body.style.cursor = 'default'
    } else {
      document.body.style.cursor = 'pointer'
    }
  }
})
