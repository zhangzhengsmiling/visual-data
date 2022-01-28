import React, { useRef, MouseEventHandler } from 'react';

const Moveable = ({ children, container, position, zIndex = 0, onMove }: {
  children: React.ReactChild | React.ReactChild[];
  container: HTMLElement | null;
  position: {x: number; y: number;};
  zIndex?: number,
  onMove: (position: { dx: number; dy: number; }) => void
}) => {

  const refPrev = useRef({
    x: 0,
    y: 0,
  })

  const handleMove = (e: MouseEvent) => {
    const dx = e.clientX - refPrev.current.x;
    const dy = e.clientY - refPrev.current.y;
    const nextPosition = {
      dx: dx,
      dy: dy,
    }
    onMove(nextPosition);
    refPrev.current = {
      x: e.clientX,
      y: e.clientY,
    };
  }

  const handleUp = (e: MouseEvent) => {
    container?.removeEventListener('mousemove', handleMove);
    e.stopPropagation()
  };

  const handleDown: MouseEventHandler = (e) => {
    refPrev.current = {
      x: e.clientX,
      y: e.clientY,
    }
    e.stopPropagation();
    container?.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
  }


  return (
      <div
        style={{
          width: 'auto',
          height: 'auto',
          position: 'absolute',
          left: position.x,
          top: position.y,
          zIndex
        }}
        onMouseDown={handleDown}
      >
        {children}
      </div>
  )
}

export default Moveable;
