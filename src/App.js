import React from 'react'
import './App.css'
import PathfindingVisualizer from './PathfindingVisualizer/PahtfindingVisualizer'
import Dropdown from './DropdownMenu/DropdownMenu'

function App() {
  return (
    <div className="App">
      <Dropdown></Dropdown>
      <PathfindingVisualizer></PathfindingVisualizer>
    </div>
  )
}

export default App
