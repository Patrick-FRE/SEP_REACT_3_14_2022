import React from 'react';
import ReactDOM from 'react-dom';
import Button from './components/Button';
class HelloMessage extends React.Component {
  render() {
    return (
      <>
        <div>Hello!!!!! {this.props.name}</div>
        <Button />
      </>
    );
  }
}

ReactDOM.render(
  <HelloMessage name="Patrick" />,
  document.getElementById('hello-example')
);

const patrick = { name: 'patrick' };
