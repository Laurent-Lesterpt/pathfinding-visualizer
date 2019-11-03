import React, {Component} from 'react'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'

class TopNavBar extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand onClick={() => this.props.clearBoard()} href="#">
          Pathfinding Visualizer
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Algorithms" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => this.props.visualizeDijkstra()}>Dijkstra</NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.visualizeAstar()}>A*</NavDropdown.Item>
            </NavDropdown>
            <Nav.Item onClick={() => this.props.clearBoard()}>
              <Nav.Link>Clear Board</Nav.Link>
            </Nav.Item>
            <Nav.Item onClick={() => this.props.clearPath()}>
              <Nav.Link>Clear Path</Nav.Link>
            </Nav.Item>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
)(TopNavBar)
