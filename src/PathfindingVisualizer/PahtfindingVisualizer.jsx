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
        <div id="tutorial">
          <div id="movingPart">
            <h3>Welcome to Pathfinding Visualizer!</h3>
            <h6>This short tutorial will walk you through all of the features of this application.</h6>
            <p>
              If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press
              "Next"!
            </p>
            <div id="tutorialCounter">
              {this.props.currentPage}/{this.props.nbPages}
            </div>
            <img id="mainTutorialImage" src="" alt="" />
          </div>
          <button
            id="nextButton"
            className="btn btn-default navbar-btn"
            type="button"
            onClick={() => this.props.nextPage()}
          >
            Next
          </button>
          <button
            id="previousButton"
            className="btn btn-default navbar-btn"
            type="button"
            onClick={() => this.props.previousPage()}
          >
            Previous
          </button>
          <button
            id="skipButton"
            className="btn btn-default navbar-btn"
            type="button"
            onClick={() => this.props.skipTutorial()}
          >
            Skip Tutorial
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
    grid: state.gridReducer.grid,
    currentPage: state.tutorialReducer.currentPage,
    nbPages: state.tutorialReducer.nbPages
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialGrid: () => dispatch({type: 'getInitialGrid'}),
    getNewGridWithWallToggled: (row, col) => dispatch({type: 'getNewGridWithWallToggled', row: row, col: col}),
    skipTutorial: () => dispatch({type: 'skipTutorial'}),
    nextPage: () => dispatch({type: 'nextPage'}),
    previousPage: () => dispatch({type: 'previousPage'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
