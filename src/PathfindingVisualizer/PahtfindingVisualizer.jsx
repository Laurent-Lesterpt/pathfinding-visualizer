import React, {Component} from 'react'
import Node from './Node/Node'
import {dijkstra} from '../algorithms/dijkstra'
import {getNodesInShortestPathOrder} from '../algorithms/commonalities'
import {astar} from '../algorithms/astar'
import {connect} from 'react-redux'

import './PathfindingVisualizer.css'

const START_NODE_ROW = 10
const START_NODE_COL = 10
const FINISH_NODE_ROW = 10
const FINISH_NODE_COL = 15

class PathfindingVisualizer extends Component {
  constructor() {
    super()
    this.state = {
      mouseIsPressed: false
    }
  }

  componentDidMount() {
    this.props.getInitialGrid()
  }

  handleMouseDown(row, col) {
    const newGrid = this.props.getNewGridWithWallToggled(this.props.grid, row, col)
    this.setState({grid: newGrid, mouseIsPressed: true})
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return
    const newGrid = this.props.getNewGridWithWallToggled(this.props.grid, row, col)
    this.setState({grid: newGrid})
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false})
  }

  animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder) {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      setTimeout(() => {
        const node = visitedNodesInOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-visited'
      }, 10 * i)
    }
    setTimeout(() => {
      this.animateShortestPath(nodesInShortestPathOrder)
    }, 10 * visitedNodesInOrder.length)
  }

  animateShortestPath(nodesInShortestPathOrder) {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const node = nodesInShortestPathOrder[i]
        document.getElementById(`node-${node.row}-${node.col}`).className = 'node node-shortest-path'
      }, 50 * i)
    }
  }

  visualizeDijkstra() {
    const {grid} = this.state
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = dijkstra(grid, startNode, finishNode)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  visualizeAstar() {
    const {grid} = this.state
    const startNode = grid[START_NODE_ROW][START_NODE_COL]
    const finishNode = grid[FINISH_NODE_ROW][FINISH_NODE_COL]
    const visitedNodesInOrder = astar(grid, startNode, finishNode)
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(finishNode)
    this.animateAlgo(visitedNodesInOrder, nodesInShortestPathOrder)
  }

  render() {
    const {mouseIsPressed} = this.state

    return (
      <>
        <div classame="navbar-buttons">
          <button className="visualize-dijkstra" onClick={() => this.visualizeDijkstra()}>
            Visualize Dijkstra's Algorithm
          </button>
          <button className="visualize-astar" onClick={() => this.visualizeAstar()}>
            Visualize A* Algorithm
          </button>
        </div>
        <div className="grid">
          {this.props.grid.map((row, rowIdx) => {
            return (
              <div key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={mouseIsPressed}
                      onMouseDown={(row, col) => this.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.handleMouseEnter(row, col)}
                      onMouseUp={() => this.handleMouseUp()}
                      row={row}
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

const mapStateToProps = state => {
  return {
    age: state.age,
    grid: state.grid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAgeUp: () => dispatch({type: 'ageUp', value: 1}),
    onAgeDown: () => dispatch({type: 'ageDown', value: 1}),
    getInitialGrid: () => dispatch({type: 'getInitialGrid'}),
    getNewGridWithWallToggled: () => dispatch({type: 'getNewGridWithWallToggled'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
