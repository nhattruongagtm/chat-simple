import React, { useContext, useState } from "react";
import { useParams } from "react-router";
import useGetUser from "../../hooks/useGetUser";
import { ChatListItem } from "../../models/chat";
import { ChatMainContext, Params } from "./ChatFrame";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  const user = useContext(ChatMainContext);

  return (
    <div className="chat__screen">
      <div className="chat__screen__main">
        {user &&
          user.messages.map((msg, index) => (
            <ChatItem
              own={msg.ownID !== user.friendID ? true : false}
              key={index}
              msg={msg}
            />
          ))}
      </div>
    </div>
  );
};

export default ChatScreen;
