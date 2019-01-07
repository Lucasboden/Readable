import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import { createStore,applyMiddleware, compose, combineReducers } from 'redux'
import  thunk from 'redux-thunk'
import App from './App'
import './index.css'
import { categoryReducer } from './reducers/categoryReducer'
import { postsReducer } from './reducers/postsReducer'

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION__COMPOSE || compose
const store = createStore(
  combineReducers({categoryReducer,postsReducer}),
  composeEnhancers(applyMiddleware(thunk))
  )
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter><App/></BrowserRouter>
  </Provider>,
  document.getElementById('root')
);