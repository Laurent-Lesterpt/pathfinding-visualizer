import {dijkstra} from '../algorithms/dijkstra'
import {getNodesInShortestPathOrder} from '../algorithms/commonalities'
import {astar} from '../algorithms/astar'
import {greedyAstar} from '../algorithms/greedyAstar'

const initialState = {
  grid: [],
  mouseIsPressed: false,
  startIsDragged: false,
  finishIsDragged: false
}
var START_NODE_ROW = 10
var PREVIOUS_START_NODE_ROW = 10
var START_NODE_COL = 5
var PREVIOUS_START_NODE_COL = 5
var FINISH_NODE_ROW = 10
var PREVIOUS_FINISH_NODE_ROW = 10
var FINISH_NODE_COL = 20
var PREVIOUS_FINISH_NODE_COL = 20
const ROWS_NB = 20
const COLS_NB = 25

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'clearGrid':
      newState.grid = clearGrid()
      break

    case 'clearPath':
      newState.grid = clearPath(newState.grid)
      break

    case 'getInitialGrid':
      newState.grid = getInitialGrid()
      break

    case 'handleMouseDown':
      newState.mouseIsPressed = true
      const stateAfterDrag = getNewStateWithStartOrFinishDragged(
        newState.grid,
        action.row,
        action.col,
        newState.startIsDragged,
        newState.finishIsDragged
      )
      newState.grid = stateAfterDrag.grid
      newState.startIsDragged = stateAfterDrag.startIsDragged
      newState.finishIsDragged = stateAfterDrag.finishIsDragged
      newState.grid = getNewGridWithWallToggled(
        newState.grid,
        action.row,
        action.col,
        newState.startIsDragged,
        newState.finishIsDragged
      )
      break

    case 'handleMouseEnter':
      if (newState.mouseIsPressed === false) break
      const stateAfterDragEnter = getNewStateWithStartOrFinishDragged(
        newState.grid,
        action.row,
        action.col,
        newState.startIsDragged,
        newState.finishIsDragged
      )
      newState.grid = stateAfterDragEnter.grid
      newState.startIsDragged = stateAfterDragEnter.startIsDragged
      newState.finishIsDragged = stateAfterDragEnter.finishIsDragged
      newState.grid = getNewGridWithWallToggled(
        newState.grid,
        action.row,
        action.col,
        newState.startIsDragged,
        newState.finishIsDragged
      )
      break

    case 'handleMouseUp':
      newState.mouseIsPressed = false
      newState.grid = getNewGridWithStartOrFinishDropped(
        newState.grid,
        action.row,
        action.col,
        newState.startIsDragged,
        newState.finishIsDragged
      )
      newState.startIsDragged = false
      newState.finishIsDragged = false
      setToNormalNodes('node-start-dragged')
      setToNormalNodes('node-finish-dragged')
      break

    case 'visualizeAstar':
      newState.grid = clearPath(newState.grid)
      visualize(newState.grid, astar)
      break

    case 'visualizeDijkstra':
      newState.grid = clearPath(newState.grid)
      visualize(newState.grid, dijkstra)
      break

    case 'visualizeGreedyAstar':
      newState.grid = clearPath(newState.grid)
      visualize(newState.grid, greedyAstar)
      break

    default:
      break
  }

  return newState
}

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < ROWS_NB; row++) {
    const currentRow = []
    for (let col = 0; col < COLS_NB; col++) {
      currentRow.push(createNode(row, col))
    }
    grid.push(currentRow)
  }
  return grid
}

const setToNormalNodes = className => {
  const elements = Array.from(document.getElementsByClassName(className))
  elements.forEach(element => {
    element.className = 'node'
  })
}

const clearGrid = () => {
  for (let row = 0; row < ROWS_NB; row++) {
    for (let col = 0; col < COLS_NB; col++) {
      document.getElementById(`node-${row}-${col}`).className = 'node'
    }
  }
  document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start'
  document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish'
  return getInitialGrid()
}

