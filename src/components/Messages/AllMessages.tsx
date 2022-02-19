import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getAllMessageByUser, getFriendID, MESSAGES_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem, ChatList, ChatListItem } from "../../models/chat";
import { RootState } from "../../store";
import MessaggeItem from "./MessaggeItem";

type Props = {};

const AllMessages = (props: Props) => {
  const loadMessage = useSelector((state: RootState) => state.chat);
  const { loading, chatList } = loadMessage;
  const [messages, setMessages] = useState<ChatListItem[]>();
  const uid = useGetUser()?.uid;
  useEffect(() => {
    setMessages(chatList.messages.filter((message) => message.status === true));
  }, [chatList]);
  useEffect(() => {
    let isCancel = false
    const displayAllMessages = async () => {
      if (uid) {
        const list = await getAllMessageByUser(uid);
        let result: ChatListItem[] = [];
        for (let i = 0; i < list.length; i++) {
          const ref = doc(db, MESSAGES_DOC, list[i]);
          onSnapshot(ref, async (doc) => {
            if (doc.exists()) {
              const ids = doc.id.split("-");
              const friend = await getUserByID(getFriendID(uid, ids));

              const messages = doc.data().messages as ChatItem[];

              if (friend) {
                const item: ChatListItem = {
                  avatar: friend.photoUrl,
                  friendID: friend.uid,
                  name: `${friend.lastName} ${friend.lastName}`,
                  status: false,
                  isActive: false,
                  messages: messages,
                };
                result = [...result, item];
              }
            }
          });
        }
        if(!isCancel){
          setMessages(result);
        }
      }
    };

    // call function
    // displayAllMessages()

    // clear function
    return () =>{
      isCancel = true
    }

  }, []);

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
