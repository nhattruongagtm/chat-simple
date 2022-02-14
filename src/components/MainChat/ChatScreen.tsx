import React, { useContext, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { ChatItem as Chat } from "../../models/chat";
import { RootState } from "../../store";
import { ChatMainContext, Params } from "./ChatFrame";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  const user = useContext(ChatMainContext);
  const params: Params = useParams();
  const [messages, setMessages] = useState<Chat[]>(user?.messages as Chat[]);
  const listDetail = useSelector((state: RootState)=>state.chat.chatDetail)
  useEffect(() => {
    setMessages(listDetail);
  }, [params.friendID, user,listDetail]);
  // useEffect(() => {
  //   setMessages(user?.messages as Chat[]);
  // }, [params.friendID, user]);
  return (
    <div className="chat__screen">
      <div className="chat__screen__main">
        {user &&
          messages &&
          messages.map((msg, index) => (
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
