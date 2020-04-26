import pathfindingImage from '../../res/pathFinding.png'
import dragDrop from '../../res/drag_drop.gif'
import createWalls from '../../res/createWalls.gif'
import algoVisualization from '../../res/algo.gif'
import tutorialImage from '../../res/tutorial.png'
import endImage from '../../res/theEnd.png'
import React, {Component} from 'react'
import { connect } from 'react-redux'
import './Tutorial.css'

class Tutorial extends Component {
    render(){
        return(
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
              <h3>First, what is a pathfinding algorithm?</h3>
              <h6>
                A pathfinding algorithm seeks to find a path between two points A and B. <br />
                This application shows various pathfinding algorithms in action
              </h6>
              <p>All of the algorithms shown are adapted for a 2D grid</p>
              <img id="mainImage" src={pathfindingImage} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 3 ? (
            <>
              <h3>Second, what are the features of the application ?</h3>
              <h4>
                <ul>
                  <li>Moving the start and finish node by drag and drop</li>
                  <li>Adding walls</li>
                  <li>Visualizing pathfinding algorithms</li>
                  <li>Clearing the grid, leaves start and finish nodes (button)</li>
                  <li>Clearing the path, leaves start, finish and wall nodes (button)</li>
                </ul>
              </h4>
            </>
          ) : null}
          {this.props.currentPage === 4 ? (
            <>
              <h3>Moving the start and finish node by drag and drop</h3>
              <h6>Hold left click and drag your mouse to move the start or finish node</h6>
              <p>A lighter colored node is displayed during dragging to help position the node</p>
              <img id="mainImage" src={dragDrop} alt="dragDrop" />
            </>
          ) : null}
          {this.props.currentPage === 5 ? (
            <>
              <h3>Adding walls </h3>
              <h6>You can toggle walls by left clicking on a node </h6>
              <p>Hold click and drag your mouse to toggle walls on your path </p>
              <img id="mainImage" src={createWalls} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 6 ? (
            <>
              <h3>Visualizing a pathfinding algorithm</h3>
              <h6>Click on "Algorithms" in the top bar and then choose an algorithm</h6>
              <p>
                The light blue tiles are visited by the algorithm, the yellow tiles are the path found by the algorithm
              </p>
              <img id="mainImage" src={algoVisualization} alt="pathfindingImage" />
            </>
          ) : null}
          {this.props.currentPage === 7 ? (
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
          <button
            id="closeWindow"
            className="btn btn-default navbar-btn"
            type="button"
            onClick={() => this.props.skipTutorial()}
          >
            X
          </button>
        </div>
        )
    }
}

const mapStateToProps = state => {
    return {      
      currentPage: state.tutorialReducer.currentPage,
      nbPages: state.tutorialReducer.nbPages
    }
  }

const mapDispatchToProps = dispatch => {
    return {      
      skipTutorial: () => dispatch({type: 'skipTutorial'}),
      nextPage: () => dispatch({type: 'nextPage'}),
      previousPage: () => dispatch({type: 'previousPage'})      
    }
  }

export default connect(mapStateToProps, mapDispatchToProps)(Tutorial)