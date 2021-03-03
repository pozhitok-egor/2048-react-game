import React from 'react'
import { render } from 'react-dom'
import './index.css'
import App from './App'
/**
 *  redux
 */
import store from './store/store';
import { Provider } from 'react-redux';
// import App from './Components'

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
