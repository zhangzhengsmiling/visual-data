import React from 'react';
import ReactDOM from 'react-dom';
import './a.less';
import Demo from './App';

const App = () => {
  return (
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
