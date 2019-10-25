import React, {Component} from 'react'

import './DropdownMenu.css'
import {connect} from 'react-redux'

class DropdownMenu extends Component {
  constructor() {
    super()

    this.state = {
      showMenu: false
    }

    this.showMenu = this.showMenu.bind(this)
    this.closeMenu = this.closeMenu.bind(this)
  }

  showMenu(event) {
    event.preventDefault()

    this.setState({showMenu: true}, () => {
      document.addEventListener('click', this.closeMenu)
    })
  }

  closeMenu(event) {
    if (!this.dropdownMenu.contains(event.target)) {
      this.setState({showMenu: false}, () => {
        document.removeEventListener('click', this.closeMenu)
      })
    }
  }

  render() {
    return (
      <div classame="navbar-buttons">
        <button onClick={this.showMenu}>Show menu</button>

        {this.state.showMenu ? (
          <div
            className="menu"
            ref={element => {
              this.dropdownMenu = element
            }}
          >
            <button className="visualize-dijkstra" onClick={() => this.props.visualizeDijkstra()}>
              Visualize Dijkstra's Algorithm
            </button>
            <button className="visualize-astar" onClick={() => this.props.visualizeAstar()}>
              Visualize A* Algorithm
            </button>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {}
}

const mapDispatchToProps = dispatch => {
  return {
    visualizeDijkstra: () => dispatch({type: 'visualizeDijkstra'}),
    visualizeAstar: () => dispatch({type: 'visualizeAstar'})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownMenu)
