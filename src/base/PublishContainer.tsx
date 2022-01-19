import React, { useCallback } from 'react';
import emitter from '@/emitter';
const PublishContainer = ({
  children,
  publishID,
  fnKey = 'onChange',
}: {
  children: React.ReactElement;
  publishID: string;
  fnKey?: string;
}) => {
  const chProps = children.props;

  const handleTrigger = useCallback((value: any) => {
    emitter.publish(publishID, value);
    if (typeof chProps[fnKey] === 'function') {
      chProps[fnKey](value);
    }
  }, []);

  return React.cloneElement(children, { ...chProps, [fnKey]: handleTrigger });
};

export default PublishContainer;
