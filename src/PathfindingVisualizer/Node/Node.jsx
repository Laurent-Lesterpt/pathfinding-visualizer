import React, {Component} from 'react'

import './Node.css'

export const DEFAULT_NODE = {
  row: 0,
  col: 0
}

export default class Node extends Component {
  render() {
    const {col, isFinish, isStart, isVisited, isWall, onMouseDown, onMouseEnter, onMouseUp, row} = this.props
    const extraClassName = isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
      : isVisited
      ? 'node-visited'
      : isWall
      ? 'node-wall'
      : ''
    return (
      <div
        className={`node ${extraClassName}`}
        id={`node-${row}-${col}`}
        onMouseDown={() => onMouseDown(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
        onMouseUp={() => onMouseUp()}
      ></div>
    )
  }
}
