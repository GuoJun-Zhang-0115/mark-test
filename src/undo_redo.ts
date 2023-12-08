import Konva from 'konva'
let appHistoryStep = -1
let appHistory: string[] = []

export function saveUndo(stage: Konva.Stage) {
  appHistory = appHistory.slice(0, appHistoryStep + 1)
  appHistory = appHistory.concat(stage.toJSON())
  appHistoryStep += 1
  console.log('save undo', appHistoryStep, appHistory)
}

export function undo() {
  if (appHistoryStep === 0) {
    return
  }
  appHistoryStep -= 1
  const json = appHistory[appHistoryStep]
  return create(json)
}

export function redo() {
  if (appHistoryStep === appHistory.length - 1) {
    return
  }
  appHistoryStep += 1
  const json = appHistory[appHistoryStep]
  return create(json)
}
function create(json: string) {
  return Konva.Node.create(json, 'container')
}
