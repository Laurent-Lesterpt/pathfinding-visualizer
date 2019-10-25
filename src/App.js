import React, {Component} from 'react'
import './App.css'
import PathfindingVisualizer from './PathfindingVisualizer/PahtfindingVisualizer'
import Dropdown from './DropdownMenu/DropdownMenu'

import {connect} from 'react-redux'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropdown />
        <PathfindingVisualizer />
        <div>Age: {this.props.age}</div>
        <button onClick={this.props.onAgeUp}>UP</button>
        <button onClick={this.props.onAgeDown}>DOWN</button>
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
)(App)
