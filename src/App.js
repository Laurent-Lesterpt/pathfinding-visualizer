import React, {Component} from 'react'
import './App.css'
import PathfindingVisualizer from './PathfindingVisualizer/PahtfindingVisualizer'
import Dropdown from './DropdownMenu/DropdownMenu'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Dropdown />
        <PathfindingVisualizer />
      </div>
    )
  }
}

export default App
