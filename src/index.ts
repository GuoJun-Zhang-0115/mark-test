import Konva from 'konva'
import { initLine } from './line'
import { initRect } from './rect'
import { redo, saveUndo, undo } from './undo_redo'
import { initEllipse } from './ellipse'
import { initArrow } from './arrow'

const width = document.body.offsetWidth
const height = document.body.offsetHeight - 120

const { onDown: onLineDown, onMove: onLineMove } = initLine()
const { onDown: onRectDown, onMove: onRectMove } = initRect()
const { onDown: onEllipseDown, onMove: onEllipseMove } = initEllipse()
const { onDown: onArrowDown, onMove: onArrowMove } = initArrow()

const menuDiv = document.getElementById('menu')!

let onDown: (pos: Konva.Vector2d, layer: Konva.Layer) => any
let onMove: (shape: any, pos: Konva.Vector2d) => void
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
    case 'ellipse':
      onDown = onEllipseDown
      onMove = onEllipseMove
      setDraggable(false)
      break
    case 'arrow':
      onDown = onArrowDown
      onMove = onArrowMove
      setDraggable(false)
      break

    case 'toJson':
      console.log(stage.toJSON())
      resetDwonAndMove()
      setDraggable(false)
      break
    case 'undo':
      stage = undo()
      if (stage) {
        const result1 = initStage(stage)
        layer = result1.layer
        setDraggable(false)
        resetDwonAndMove()
      }
      break
    case 'redo':
      stage = redo()
      if (stage) {
        const result = initStage(stage)
        layer = result.layer
        setDraggable(false)
        resetDwonAndMove()
      }
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

let { stage, layer } = initStage()
saveUndo(stage) // 首次初始化保存

function setDraggable(status: boolean) {
  layer.getChildren().forEach((child) => {
    child.setAttr('draggable', status)
  })
}

function initStage(_stage?: Konva.Stage) {
  let stage =
    _stage ||
    new Konva.Stage({
      container: 'container',
      width: width,
      height: height,
    })
  let layer: Konva.Layer
  if (stage.getLayers().length > 0) {
    layer = stage.getLayers()[0]
  } else {
    layer = new Konva.Layer()
    stage.add(layer)
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
    if (!['undo', 'redo'].includes(selectType)) {
      saveUndo(stage)
    }
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
      if (e.target instanceof Konva.Stage) {
        document.body.style.cursor = 'default'
      } else {
        document.body.style.cursor = 'pointer'
      }
    }
  })

  return { stage, layer }
}
