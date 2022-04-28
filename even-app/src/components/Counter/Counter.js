import React from 'react';
import Button from '../Button/Button';
import { mystore } from '../../MyRedux/MyRedux';
import { useForceUpdate } from '../../hooks/useForceUpdate';
// import { withSubscribe } from '../../hoc/withSubscribe';
import {
  myconnect,
  useMySelector,
  useMyDispatch,
} from '../../MyReactRedux/MyReactRedux';
import { connect } from 'react-redux';

// const ConnectedComponent = connect(
//   mapState,
//   mapDispatch
// )(MyComponent)
// const sth = connect(
//      mapState,
//    mapDispatch
//  )
// sth(MyComponent)

// const ConnectedComponent = connect(
//   mapState,
//   mapDispatch
// )(MyComponent)

// // Later, pass the custom context as a prop to the connected component
// <ConnectedComponent context={MyContext} />

// Patrick = foo(5)(8);
// <Patrick/>

let data = {
  counter: 1000,
};
// UI = React (state)

class Counter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: 'counter',
      hideBtnAdd: false,
    };
    //this.forceUpdateTest = this.forceUpdateTest.bind(this);

    console.log('Counter constructor');
  }

  static getDerivedStateFromProps(props, state) {
    console.log('Counter getDerivedStateFromProps');
    if (props.title !== state.title) {
      //Change in props
      return {
        title: props.title,
      };
    }
    return null; // No change to state
  }
  render() {
    console.log('Counter render');
    return (
      <section>
        {this.props.children}
        <header>
          {this.state.title}:{this.props.counterValue}
        </header>

        {!this.state.hideBtnAdd ? (
          <Button
            className="btn"
            onClick={() => {
              //HW1  why
              this.props.hanldeAdd();
            }}
          >
            Add
          </Button>
        ) : null}
        <Button
          className="btn"
          onClick={() => {
            this.props.hanldeSub();
          }}
        >
          Sub
        </Button>

        <Button
          onClick={() => {
            this.setState({ hideBtnAdd: !this.state.hideBtnAdd });
          }}
        >
          Remove/Show Btn Add
        </Button>
        <Button
          onClick={() => {
            let currentCouter = this.props.counterValue;
            setTimeout(() => {
              alert(currentCouter); // HW2 alert the recent value using function component
            }, 5000);
          }}
        >
          Alert After 5s
        </Button>
      </section>
    );
  }
}

let alertCounter;
export const CounterFn = (props) => {
  const testA = 'testA';
  const value = useMySelector((state) => state.value);
  const dispatch = useMyDispatch();

  const forceUpdate = useForceUpdate();
  const [hideBtnAdd, setHideBtnAdd] = React.useState(false);
  const [showAlert, setShowAlert] = React.useState(false);

  React.useEffect(() => {
    if (showAlert === true) {
      alert('counter');
      setShowAlert(false);
    }
  }, [showAlert]);

  // ComponentDidMount
  // React.useEffect(() => {
  //   console.log('useEffect invoked');
  // }, []);

  // ComponentDidUpdate + ComponentDidMount
  // React.useEffect(() => {
  //   console.log('useEffect invoked');
  // });

  // React.useEffect(() => {
  //   return () => {
  //     // ComponentWillUnmount
  //   };
  // }, [XXX]);

  React.useEffect(() => {
    mystore.subscribe(() => {
      forceUpdate();
    });
  }, []);

  return (
    <section>
      {props.children}
      <header>
        {props.title}:{value}
      </header>

      {!hideBtnAdd ? (
        <button
          className="btn"
          onClick={() => {
            dispatch({ type: 'COUNTER_ADD' });
            // mystore.dispatch({ type: 'counter/incremented' });
            // console.log(mystore.getState());
          }}
        >
          <h1>ADD</h1>
        </button>
      ) : null}

      <button
        onClick={() => {
          setHideBtnAdd(!hideBtnAdd);
        }}
      >
        Remove/Show Btn Add
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
            setShowAlert(true); // HW2 alert the recent value using function component
          }, 5000);
        }}
      >
        Alert After 5s
      </button>
    </section>
  );
};

const mapStateToProps = (state) => {
  return {
    counterValue: state.value,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    hanldeAdd: () => dispatch({ type: 'COUNTER_ADD' }),
    hanldeSub: () => alert('test'),
  };
};

const HelloPatrick = myconnect(mapStateToProps, mapDispatchToProps);

export default HelloPatrick(Counter);
