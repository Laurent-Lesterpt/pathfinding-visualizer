import React, {Component} from 'react'
import './App.css'
import PathfindingVisualizer from './PathfindingVisualizer/PahtfindingVisualizer'
import TopNavBar from './TopNavBar/TopNavBar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNavBar />
        <PathfindingVisualizer />
      </div>
    )
  }
}

export default App
