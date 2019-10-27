import React, {Component} from 'react'
import {Nav, Navbar, NavDropdown} from 'react-bootstrap'
import {connect} from 'react-redux'

class DropdownMenu extends Component {
  render() {
    return (
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="#home">Pathfinding-Visualizer</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavDropdown title="Choose algorithm to visualize" id="basic-nav-dropdown">
              <NavDropdown.Item onClick={() => this.props.visualizeDijkstra()}>Dijkstra</NavDropdown.Item>
              <NavDropdown.Item onClick={() => this.props.visualizeAstar()}>A*</NavDropdown.Item>
            </NavDropdown>
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
    getInitialGrid: () => dispatch({type: 'getInitialGrid'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownMenu)
