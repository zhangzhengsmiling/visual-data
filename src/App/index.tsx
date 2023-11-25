import React, { useState } from 'react';
import Text from '@/packages/Text';
import Container from '@/packages/Container';
import Tabs from '@/packages/Tabs';
import SubscribeContainer from '@/base/SubscribeContainer';
import PublishContainer from '@/base/PublishContainer';
import Moveable from '@/base/Movable';
import Loading from '../packages/Loading'

const json: any[] = [
  {
    type: Container,
    style: [
      { _key: 'left', _type: 'number', _default: 0, _displayName: 'left' },
      { _key: 'top', _type: 'number', _default: 0, _displayName: 'top' },
      { _key: 'width', _type: 'number', _default: 0, _displayName: '宽度' },
      { _key: 'height', _type: 'number', _default: 0, _displayName: '高度' },
    ],
    data: {},
    interactive: {},
  },
];

class Point2D {
  constructor(x: number = 0, y: number = 0) {
    this.x = x;
    this.y = y;
  }
  private x: number;
  private y: number;
  getX() {
    return this.x;
  }
  setX(x: number) {
    this.x = x;
  }
  getY() {
    return this.y;
  }
  setY(y: number) {
    this.y = y;
  }
}

class Position extends Point2D {
  constructor(x: number, y: number, zIndex: number = 0) {
    super(x, y);
    this.zIndex = zIndex;
  }
  private zIndex: number;
  getZIndex() {
    return this.zIndex;
  }
  setZIndex(zIndex: number) {
    this.zIndex = zIndex;
  }
}
const componentsMap = new Map();
componentsMap.set('Container', Container);
componentsMap.set('Tabs', Tabs);
componentsMap.set('Text', Text);
componentsMap.set('Loading', Loading);

const data = [
  {
    id: 'CONTAINER#1',
    type: 'Container',
    position: {
      x: 440,
      y: 20,
    },
    attr: {
      width: 200,
      height: 100,
      border: '1px solid #eee8',
    },
  },
  {
    id: 'CONTAINER#2',
    type: 'Container',
    position: {
      x: 20,
      y: 20,
    },
    attr: {
      width: 100,
      height: 100,
    },
  },
  {
    id: 'CONTAINER#3',
    type: 'Container',
    position: {
      x: 860,
      y: 20,
    },
    attr: {
      width: 100,
      height: 100,
    },
  },
  {
    id: 'TEXT#1',
    type: 'Text',
    position: {
      x: 440,
      y: 20,
      zIndex: 1,
    },
    style: {},
    subscriber: {
      id: 'a',
      parser: (v: any) => ({
        title: v.label,
      }),
    },
  },
  {
    id: 'TEXT#2',
    type: 'Text',
    position: {
      x: 600,
      y: 20,
      zIndex: 1,
    },
    style: {
    },
    data: {
      title: '我好吗？太阳如常升起。'
    }
  },
  {
    id: 'TABS#1',
    type: 'Tabs',
    position: {
      x: 400,
      y: 80
    },
    data: [
      { key: '1', label: '1', value: '1' },
      { key: '2', label: '2', value: '2' },
      { key: '3', label: '3', value: '3' },
    ],
    publisher: { fnKey: 'onChange', id: 'a' }
  },
  {
    id: 'TABS#2',
    type: 'Tabs',
    position: {
      x: 600,
      y: 80,
    },
    data: [
      { key: 'a', label: 'a', value: '1' },
      { key: 'b', label: 'b', value: '2' },
      { key: 'c', label: 'c', value: '3' },
    ]
  },
  {
    id: 'Loading#1',
    type: 'Loading',
    position: {
      x: 0,
      y: 80,
    },
    data: [
      { key: 'a', label: 'a', value: '1' },
      { key: 'b', label: 'b', value: '2' },
      { key: 'c', label: 'c', value: '3' },
    ]
  }
]

const renderComponent = (component: any): React.ReactChild | React.ReactChild[] => {
  if (component.subscriber) {
    return (
      <SubscribeContainer subscriberID={component.subscriber.id} parser={component.subscriber.parser}>
        <component.type data={component.data} attr={component.attr} />
      </SubscribeContainer>
    )
  }
  if (component.publisher) {
   return (
      <PublishContainer publishID={component.publisher.id} fnKey={component.publisher.dnKey}>
        <component.type data={component.data} attr={component.attr} />
      </PublishContainer>
    )
  }
  return (
    <component.type data={component.data} attr={component.attr} />
  )
}

const App = () => {

  const [container, setContainer] = useState<HTMLDivElement | null>(null)
  const [ds, setDs] = useState<any[]>(
    data
      .map((item: any) => ({
        ...item,
        type: componentsMap.get(item.type)
      }))
    )

  const changePosition = (component: any, position: { dx: number; dy: number }) => {
    setDs(ds => {
      return ds.map((item, _idx) => {
        if (component.id === item.id) {
          return {
            ...item,
            position: {
              x: item.position.x + position.dx,
              y: item.position.y + position.dy,
              zIndex: item.position.zIndex,
            }
          }
        }
        else return item
      })
    })
  }

  console.log(ds, 'data...')

  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'rgb(13, 28, 38)',
      }}
      ref={setContainer}
    >
      {/* BUG:订阅组件和发布组件渲染的顺序对于初始值会有影响 */}
      {
        ds.map((component) => (
          <Moveable
            key={component.id}
            container={container}
            position={component.position}
            onMove={(position) => {
              changePosition(component, position);
            }}
          >
            {
              renderComponent(component)
            }
          </Moveable>
        ))
      }
    </div>
  )
};

export default App;
