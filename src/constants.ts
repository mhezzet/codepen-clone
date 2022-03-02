export const initialCode = `
import React, { useState } from 'react';
import ReactDom from 'react-dom';

const App = () => {
  const [counter, setCounter] = useState(0);
  return (
    <div>
      <div>{counter}</div>
      <button onClick={() => setCounter((prevCount) => prevCount + 1)}>
        click me
      </button>
    </div>
  );
};

ReactDom.render(<App />, document.querySelector('#root'));

`
