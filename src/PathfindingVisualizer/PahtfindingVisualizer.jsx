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
          <h3>Welcome to Pathfinding Visualizer!</h3>
          <h6>This short tutorial will walk you through all of the features of this application.</h6>
          <p>
            If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press "Next"!
          </p>
          <div id="tutorialCounter">1/9</div>
          <img id="mainTutorialImage" src="" />
          <button id="nextButton" class="btn btn-default navbar-btn" type="button">
            Next
          </button>
          <button id="previousButton" class="btn btn-default navbar-btn" type="button">
            Previous
          </button>
          <button
            id="skipButton"
            class="btn btn-default navbar-btn"
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
    grid: state.gridReducer.grid
  }
}

const mapDispatchToProps = dispatch => {
  return {
    getInitialGrid: () => dispatch({type: 'getInitialGrid'}),
    getNewGridWithWallToggled: (row, col) => dispatch({type: 'getNewGridWithWallToggled', row: row, col: col}),
    skipTutorial: () => dispatch({type: 'skipTutorial'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
