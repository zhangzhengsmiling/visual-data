import React, { useState, useEffect } from 'react';
import ContextPositionAbsolute, {
  PositionAbsoluteContainer,
  createPositionAbsoluteContainerValue,
} from '@/base/ContextPositionAbsolute';
import Text from '@/Text';
import Container from '@/Container';
import Tabs from '@/Tabs';
import SubscribeContainer from '@/base/SubscribeContainer';
import PublishContainer from '@/base/PublishContainer';
import Moveable from '../Movable';

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

const App = () => {

  const [container, setContainer] = useState<HTMLDivElement | null>(null)

  const [ds, setDs] = useState<any[]>([
    {
      id: 'CONTAINER#1',
      type: Container,
      style: {
        x: 440,
        y: 20,
        width: 100,
        height: 100,
      },
    },
    {
      id: 'CONTAINER#2',
      type: Container,
      style: {
        x: 20,
        y: 20,
        width: 100,
        height: 100,
      },
    },
    {
      id: "CONTAINER#3",
      type: Container,
      style: {
        x: 860,
        y: 20,
        width: 100,
        height: 100,
      },
    },
    {
      id: 'TEXT#1',
      type: Text,
      style: {
        x: 440,
        y: 20,
        zIndex: 1,
      },
      data: {
        title: '我好吗？太阳如常升起。'
      }
    },
    {
      id: 'TABS#1',
      type: Tabs,
      style: {
        x: 400,
        y: 80
      },
      data: [
        { key: '1', label: '1', value: '1' },
        { key: '2', label: '2', value: '2' },
        { key: '3', label: '3', value: '3' },
      ]
    }
  ])

useEffect(() => {
  setTimeout(() => {
    setDs(ds => ds.map(item => {
      if (item.id === 'TEXT#1') {
        return {
          ...item,
          data: {
            title: '我很好啊'
          }
        }
      }
      return item
    }))
  }, 3000)
}, [])

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
            <Moveable key={component.id} container={container} position={{ x: component.style.x, y: component.style.y }} onMove={(position) => {
              setDs(ds => {
                return ds.map((item, _idx) => {
                  if (component.id === item.id) {
                    return {
                      ...item,
                      style: {
                        x: item.style.x + position.dx,
                        y: item.style.y + position.dy
                      }
                    }
                  }
                  else return item
                })
              })
            }}>
              <component.type data={component.data} />
            </Moveable>
        ))
      }
    </div>
  )
  return (
    <div
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        background: 'rgb(13, 28, 38)',
      }}
    >
      {/* BUG:订阅组件和发布组件渲染的顺序对于初始值会有影响 */}
      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(440, 20)}>
        <PositionAbsoluteContainer>
          <Container />
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>
      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(20, 20)}>
        <PositionAbsoluteContainer>
          <Container />
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>
      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(860, 20)}>
        <PositionAbsoluteContainer>
          <Container />
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>
      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(440, 440)}>
        <PositionAbsoluteContainer>
          <Container />
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>

      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(20, 20, 1)}>
        <PositionAbsoluteContainer>
          <SubscribeContainer subscriberID="a">
            <Text />
          </SubscribeContainer>
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>

      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(860, 20, 1)}>
        <PositionAbsoluteContainer>
          <SubscribeContainer subscriberID="b">
            <Text />
          </SubscribeContainer>
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>

      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(440, 20)}>
        <PositionAbsoluteContainer>
          <PublishContainer publishID="a" fnKey="onChange">
            <Tabs
              defaultValue="b"
              data={[
                { key: 'a', label: 'a', value: 'a' },
                { key: 'b', label: 'b', value: 'b' },
                { key: 'c', label: 'c', value: 'c' },
                { key: 'd', label: 'd', value: 'd' },
              ]}
            />
          </PublishContainer>
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>

      <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(440, 440)}>
        <PositionAbsoluteContainer>
          <PublishContainer publishID="b" fnKey="onChange">
            <Tabs
              defaultValue="c"
              data={[
                { key: 'a', label: '123', value: '123' },
                { key: 'b', label: '456', value: '456' },
                { key: 'c', label: '789', value: '789' },
                { key: 'd', label: 'abc', value: 'abc' },
              ]}
            />
          </PublishContainer>
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>
    </div>
  );
};

export default App;
