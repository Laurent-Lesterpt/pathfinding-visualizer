import {hot} from 'react-hot-loader/root'
import React, {Component} from 'react'
import './App.css'
import PathfindingVisualizer from './components/PathfindingVisualizer/PahtfindingVisualizer'
import TopNavBar from './components/TopNavBar/TopNavBar'
import InformationNav from './components/InformationNav/InformationNav'

class App extends Component {
  render() {
    return (
      <div className="App">
        <TopNavBar />
        <InformationNav />
        <PathfindingVisualizer />
      </div>
    )
  }
}

export default hot(App)
