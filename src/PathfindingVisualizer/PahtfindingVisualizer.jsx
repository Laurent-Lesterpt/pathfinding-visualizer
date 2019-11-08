import React, {Component} from 'react'
import Node from './Node/Node'
import {connect} from 'react-redux'
import pathfindingImage from '../res/pathFinding.png'
import createWalls from '../res/createWalls.gif'
import algoVisualization from '../res/algo.gif'
import tutorialImage from '../res/tutorial.png'
import endImage from '../res/theEnd.png'
import './PathfindingVisualizer.css'

class PathfindingVisualizer extends Component {
  componentDidMount() {
    this.props.getInitialGrid()
  }

  render() {
    return (
      <>
        <div id="tutorial">
          {this.props.currentPage === 1 ? (
            <>
              <h3>Welcome to Pathfinding Visualizer!</h3>
              <h6>This tutorial will walk you through all of the features of this application.</h6>
              <p>
                If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press
                "Next"!
              </p>
              <img id="mainImage" src={tutorialImage} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 2 ? (
            <>
              <h3>What is a pathfinding algorithm?</h3>
              <h6>
                A pathfinding algorithm seeks to find the shortest path between two points A and B. This application
                shows various pathfinding algorithms in action
              </h6>
              <p>All of the algorithms on this application are adapted for a 2D grid</p>
              <img id="mainImage" src={pathfindingImage} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 3 ? (
            <>
              <h3>Adding walls </h3>
              <h6> You can toggle walls by holding left click on a node </h6>
              <p>You can hold click and drag in order not to click on each node </p>
              <img id="mainImage" src={createWalls} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 4 ? (
            <>
              <h3>Visualizing pathfinding algorithm</h3>
              <h6>
                You can visualize a pathfinding algorithm by clicking on "Algorithms" in the top bar and then clicking
                on an algorithm
              </h6>
              <p>
                The light blue tiles are the tiles visited by the algorithm, the yellow tiles are the path found by the
                algorithm
              </p>
              <img id="mainImage" src={algoVisualization} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 5 ? (
            <>
              <h3>This is the end of the tutorial !</h3>
              <h6>Please click "Skip tutorial" and start using the visualization tool</h6>
              <p></p>
              <img id="mainImage" src={endImage} alt="pathfindingImage" />
            </>
          ) : null}
          <div id="tutorialCounter">
            {this.props.currentPage}/{this.props.nbPages}
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
              <div className="grid-row" key={rowIdx}>
                {row.map((node, nodeIdx) => {
                  const {row, col, isFinish, isStart, isWall} = node
                  return (
                    <Node
                      key={nodeIdx}
                      col={col}
                      isFinish={isFinish}
                      isStart={isStart}
                      isWall={isWall}
                      mouseIsPressed={this.props.mouseIsPressed}
                      onMouseDown={(row, col) => this.props.handleMouseDown(row, col)}
                      onMouseEnter={(row, col) => this.props.handleMouseEnter(row, col)}
                      onMouseUp={() => this.props.handleMouseUp()}
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
    getNewGridWithWallToggled: (row, col) => dispatch({type: 'getNewGridWithWallToggled', row: row, col: col}),
    skipTutorial: () => dispatch({type: 'skipTutorial'}),
    nextPage: () => dispatch({type: 'nextPage'}),
    previousPage: () => dispatch({type: 'previousPage'}),
    handleMouseDown: (row, col) => dispatch({type: 'handleMouseDown', row: row, col: col}),
    handleMouseEnter: (row, col) => dispatch({type: 'handleMouseEnter', row: row, col: col}),
    handleMouseUp: () => dispatch({type: 'handleMouseUp'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PathfindingVisualizer)
