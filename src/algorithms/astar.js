import {getAllNodes, getUnvisitedNeighbors} from './commonalities'

export function astar(grid, startNode, finishNode) {
  if (!startNode || !finishNode || startNode === finishNode) {
    return false
  }
  const visitedNodesInOrder = []
  startNode.heuristic = 0
  startNode.distance = 0
  const unvisitedNodes = getAllNodes(grid)
  while (unvisitedNodes.length) {
    sortNodesByHeuristic(unvisitedNodes)
    const closestNode = unvisitedNodes.shift()
    if (closestNode.isWall) continue
    if (closestNode.distance === Infinity) return visitedNodesInOrder
    closestNode.isVisited = true
    visitedNodesInOrder.push(closestNode)
    if (closestNode === finishNode) return visitedNodesInOrder
    updateUnvisitedNeighbors(closestNode, grid, finishNode)
  }
}

function sortNodesByHeuristic(unvisitedNodes) {
  unvisitedNodes.sort((nodaA, nodeB) => nodaA.heuristic - nodeB.heuristic)
}

function updateUnvisitedNeighbors(node, grid, finishNode) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid)
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1
    neighbor.heuristic = Math.abs(finishNode.col - neighbor.col) + Math.abs(finishNode.row - neighbor.row)
    neighbor.previousNode = node
    if (neighbor.isWall) neighbor.heuristic = Infinity
  }
}
