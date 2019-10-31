const initialState = {
  pageCounter: 1
}

const reducer = (state = initialState, action) => {
  const newState = {...state}

  switch (action.type) {
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

export default reducer
