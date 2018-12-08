import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { createStore } from 'redux'
import { categoryReducer } from './reducers/categoryReducer'

const store = createStore(
  categoryReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
ReactDOM.render(
  <BrowserRouter><App store={store}/></BrowserRouter>,
  document.getElementById('root')
);