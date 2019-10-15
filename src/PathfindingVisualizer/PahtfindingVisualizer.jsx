import React, {Component} from 'react'
import Node from './Node/Node'
import {dijkstra, getNodesInShortestPathOrder} from '../algorithms/dijkstra'

import './PathfindingVisualizer.css'

const START_NODE_ROW = 10
const START_NODE_COL = 10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 15

export default class PathfindingVisualizer extends Component {
  constructor(props) {
    super(props)
    this.state = {
      grid: []
    }
  }

  componentDidMount() {
    const grid = getInitialGrid()
    this.setState({grid})
  }

  animateDijkstra(visitedNodesInOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        const newGrid = this.state.grid.slice()
        const newNode = {
          ...node,
          isVisited: true
        }
        newGrid[node.row][node.col] = newNode
        this.setState({grid: newGrid})
      }, 50 * i)
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
    this.animateDijkstra(visitedNodesInOrder)
  }

  render() {
    const {grid} = this.state
    return (
      <>
        <button onClick={() => this.visualizeDijkstra()}> Visualize dijkstra </button>
        <div className="grid">
          {grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isStart, isFinish, isVisited} = node
                  return (
                    <Node
                      key={nodeIdx}
                      row={row}
                      col={col}
                      isStart={isStart}
                      isFinish={isFinish}
                      isVisited={isVisited}
                    ></Node>
                  )
                })}
              </div>
            )
          })}
        </div>
      </>
    )
  }
}

const getInitialGrid = () => {
  const grid = []
  for (let row = 0; row < 20; row++) {
    const currentRow = []
    for (let col = 0; col < 20; col++) {
      const currentNode = createNode(col, row)
      currentRow.push(currentNode)
    }
    grid.push(currentRow)
  }
  return grid
}

const createNode = (col, row) => {
  return {
    col,
    row,
    isStart: row === START_NODE_ROW && col === START_NODE_COL,
    isFinish: row === FINISH_NODE_ROW && col === FINISH_NODE_COL,
    distance: Infinity,
    isVisited: false,
    previousNode: null
  }
}
