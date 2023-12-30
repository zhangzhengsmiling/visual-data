import React, { useState, useEffect, useRef } from 'react';
import './style.less';

interface Point {
  x: number;
  y: number;
}

interface FrameSelectOptions {
  container?: HTMLElement
  onSelectStart?: () => void
  onSelecting?: () => void
  onSelectEnd?: () => void
}

const useFrameSelect = (options?: any) => {
  const {
    container = document.body,
    onSelectEnd: _onSelectEnd,
    onSelectStart: _onSelectStart,
    onSelecting: _onSelecting
  } = options || {}
  const [begin, setBegin] = useState<Point>({ x: 0, y: 0 });
  const [end, setEnd] = useState<Point>({ x: 0, y: 0 });
  const [visible, setVisible] = useState(false);

  const destroy = () => {
    setVisible(false);
    setBegin({ x: 0, y: 0 });
    setEnd({ x: 0, y: 0 });
  }

  const onSelectStart = useRef(() => {
    console.log('on select ;start....');
    _onSelectStart?.();
  })

  const onSelecting = useRef(({ begin, end }: { begin: Point, end: Point }) => {
    const frameArea = {
      beginX: Math.min(begin.x, end.x),
      beginY: Math.min(begin.y, end.y),
      endX: Math.max(begin.x, end.x),
      endY: Math.max(begin.y, end.y)
    }
    _onSelecting?.(frameArea);
    console.log(frameArea, 'on selecting...');
  })

  const onSelectEnd = useRef(() => {
    console.log('on select end...');
    _onSelectEnd?.();
  }
)
  useEffect(() => {
    if (!container) return
    const handler = (e: MouseEvent) => {
      setBegin({ x: e.clientX, y: e.clientY });
      setEnd({ x: e.clientX, y: e.clientY });
      setVisible(true)
      onSelectStart.current()
    }
    container.addEventListener('mousedown', handler);
    return () => container.removeEventListener('mousedown', handler);
  }, [container])

  const element = (
    <>
      {
        visible ? (
          <div
            className="mask"
            onMouseUp={() => {
              onSelectEnd.current()
              destroy()
            }}
            onMouseMove={(e) => {
              const nextEnd = {
                x: e.clientX,
                y: e.clientY
              }
              setEnd(nextEnd)
              onSelecting.current({ begin, end: nextEnd })
            }}
          >
            <div
              className="frame"
              style={{
                width: Math.abs(end.x - begin.x),
                height: Math.abs(end.y - begin.y),
                left: Math.min(begin.x, end.x),
                top: Math.min(begin.y, end.y)
              }}
            />
          </div>
          ) : null
      }
    </>
  )

  return {
    element,
  }
}

export default useFrameSelect;
