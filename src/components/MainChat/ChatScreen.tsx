import { doc, getDoc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { MESSAGES_DOC } from "../../api/chat";
import { db } from "../../config/firebase";
import { TypingItem, typingMessage } from "../../features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem as Chat, ChatListData } from "../../models/chat";
import { RootState } from "../../store";
import { ChatMainContext, Params } from "./ChatFrame";
import ChatItem from "./ChatItem";

type ChatScreenProps = {};

const ChatScreen = (props: ChatScreenProps) => {
  const user = useContext(ChatMainContext);
  const param: Params = useParams();
  const id = param.friendID;
  const dispatch = useDispatch();

  const myAccount = useSelector((state: RootState) => state.signUp.myAccount);
  const main = document.getElementById("chat__main");
  const height = main?.scrollHeight;
  useEffect(() => {
    main && height && main.scrollTo(0, height);
    
  }, [user,height]);

  useEffect(() => {
    const medias = document.querySelectorAll<HTMLElement>("#media__attach");
    if (medias) {
      for (let i = 0; i < medias.length; i++) {
        if (medias[i].childNodes.length > 4) {
          medias[i].classList.add("attach--2");
        }
      }
    }
  }, [user]);

 

  return (
    <div className="chat__screen" id="chat__main">
      <div className="chat__screen__main">
        {user && user.messages.length > 0
          ? user.messages.map((msg, index) => (
              <ChatItem
                own={msg && msg.data.ownID === myAccount.uid ? true : false}
                key={index}
                msg={msg.data}
                info={msg.friend}
                space={
                  msg && index > 0
                    ? user.messages[index - 1].data.createdDate
                    : Date.now()
                }
              />
            ))
          : user &&
            user.messages.length === 1 &&
            user.messages[0].data.content === null && (
              <h1 className="chat__greetings">Nhắn tin với {user.name} nhé!</h1>
            )}
      </div>
    </div>
  );
};

export default ChatScreen;
