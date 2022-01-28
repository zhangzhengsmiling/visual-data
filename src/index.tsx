import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './a.less';
import Demo from './App';


const App = () => {

  // 
  // return (
  //   <React.StrictMode>
  //     <svg style={{ width: 400, height: 400, background: 'rgb(32, 33, 36)' }}>
  //       <g strokeDasharray={"3, 3"} stroke="#666">
  //         {
  //         new Array(10).fill('').map((item, idx) => ({
  //           x1: 20, y1: 20 * (idx + 1), x2: 400, y2: 20 * (idx + 1)
  //         })).map(item => (
  //             <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} />
  //           ))
  //         }
  //       </g>
  //       <rect x={20} y={20} width="40" height="180" fill="orange" />
  //     </svg>
  //   </React.StrictMode>
  // );

  return (
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
