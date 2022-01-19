import React from 'react';
import ContextPositionAbsolute, {
  PositionAbsoluteContainer,
  createPositionAbsoluteContainerValue,
} from '@/base/ContextPositionAbsolute';
import Text from '@/Text';
import Container from '@/Container';
import Tabs from '@/Tabs';
import SubscribeContainer from '@/base/SubscribeContainer';
import PublishContainer from '@/base/PublishContainer';

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
  // { type: Tabs, style: {}, data: {}, interactive: {} },
  // { type: Tabs, style: {}, data: {}, interactive: {} },
];

const data = [
  {
    type: Container,
    style: {
      x: 440,
      y: 20,
      width: 100,
      height: 100,
    },
  },
  {
    type: Container,
    style: {
      x: 20,
      y: 20,
      width: 100,
      height: 100,
    },
  },
  {
    type: Container,
    style: {
      x: 860,
      y: 20,
      width: 100,
      height: 100,
    },
  },
  {
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
];

const App = () => {

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
      {
        data.map(item => (
          <ContextPositionAbsolute.Provider value={createPositionAbsoluteContainerValue(item.style.x, item.style.y, item.style.zIndex !== undefined ? item.style.zIndex : 0)}>
            <PositionAbsoluteContainer>
              <item.type data={item.data} />
            </PositionAbsoluteContainer>
          </ContextPositionAbsolute.Provider>
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
              value={[
                { key: 'a', title: 'a' },
                { key: 'b', title: 'b' },
                { key: 'c', title: 'c' },
                { key: 'd', title: 'd' },
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
              value={[
                { key: 'a', title: '123' },
                { key: 'b', title: '456' },
                { key: 'c', title: '789' },
                { key: 'd', title: 'abc' },
              ]}
            />
          </PublishContainer>
        </PositionAbsoluteContainer>
      </ContextPositionAbsolute.Provider>
    </div>
  );
};

export default App;
