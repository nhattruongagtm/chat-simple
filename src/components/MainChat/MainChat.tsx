import React from 'react';
import ChatScreen from './ChatScreen';
import Header from './Header';
import InputFrame from './InputFrame';

type MainChatProps = {};

const MainChat = (props: MainChatProps) => {
  return <div className='main__chat'>
      <Header/>
      <ChatScreen/>
      <InputFrame/>
  </div>;
};

export default MainChat;
