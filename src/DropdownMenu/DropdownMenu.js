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
            <button onClick={this.props.onAgeUp}> Age Up </button>
            <button onClick={this.props.onAgeDown}> Age Down </button>
            <button> Menu item 3 </button>
          </div>
        ) : null}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return {
    age: state.age
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onAgeUp: () => dispatch({type: 'ageUp', value: 1}),
    onAgeDown: () => dispatch({type: 'ageDown', value: 1})
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DropdownMenu)
