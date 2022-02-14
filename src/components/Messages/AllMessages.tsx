import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ChatListItem } from "../../models/chat";
import { RootState } from "../../store";
import MessaggeItem from "./MessaggeItem";

type Props = {};

const AllMessages = (props: Props) => {
  const loadMessage = useSelector((state: RootState) => state.chat);
  const { loading, chatList } = loadMessage;
  const [messages, setMessages] = useState<ChatListItem[]>();
  useEffect(() => {
    setMessages(chatList.messages.filter(message=>message.status === true));
  }, [chatList]);

  return (
    <div className="all__message">
      <div className="all__message__title">
        <i className="fas fa-envelope"></i>
        <span>All Message</span>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="all__message__main">
        {messages &&
          messages.map((message) => (
            <MessaggeItem msg={message} key={message.friendID} />
          ))}
      </div>
    </div>
  );
};

export default AllMessages;
