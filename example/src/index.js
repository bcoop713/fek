import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import { createStore } from 'redux';
import './index.css';
import App from './App';
import {register} from './serviceWorker';

import {match} from '../../src/adt'
import {update} from '../../src/util'
import {validate, Obj, isNumber} from '../../src/schema'


const initialState = {
  counter: 0
}

const stateSchema = Obj({
  counter: isNumber
})

const reducers = (state, action) => {
  const newState = match({
    NoOp: () => state,
    Inc: () => update('counter')((val) => val + 1)(state),
    Dec: () => update('counter')((val) => val - 1)(state),
    Default: () => state
  })(action)
  match({
    Ok: () => null,
    Error: (err) => console.warn('Store Validation Error:', err)
  })(validate(stateSchema)(newState))
  return newState
}

const store = createStore(
  reducers,
  initialState,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

ReactDOM.render(
    <Provider store={store}>
    <App />
    </Provider>,
  document.getElementById('root')
);
register();
