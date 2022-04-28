//import { createStore } from 'redux';
const { createStore } = require('redux');

/**
 * This is a reducer - a function that takes a current state value and an
 * action object describing "what happened", and returns a new state value.
 * A reducer's function signature is: (state, action) => newState
 *
 * The Redux state should contain only plain JS objects, arrays, and primitives.
 * The root state value is usually an object.  It's important that you should
 * not mutate the state object, but return a new object if the state changes.
 *
 * You can use any conditional logic you want in a reducer. In this example,
 * we use a switch statement, but it's not required.
 *
 */

function counterReducer(state = { value: 100 }, action) {
  switch (action.type) {
    case 'counter/incremented':
      return { value: state.value + 1 };
    case 'counter/decremented':
      return { value: state.value - 1 };
    default:
      return state;
  }
}

// Create a Redux store holding the state of your app.
// Its API is { subscribe, dispatch, getState }.
// let store = createStore(counterReducer);

// // You can use subscribe() to update the UI in response to state changes.
// // Normally you'd use a view binding library (e.g. React Redux) rather than subscribe() directly.
// // There may be additional use cases where it's helpful to subscribe as well.

// // The only way to mutate the internal state is to dispatch an action.
// // The actions can be serialized, logged or stored and later replayed.
// store.dispatch({ type: 'counter/incremented' });
// // // {value: 1}
// store.subscribe(() => {
//   console.log(store.getState());
// });
// store.dispatch({ type: 'counter/incremented' });
// // // {value: 2}
// store.dispatch({ type: 'counter/decremented' });
// // {value: 1}

export let mystore = mycreateStore(counterReducer);

// mystore.dispatch({ type: 'counter/incremented' });
// mystore.subscribe(() => {
//   console.log(mystore.getState());
// });
// mystore.dispatch({ type: 'counter/incremented' });
// mystore.dispatch({ type: 'counter/decremented' });

export function mycreateStore(reducer) {
  let subscriberFnList = [];
  let state;
  state = reducer(state, { type: '_______INIT_______' });
  function getState() {
    return state;
  }
  function dispatch(action) {
    state = reducer(state, action);
    subscriberFnList.forEach((subscriberFn) => {
      console.log('call subscriber');
      subscriberFn();
    });
  }

  function subscribe(subscriberFn) {
    subscriberFnList.push(subscriberFn);
    console.log('subsucribe', subscriberFnList);
    return () => {
      console.log('unsubsucribe');
      subscriberFnList = subscriberFnList.filter((subscriber) => {
        return subscriber !== subscriberFn;
      });
    };
  }

  return {
    subscribe,
    dispatch,
    getState,
  };
}
