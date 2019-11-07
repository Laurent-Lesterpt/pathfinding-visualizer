import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import gridReducer from './store/gridReducer'
import tutorialReducer from './store/turorialReducer'

const rootReducer = combineReducers({
  gridReducer: gridReducer,
  tutorialReducer: tutorialReducer
})
const store = createStore(rootReducer)

it('renders without crashing', () => {
  const div = document.createElement('div')
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    div
  )
  ReactDOM.unmountComponentAtNode(div)
})
