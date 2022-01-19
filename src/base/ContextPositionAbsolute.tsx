/**
 * 利用context抽离绝对定位逻辑
 */
import React, { createContext, useContext } from 'react';

const ContextPositionAbsolute = createContext<React.CSSProperties>({
  position: 'absolute',
  left: 0,
  top: 0,
});

const useContextPositionStyle = (style?: React.CSSProperties) => {
  const positionStyle = useContext(ContextPositionAbsolute);
  const _style: React.CSSProperties = {
    ...positionStyle,
    position: 'absolute',
  };
  if (style === undefined || style === null) return _style;
  return {
    ...style,
    ..._style,
  };
};

const PositionAbsoluteContainer = (props: any) => {
  const style = useContextPositionStyle();
  return <div style={style}>{props.children}</div>;
};

const createPositionAbsoluteContainerValue = (left: number, top: number, zIndex = 0) => {
  return {
    left,
    top,
    zIndex,
  };
};

export default ContextPositionAbsolute;
export { useContextPositionStyle, PositionAbsoluteContainer, createPositionAbsoluteContainerValue };
