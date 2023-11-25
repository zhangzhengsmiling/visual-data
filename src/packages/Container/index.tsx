import React, { useEffect, useState, useCallback } from 'react';

export interface IPropsContainer {
  style?: React.CSSProperties;
  className?: string;
  children?: React.ReactChild | React.ReactChild[];
}

const Container = (props: IPropsContainer) => {
  const [style, set] = useState(
    props.style || {
      width: (400 / 1920) * document.documentElement.clientWidth,
      height: 400 * (document.documentElement.clientWidth / 1920),
      background: 'rgba(36, 57, 74, 1)',
      border: '1px solid rgba(255, 255, 255, 0.2)',
      boxShadow: '0px 0px 2px 2px rgba(255, 255, 255, 0.2)',
    },
  );

  const resize = useCallback(() => {
    set((style) => ({
      ...style,
      width: (400 / 1920) * document.documentElement.clientWidth,
      height: 400 * (document.documentElement.clientWidth / 1920),
    }));
  }, []);

  useEffect(() => {
    window.addEventListener('resize', resize);
    return () => window.removeEventListener('resize', resize);
  }, []);

  return (
    <div className="container" style={style}>
      {props.children}
    </div>
  );
};

export default Container;
