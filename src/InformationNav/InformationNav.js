import React, {Component} from 'react'
import {Nav} from 'react-bootstrap'
import {connect} from 'react-redux'

import './InformationNav.css'

class InformationNav extends Component {
  render() {
    return (
      <Nav className="justify-content-center">
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <div className="node example-node-start"></div>
            <p>Start node</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <div className="node example-node-finish"></div>
            <p>Finish node</p>
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="disabled" disabled>
            <div className="node example-node-wall"></div>
            <p>Wall</p>
          </Nav.Link>
        </Nav.Item>
      </Nav>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    visualizeDijkstra: () => dispatch({type: 'visualizeDijkstra'}),
    visualizeAstar: () => dispatch({type: 'visualizeAstar'}),
    clearBoard: () => dispatch({type: 'clearBoard'}),
    clearPath: () => dispatch({type: 'clearPath'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InformationNav)
