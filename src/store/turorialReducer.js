const initialState = {
  currentPage: 1,
  nbPages: 5
}

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
    case 'nextPage':
      newState.currentPage = nextPage(newState.currentPage)
      break

    case 'previousPage':
      newState.currentPage = previousPage(newState.currentPage)
      break

    case 'skipTutorial':
      skipTutorial()
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
  return newPage
}

const nextPage = currentPage => {
  if (currentPage === initialState.nbPages) return currentPage
  const newPage = currentPage + 1
  return newPage
}

export default reducer
