const initialState = {
  currentPage: 1,
  nbPages: 3
}

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'skipTutorial':
      skipTutorial()
      break

    case 'previousPage':
      newState.currentPage = previousPage(newState.currentPage)
      break

    case 'nextPage':
      newState.currentPage = nextPage(newState.currentPage)
      break

    default:
      break
  }

  return newState
}

const skipTutorial = () => {
  document.getElementById('tutorial').style.display = 'none'
}

const previousPage = currentPage => {
  if (currentPage === 1) return currentPage
  const newPage = currentPage - 1
  setPage(newPage)
  return newPage
}

const nextPage = currentPage => {
  if (currentPage === initialState.nbPages) return currentPage
  const newPage = currentPage + 1
  console.log(currentPage)
  setPage(newPage)
  return newPage
}

const setPage = newPage => {
  switch (newPage) {
    case 1:
      document.getElementById('movingPart').innerHTML = `<h3>Welcome to Pathfinding Visualizer!</h3>
                <h6>This short tutorial will walk you through all of the features of this application.</h6>
                <p>
                  If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press
                  "Next"!
                </p>
                <div id="tutorialCounter">${newPage}/${initialState.nbPages}</div>
                <img id="mainTutorialImage" src="" />`
      break

    case 2:
      document.getElementById('movingPart').innerHTML = `<h3>second page!</h3>
                      <h6>This short tutorial will walk you through all of the features of this application.</h6>
                      <p>
                        If you want to dive right in, feel free to press the "Skip Tutorial" button below. Otherwise, press
                        "Next"!
                      </p>
                      <div id="tutorialCounter">${newPage}/${initialState.nbPages}</div>
                      <img id="mainTutorialImage" src="" />`
      break

    default:
      break
  }
}

export default reducer
