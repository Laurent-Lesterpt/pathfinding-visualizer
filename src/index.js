import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import * as serviceWorker from './serviceWorker'
import {Provider} from 'react-redux'
import {createStore, combineReducers} from 'redux'
import gridReducer from './store/gridReducer'
import 'bootstrap/dist/css/bootstrap.min.css'
import tutorialReducer from './store/turorialReducer'

const rootReducer = combineReducers({
  gridReducer: gridReducer,
  tutorialReducer: tutorialReducer
})
const store = createStore(rootReducer)

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
