import {dijkstra} from '../algorithms/dijkstra'
import {getNodesInShortestPathOrder} from '../algorithms/commonalities'
import {astar} from '../algorithms/astar'

const initialState = {
  grid: []
}
const START_NODE_ROW = 10
const START_NODE_COL = 10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 15
const ROWS_NB = 20
const COLS_NB = 25

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'getInitialGrid':
      newState.grid = getInitialGrid()
      break

    case 'getNewGridWithWallToggled':
      newState.grid = getNewGridWithWallToggled(newState.grid, action.row, action.col)
      break

    case 'visualizeDijkstra':
      visualizeDijkstra(newState.grid)
      break

    case 'visualizeAstar':
      visualizeAstar(newState.grid)
      break

    case 'clearBoard':
      newState.grid = clearBoard()
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

const clearBoard = () => {
  for (let row = 0; row < ROWS_NB; row++) {
    for (let col = 0; col < COLS_NB; col++) {
      document.getElementById(`node-${row}-${col}`).className = 'node'
    }
  }
  document.getElementById(`node-${START_NODE_ROW}-${START_NODE_COL}`).className = 'node node-start'
  document.getElementById(`node-${FINISH_NODE_ROW}-${FINISH_NODE_COL}`).className = 'node node-finish'
  return getInitialGrid()
}

const createNode = (row, col) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    cost: Infinity,
    isVisited: false,
    isWall: false,
    previousNode: null
  }
}

const getNewGridWithWallToggled = (grid, row, col) => {
  const newGrid = grid.slice()
  const node = newGrid[row][col]
  if (node.isStart || node.isFinish) return newGrid
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  newGrid[row][col] = newNode
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

const visualizeDijkstra = grid => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL]
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
  const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
}

const visualizeAstar = grid => {
  const startNode = grid[START_NODE_ROW][START_NODE_COL]
  const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
  const visitedNodesInOrder = astar(grid, startNode, finishNode)
  const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
}

export default reducer
