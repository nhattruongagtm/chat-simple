import React, { useContext, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem as Chat, ChatListItem } from "../../models/chat";
import { ChatMainContext, Params } from "./ChatFrame";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  const user = useContext(ChatMainContext)?.content;
  const heightRef = useRef<number>(0);
  useEffect(() => {
    const main = document.getElementById("chat__main");
    const list = document.getElementsByClassName(
      "message__item"
    ) as HTMLCollectionOf<HTMLElement>;
    if (list && list.length > 0) {
      const lastItem = list.item(list.length - 1);

      let height = 0;

      if (lastItem) {
        const itemHeight = lastItem.getBoundingClientRect().height;

        for (let i = 0; i < list.length; i++) {
          const item = list.item(i);
          if (item) {
            height += item.getBoundingClientRect().height;
          }
          heightRef.current = height + itemHeight;
          main && main.scrollTo(0, heightRef.current);
        }
      }
    }
  }, [user]);

  return (
    <div className="chat__screen" id="chat__main">
      <div className="chat__screen__main">
        {user && user.messages.length > 1
          ? user.messages.map((msg, index) => (
              <ChatItem
                own={msg.ownID !== user.friendID ? true : false}
                key={index}
                msg={msg}
                space={
                  index > 0 ? user.messages[index - 1].createdDate : Date.now()
                }
              />
            ))
          : user &&
            user.messages.length === 1 &&
            user.messages[0].content === null && (
              <h1 className="chat__greetings">Nhắn tin với {user.name} nhé!</h1>
            )}
      </div>
    </div>
  );
};

export default ChatScreen;
