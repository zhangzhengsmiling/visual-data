import React, { useRef, useCallback, ReactElement } from 'react'
import merge from 'webpack-merge'

const cls = (...classNames: string[]) => classNames.join(' ')
const Visible = ({ visible, children }: { visible: boolean; children: React.ReactNode }) => {
  return <>{visible ? children : null}</>
}

const styleDot: React.CSSProperties = {
  width: 8,
  height: 8,
  borderRadius: 4,
  background: '#fff',
  position: 'absolute'
}

const styleTop: React.CSSProperties = {
  left: '50%',
  top: 0,
  transform: 'translate(-50%, -50%)',
  cursor: 'row-resize'
}
const styleBottom: React.CSSProperties = {
  left: '50%',
  bottom: 0,
  transform: 'translate(-50%, 50%)',
  cursor: 'row-resize'
}
const styleLeft: React.CSSProperties = {
  left: 0,
  top: '50%',
  transform: 'translate(-50%, -50%)',
  cursor: 'col-resize'
}
const styleRight: React.CSSProperties = {
  right: 0,
  top: '50%',
  transform: 'translate(50%, -50%)',
  cursor: 'col-resize'
}
const styleBR: React.CSSProperties = {
  right: 0,
  bottom: 0,
  transform: 'translate(50%, 50%)',
  cursor: 'nwse-resize'
}

const mergeStyle = (...styles: React.CSSProperties[]) => Object.assign({}, ...styles)

export enum EnumResizeDirection {
  LEFT,
  TOP,
  BOTTOM,
  RIGHT,
  RIGHT_BOTTOM
}

interface ResizeContainerProps {
  children: React.ReactNode
  width: number
  height: number
  container: HTMLElement
  onResize?: (direction: EnumResizeDirection, offset: { dx: number; dy: number }) => void
  resizable?: boolean
}

const ResizeContainer = ({ children, width, height, container, onResize, resizable = true }: ResizeContainerProps) => {
  const refPrev = useRef({
    x: 0,
    y: 0
  })
  const refDirection = useRef<EnumResizeDirection>(EnumResizeDirection.RIGHT_BOTTOM)
  const handleMove = useCallback((e: MouseEvent) => {
    const dx = e.clientX - refPrev.current.x
    const dy = e.clientY - refPrev.current.y
    const nextPosition = {
      dx: dx,
      dy: dy
    }
    onResize?.(refDirection.current, nextPosition)
    refPrev.current = {
      x: e.clientX,
      y: e.clientY
    }
    // eslint-disable-next-line
  }, [])

  const handleUp = () => {
    container?.removeEventListener('mousemove', handleMove)
  }

  const handleDown = (e: any, direction: EnumResizeDirection) => {
    refDirection.current = direction

    refPrev.current = {
      x: e.clientX,
      y: e.clientY
    }
    e.stopPropagation()
    container?.addEventListener('mousemove', handleMove)
    document.addEventListener('mouseup', handleUp)
  }


  return (
    <div
      // className={styles.resizeContainer}
      style={{ width, height, position: 'relative' }}>
      <Visible visible={resizable}>
        <div
          style={mergeStyle(styleDot, styleLeft)}
          // className={cls(styles.dot, styles.left)}
          onMouseDown={(e) => handleDown(e, EnumResizeDirection.LEFT)}
          onMouseUp={handleUp}
        />
        <div
          style={mergeStyle(styleDot, styleRight)}
          // className={cls(styles.dot, styles.right)}
          onMouseDown={(e) => handleDown(e, EnumResizeDirection.RIGHT)}
          onMouseUp={handleUp}
        />
        <div
          style={mergeStyle(styleDot, styleTop)}
          // className={cls(styles.dot, styles.top)}
          onMouseDown={(e) => handleDown(e, EnumResizeDirection.TOP)}
          onMouseUp={handleUp}
        />
        <div
           style={mergeStyle(styleDot, styleBottom)}
          // className={cls(styles.dot, styles.bottom)}
          onMouseDown={(e) => handleDown(e, EnumResizeDirection.BOTTOM)}
          onMouseUp={handleUp}
        />
        <div
           style={mergeStyle(styleDot, styleBR)}
          // className={cls(styles.dot, styles.rightBottom)}
          onMouseDown={(e) => handleDown(e, EnumResizeDirection.RIGHT_BOTTOM)}
          onMouseUp={handleUp}
        />
      </Visible>
      {children}
    </div>
  )
}

export default React.memo(ResizeContainer)