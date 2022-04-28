// let state = {
//   title: 'counter',
//   counter: 0,
//   hideBtnAdd: false,
// };

// console.log(state);

// function setState(partialStateOrCallbackFn) {
//   // updateState
//   if (typeof partialStateOrCallbackFn === 'function') {
//     let callbackFn = partialStateOrCallbackFn;
//     setTimeout(() => {
//       console.log('====Updating State START====');
//       console.log('oldState', state); // {counter:0} | {counter:1}
//       let partialState = callbackFn(state);
//       console.log('partialState', partialState); // {counter:1} |  {counter:2}
//       state = { ...state, ...partialState };
//       console.log('newState', state); // {counter:1} | {counter:2 }
//       console.log('====Updating State END====');
//     }, 0);
//   } else {
//     let partialState = partialStateOrCallbackFn;
//     setTimeout(() => {
//       state = { ...state, ...partialState };
//     }, 0);
//   }
// }

// // setState({ counter: state.counter + 1 }); // {counter: 1}
// // console.log(state); // counter 0
// // setState({ counter: state.counter + 1 }); // {counter: 1}
// // console.log(state); // counter 0

// setState((preState) => {
//   return { counter: preState.counter + 1 };
// }); //
// console.log(state); // {counter:0}
// setState((preState) => {
//   return { counter: preState.counter + 1 };
// }); //
// console.log(state); //{counter:0}
// setTimeout(() => {
//   console.log(state);
// }, 100);

class App {
  state = {
    time: 0,
  };
}

let a = new App();
console.log(a);
