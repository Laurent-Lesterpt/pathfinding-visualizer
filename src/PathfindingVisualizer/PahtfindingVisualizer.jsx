import React, {Component} from 'react'
import Node from './Node/Node'
import {connect} from 'react-redux'

import './PathfindingVisualizer.css'

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
    this.props.getNewGridWithWallToggled(row, col)
    this.setState({mouseIsPressed: true})
  }

  handleMouseEnter(row, col) {
    if (!this.state.mouseIsPressed) return
    this.props.getNewGridWithWallToggled(row, col)
  }

  handleMouseUp() {
    this.setState({mouseIsPressed: false})
  }

  render() {
    const {mouseIsPressed} = this.state

    return (
      <>
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
    grid: state.grid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialGrid: () => dispatch({type: 'getInitialGrid'}),
    getNewGridWithWallToggled: (row, col) => dispatch({type: 'getNewGridWithWallToggled', row: row, col: col})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
