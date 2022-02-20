import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import useGetUser from "../../hooks/useGetUser";
import { ChatListItem } from "../../models/chat";
import { ChatMainContext, Params } from "./ChatFrame";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  const user = useContext(ChatMainContext)?.content;

  useEffect(() => {
    const main = document.getElementById("chat__main");
    const list = document.getElementsByClassName(
      "message__item"
    ) as HTMLCollectionOf<HTMLElement>;
    if (list && list.length > 0) {
      const lastItem = list.item(list.length - 1);
      if (lastItem) {
        const height = lastItem.getBoundingClientRect().top;
        main && main.scrollTo(0, height);

      }
    }
    
  }, [user]);

  return (
    <div className="chat__screen" id="chat__main">
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
