import React, { useState, useEffect } from 'react';

interface ITabDataItem {
  key: string;
  label: string;
  value: string;
}

export interface IPropsTab {
  data: ITabDataItem[];
  defaultValue?: string;
  onChange?: (activeKey: ITabDataItem) => void;
}

const Tabs = (props: IPropsTab) => {
  const { defaultValue, data, onChange } = props;
  const [active, setActive] = useState(defaultValue || data[0]?.key);

  useEffect(() => {
    if (typeof onChange === 'function')
      onChange(data.find((item: ITabDataItem) => item.key === active) as ITabDataItem);
  }, [active]);

  return (
    <div style={{ width: 400, height: 'auto' }}>
      {data.map((item) => (
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
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default Tabs;