const clearPath = grid => {
  const newGrid = grid.slice()
  for (let row = 0; row < ROWS_NB; row++) {
    for (let col = 0; col < COLS_NB; col++) {
      if (grid[row][col].isWall) {
        document.getElementById(`node-${row}-${col}`).className = 'node node-wall'
        newGrid[row][col] = createNode(row, col)
        newGrid[row][col].isWall = true
      } else {
        document.getElementById(`node-${row}-${col}`).className = 'node'
        newGrid[row][col] = createNode(row, col)
      }
    }
  }
  document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start'
  document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish'
  return newGrid
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    cost: Infinity,
    heuristic: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null,
    isStartDragged: false,
    isFinishDragged: false
  }
}

const getNewGridWithWallToggled = (grid, row, col, startIsDragged, finishIsDragged) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  if (node.isStart || node.isFinish || startIsDragged || finishIsDragged) return newGrid
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  newGrid[row][col] = newNode
  return newGrid
}

const getNewStateWithStartOrFinishDragged = (grid, row, col, startIsDragged, finishIsDragged) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  var newStartIsDragged = false
  var newFinishIsDragged = false

  if (node.isStart) {
    const newNode = {
      ...node,
      isStartDragged: true
    }
    newGrid[row][col] = newNode
    newStartIsDragged = true
    PREVIOUS_START_NODE_ROW = row
    PREVIOUS_START_NODE_COL = col
  }
  if (!node.isStart && startIsDragged) {
    newGrid[PREVIOUS_START_NODE_ROW][PREVIOUS_START_NODE_COL].isStartDragged = false
    const newNode = {
      ...node,
      isStartDragged: true
    }
    newGrid[row][col] = newNode
    newStartIsDragged = true
    PREVIOUS_START_NODE_ROW = row
    PREVIOUS_START_NODE_COL = col
  }
  if (node.isFinish) {
    const newNode = {
      ...node,
      isFinishDragged: true
    }
    newGrid[row][col] = newNode
    newFinishIsDragged = true
    PREVIOUS_FINISH_NODE_ROW = row
    PREVIOUS_FINISH_NODE_COL = col
  }
  if (!node.isFinish && finishIsDragged) {
    newGrid[PREVIOUS_FINISH_NODE_ROW][PREVIOUS_FINISH_NODE_COL].isFinishDragged = false
    const newNode = {
      ...node,
      isFinishDragged: true
    }
    newGrid[row][col] = newNode
    newFinishIsDragged = true
    PREVIOUS_FINISH_NODE_ROW = row
    PREVIOUS_FINISH_NODE_COL = col
  }

  if (!node.isStart && !node.isFinish) {
    return {grid: newGrid, startIsDragged: newStartIsDragged, finishIsDragged: newFinishIsDragged}
  }
  return {grid: newGrid, startIsDragged: newStartIsDragged, finishIsDragged: newFinishIsDragged}
}

const getNewGridWithStartOrFinishDropped = (grid, row, col, startIsDragged, finishIsDragged) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  if (!startIsDragged && !finishIsDragged) return newGrid
  if (startIsDragged) {
    const newNode = {
      ...node,
      isStart: true,
      isStartDragged: false
    }
    newGrid[row][col] = newNode
    START_NODE_COL = col
    START_NODE_ROW = row
  }
  if (finishIsDragged) {
    const newNode = {
      ...node,
      isFinish: true,
      isFinishDragged: false
    }
    newGrid[row][col] = newNode
    FINISH_NODE_COL = col
    FINISH_NODE_ROW = row
  }
  return newGrid
}

const animateAlgo = (visitedNodesInOrder, nodesInShortestPathOrder) => {
  for (let i = 0; i < visitedNodesInOrder.length; i++) {
    setTimeout(() => {
      const node = visitedNodesInOrder[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
    }, 10 * i)
  }
  setTimeout(() => {
    animateShortestPath(nodesInShortestPathOrder)
  }, 10 * visitedNodesInOrder.length)
}

const animateShortestPath = nodesInShortestPathOrder => {
  for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
    setTimeout(() => {
      const node = nodesInShortestPathOrder[i]
      document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
    }, 50 * i)
  }
}

const visualize = (grid, algo) => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL]
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
  const visitedNodesInOrder = algo(grid, startNode, finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
}

export default reducer
