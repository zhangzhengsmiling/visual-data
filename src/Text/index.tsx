import React from 'react';

const Text = (props: { data?: any }) => {
  return <div style={{ color: '#fff' }}>{props.data?.title}</div>;
};

export default Text;
