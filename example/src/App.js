import React from 'react';
import { connect } from 'react-redux';
import actions from './actions.js'
import './App.css';

const App = ({inc, dec, counter}) => {
  return (
    <>
      <button onClick={inc}>+</button>
      <h1>{counter}</h1>
      <button onClick={dec}>-</button>
    </>
  )
}

export default connect(
  (state) => state,
  (dispatch) => ({
    inc: () => dispatch(actions.Inc()),
    dec: () => dispatch(actions.Dec()),
  })
)(App);
