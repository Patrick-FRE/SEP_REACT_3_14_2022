import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import StockApp from './components/StockApp/StockApp';
import { MyProvider } from './MyReactRedux/MyReactRedux';
import { Provider } from 'react-redux';

import { mycreateStore } from './MyRedux/MyRedux';
import { createStore } from 'redux';

import { BrowserRouter } from 'react-router-dom';
import { MyBrowserRoute } from './MyReactRouter/MyReactRouter';

// action type

const COUNTER_ADD = 'COUNTER_ADD';
const COUNTER_SUB = 'COUNTER_SUB';

export const actionType = {
  COUNTER_ADD,
  COUNTER_SUB,
};

const reducer = (state = { value: 50 }, action) => {
  switch (action.type) {
    case actionType.COUNTER_ADD:
      return {
        ...state,
        value: state.value + 1,
      };
    case actionType.COUNTER_SUB:
      return {
        ...state,
        value: state.value - 1,
      };
    default:
      return state;
  }
};

const store = mycreateStore(reducer);

//const store = createStore(reducer);

ReactDOM.render(
  <MyProvider store={store}>
    <MyBrowserRoute>
      <StockApp />
    </MyBrowserRoute>
  </MyProvider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
