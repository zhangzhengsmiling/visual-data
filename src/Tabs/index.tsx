import React, { useState, useEffect } from 'react';

interface ITabDataItem {
  key: string;
  title: string;
}

export interface IPropsTab {
  value: ITabDataItem[];
  defaultValue?: string;
  onChange?: (activeKey: ITabDataItem) => void;
}

const Tabs = (props: IPropsTab) => {
  const { defaultValue, value, onChange } = props;
  const [active, setActive] = useState(defaultValue || value[0]?.key);

  useEffect(() => {
    if (typeof onChange === 'function')
      onChange(value.find((item: ITabDataItem) => item.key === active) as ITabDataItem);
  }, [active]);

  return (
    <div style={{ width: 400, height: 'auto' }}>
      {value.map((item) => (
        <div
          key={item.key}
          style={{
            width: 40,
            height: 20,
            color: '#fff',
            display: 'inline-block',
            border:
              active === item.key
                ? '1px solid rgba(255, 255, 255, 0.5)'
                : '1px solid rgba(255, 255, 255, 0.1)',
            textAlign: 'center',
            lineHeight: '20px',
          }}
          onClick={() => {
            setActive(item.key);
          }}
        >
          {item.title}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
