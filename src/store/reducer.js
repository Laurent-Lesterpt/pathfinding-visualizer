const initialState = {
  age: 21,
  grid: []
}
const START_NODE_ROW = 10
const START_NODE_COL = 10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 15

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'ageUp':
      newState.age += action.value
      break

    case 'ageDown':
      newState.age -= action.value
      break

    case 'getInitialGrid':
      newState.grid = getInitialGrid()
      break

    case 'getNewGridWithWallToggled':
      newState.grid = getNewGridWithWallToggled(newState.grid, action.row, action.col)
      break
    default:
      break
  }

  return newState
}

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    const currentRow = []
    for (let col = 0; col < 25; col++) {
      currentRow.push(createNode(row, col))
    }
    grid.push(currentRow)
  }
  return grid
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
  const newNode = {
    ...node,
    isWall: !node.isWall
  }
  newGrid[row][col] = newNode
  return newGrid
}

export default reducer
