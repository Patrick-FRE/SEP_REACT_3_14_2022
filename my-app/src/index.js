import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './MyReact/MyReact'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

// real DOM: window.document
console.dir(window.document);
console.dir(document.getElementById('root'));
// document.getElementById('root').innerHTML = `<h1>Hello</h1>`
const todos = ['buy books', 'pay rental']

const Demo = (
  <main className="app-main" style={{ color: "red" }} id="main" onClick={() => { alert('click') }}>
    <header>Header</header>
    <div className="content">
      <ul>
        {todos.map(todo => <li key="todo">{todo}</li>)}
      </ul>
    </div>
  </main>
);

//console.log(App);
//console.log(React.createElement(App, null));
console.log(
  /*#__PURE__*/ React.createElement(
  'main',
  {
    id: 'main',
  },
    /*#__PURE__*/ React.createElement(
    'header',
    null,
    'Header'
  ),
    /*#__PURE__*/ React.createElement(
    'div',
    {
      className: 'content',
    },
    'Cotent'
  )
)
);


console.log(Demo);

// ReactDOM.render(
//   Demo,
//   document.getElementById('root')
// );

MyReactDOM.render(
  Demo,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
