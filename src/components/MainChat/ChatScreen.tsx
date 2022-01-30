import React from "react";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  return (
    <div className="chat__screen">
      <div className="chat__screen__main">
        <ChatItem/>
      </div>
    </div>
  );
};

export default ChatScreen;
