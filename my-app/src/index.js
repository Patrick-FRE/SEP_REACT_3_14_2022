import React from 'react';
import ReactDOM from 'react-dom';
import MyReactDOM from './MyReact/MyReactDOM';
import MyReact from './MyReact/MyReact'
import './index.css';
import reportWebVitals from './reportWebVitals';

// real DOM: window.document
console.dir(window.document);
console.dir(document.getElementById('root'));
// document.getElementById('root').innerHTML = `<h1>Hello</h1>`
const todos = ['buy books', 'pay rental']

const Demo = (
  <main className="app-main" style={{ color: "red" }} id="main" >
    <header>Header</header>
    <div className="content">
      <ul>
        {todos.map(todo => <li key="todo" style={{ border: "1px solid black" }} onClick={() => { alert(todo) }}>{todo}</li>)}
      </ul>
    </div>
  </main>
);

class App extends React.Component {
  render() {
    return null
  }
}

console.log("app", <App />)

class DemoComponent extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      counter: 0,
      title: 'Demo'
    }
    console.log('constructor')

    // this.hanldeClick = this.hanldeClick.bind(this)
  }
  shoudComponentUpdate(props, state) {
    console.log('ShouldComponentUpdate')
    return true
  }

  static getDerivedStateFromProps(props, state) {
    console.log("getDerivedStateFromProps", props, state);
    return null;
  }


  hanldeClick = () => {
    this.setState({ counter: this.state.counter + 1 });
  }

  render() {
    console.log("render")
    console.log(document.querySelector(".app-main"))
    return <main className="app-main" style={{ color: "red" }} id="main" >
      <header>{this.state.title}</header>
      <div className="content">
        <ul>
          {todos.map(todo => <li key={todo} style={{ border: "1px solid black" }} onClick={() => { alert(todo) }}>{todo}</li>)}
        </ul>
      </div>
      <div>
        counter: {this.state.counter}
        <button onClick={this.hanldeClick}>Add</button>
      </div>
    </main>
  }

  componentDidMount() {
    console.log("componentDidMount")
    console.log(document.querySelector(".app-main"))

  }
}


console.log("typeof Class", typeof DemoComponent)

//console.log(App);
//console.log(React.createElement(App, null));
// console.log(
//   /*#__PURE__*/ React.createElement(
//   'main',
//   {
//     id: 'main',
//   },
//     /*#__PURE__*/ React.createElement(
//     'header',
//     null,
//     'Header'
//   ),
//     /*#__PURE__*/ React.createElement(
//     'div',
//     {
//       className: 'content',
//     },
//     'Cotent'
//   )
// )
// );


// console.log("APp", <DemoComponent />);

// ReactDOM.render(
//   Demo,
//   document.getElementById('root')
// );

ReactDOM.render(
  <div>
    <Header headerTitle="FirstHeader"></Header>
    <DemoComponent name="patrick" />
    <h1>Last</h1>
  </div>
  ,
  document.getElementById('root')
);


function Header({ headerTitle }) {
  let state = { title: 'title' }

  return <header>{headerTitle} {state.title}</header>
}
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();


/// call vs bind vs apply


// const obj = { title: { value: 'patrick' }, age: 17 }

// const { title: { value } } = obj;


//const title = obj.title

// const arr = [{ title: { value: 'patrick' }, age: 17 }, 2, 3];
// const [{ title: { value } }, second, thrid] = arr;
// const [data, setData] = React.useState("")