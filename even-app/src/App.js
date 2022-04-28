import './App.css';
import Counter, { CounterFn } from './components/Counter/Counter';
import React from 'react';

function App() {
  const [showCounter, setShowCounter] = React.useState(true);

  return (
    <>
      {showCounter ? <Counter title="Counter"></Counter> : null}
      <CounterFn title="CounterFn" />
      <button onClick={() => setShowCounter(false)}> Hide Counter</button>
    </>
  );
}

export default App;
