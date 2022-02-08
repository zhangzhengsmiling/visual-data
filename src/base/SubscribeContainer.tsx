import React, { useState, useCallback, useEffect } from 'react';
import emitter from '@/emitter';
interface IPropsSubscribeContainer {
  subscriberID: string;
  children: React.ReactElement;
  parser?: (v: any) => any;
}

const DEFAULT_PARSER = (v: any) => v

const SubscribeContainer = (props: IPropsSubscribeContainer) => {
  const { subscriberID, parser = DEFAULT_PARSER } = props;
  const [data, setData] = useState<any>();

  const callback = useCallback((data: any) => {
    setData(
      parser(data)
    );
  }, []);

  useEffect(() => {
    emitter.subscribe(subscriberID, callback);
    return () => emitter.unsubscribe(subscriberID, callback);
  }, []);

  return React.cloneElement(props.children, { ...props.children.props, data });
};

export default SubscribeContainer;
