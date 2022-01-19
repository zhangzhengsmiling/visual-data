import React, { useState, useRef, useEffect, MouseEventHandler } from 'react';
import ReactDOM from 'react-dom';
import './a.less';
import Demo from './App';


const Moveable = ({ children, container }: {
  children: React.ReactChild | React.ReactChild[],
  container: HTMLElement | null
}) => {

  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  })

  const refPrev = useRef({
    x: 0,
    y: 0,
  })

  const handleMove = React.useCallback((e: MouseEvent) => {
    setPosition(position => {
      const x = e.clientX - refPrev.current.x + position.x;
      const y = e.clientY - refPrev.current.y + position.y
      console.log(x, y);

      return {
        x: e.clientX - refPrev.current.x + position.x,
        y: e.clientY - refPrev.current.y + position.y
      }
    })
    refPrev.current = {
      x: e.clientX,
      y: e.clientY,
    }
  }, [])

  const handleUp = (e: MouseEvent) => {
    container?.removeEventListener('mousemove', handleMove);
    e.stopPropagation()
  }

  const handleDown: MouseEventHandler = (e) => {
    refPrev.current = {
      x: e.clientX,
      y: e.clientY,
    }
    e.stopPropagation()
    container?.addEventListener('mousemove', handleMove)
    container?.addEventListener('mouseup', handleUp)
  }


  return (
      <div
        style={{ width: 'auto', height: 'auto', border: '1px solid orange', position: 'absolute', left: position.x, top: position.y }}
        onMouseDown={handleDown}
      >
      {children}
      </div>
  )
}

const App = () => {

  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  return (
    <div ref={setContainer} style={{ width: '100vw', height: '100vh', background: '#080808' }}>
      <Moveable container={container}>
        <span style={{ color: '#fff' }}>asdf</span>
      </Moveable>
      <Moveable container={container}>
        <div style={{ width: 100, height: 100, border: '1px solid orange' }}>

        </div>
      </Moveable>
    </div>
  )

  return (
    <React.StrictMode>
      <svg style={{ width: 400, height: 400, background: 'rgb(32, 33, 36)' }}>
        <g strokeDasharray={"3, 3"} stroke="#666">
          {
          new Array(10).fill('').map((item, idx) => ({
            x1: 20, y1: 20 * (idx + 1), x2: 400, y2: 20 * (idx + 1)
          })).map(item => (
              <line x1={item.x1} y1={item.y1} x2={item.x2} y2={item.y2} />
            ))
          }
        </g>
        <rect x={20} y={20} width="40" height="180" fill="orange" />
      </svg>
    </React.StrictMode>
  );

  return (
    <React.StrictMode>
      <Demo />
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.querySelector('#root'));
