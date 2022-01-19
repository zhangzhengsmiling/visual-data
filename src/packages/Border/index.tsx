import React from 'react';

const Border = (props: any) => {
  const color = 'orange';

  return (
    <div style={{ width: 'auto', height: 'auto', position: 'relative', display: 'inline-block' }}>
      <svg
        style={{
          width: '100%',
          height: '100%',
          background: 'transparent',
          position: 'absolute',
          left: 0,
          top: 0,
        }}
        fill="transparent"
        stroke="transparent"
      >
        <rect x="0" y="0" width="100%" height="100%" stroke={color} strokeWidth="2" />
        <rect x="3%" y="3%" width="94%" height="94%" stroke={color} style={{ opacity: 0.6 }} />
        <g>
          <circle cx="5%" cy="5%" r="1%" fill={color}>
            <animate
              attributeName="fill"
              values="rgb(59, 230, 203);rgb(2, 188, 254);#fff;"
              dur="1000ms"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="5%" cy="95%" r="1%" fill={color}>
            <animate
              attributeName="fill"
              values="rgb(59, 230, 203);rgb(2, 188, 254);#fff;"
              dur="1000ms"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="95%" cy="5%" r="1%" fill={color}>
            <animate
              attributeName="fill"
              values="rgb(59, 230, 203);rgb(2, 188, 254);#fff;"
              dur="1000ms"
              repeatCount="indefinite"
            />
          </circle>
          <circle cx="95%" cy="95%" r="1%" fill={color}>
            <animate
              attributeName="fill"
              values="rgb(59, 230, 203);rgb(2, 188, 254);#fff;"
              dur="1000ms"
              repeatCount="indefinite"
            />
          </circle>
        </g>
      </svg>
      {props.children}
    </div>
  );
};

export default Border;
