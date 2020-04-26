import React, {Component} from 'react'
import Node from './Node/Node'
import Tutorial from '../Tutorial/Tutorial'
import {connect} from 'react-redux'
import './PathfindingVisualizer.css'

class PathfindingVisualizer extends Component {
  componentDidMount() {
    this.props.getInitialGrid()
  }

  render() {
    return (
    <>      
      <Tutorial/>      
        <div className="grid">
          {this.props.grid.map((row, rowIdx) => {
            return (
              <div className="grid-row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isFinishDragged, isStart, isStartDragged, isWall} = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isFinishDragged={isFinishDragged}
                      isStart={isStart}
                      isStartDragged={isStartDragged}
                      isWall={isWall}
                      mouseIsPressed={this.props.mouseIsPressed}
                      onMouseDown={(row, col) => this.props.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.props.handleMouseEnter(row, col)}
                      onMouseUp={() => this.props.handleMouseUp(row, col)}
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
    grid: state.gridReducer.grid,
    mouseIsPressed: state.gridReducer.mouseIsPressed,
    currentPage: state.tutorialReducer.currentPage,
    nbPages: state.tutorialReducer.nbPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialGrid: () => dispatch({type: 'getInitialGrid'}),
    skipTutorial: () => dispatch({type: 'skipTutorial'}),
    nextPage: () => dispatch({type: 'nextPage'}),
    previousPage: () => dispatch({type: 'previousPage'}),
    handleMouseDown: (row, col) => dispatch({type: 'handleMouseDown', row: row, col: col}),
    handleMouseEnter: (row, col) => dispatch({type: 'handleMouseEnter', row: row, col: col}),
    handleMouseUp: (row, col) => dispatch({type: 'handleMouseUp', row: row, col: col})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
