import React, {Component} from 'react'
import './Node.css'

export default class Node extends Component {
  render() {
    const {
      col,
      isFinish,
      isFinishDragged,
      isStart,
      isStartDragged,
      isWall,
      onMouseDown,
      onMouseEnter,
      onMouseUp,
      row
    } = this.props
    const extraClassName = isFinishDragged
      ? 'node-finish-dragged'
      : isStartDragged
      ? 'node-start-dragged'
      : isFinish
      ? 'node-finish'
      : isStart
      ? 'node-start'
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
