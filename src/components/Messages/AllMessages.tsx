import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { getAllMessageByUser, getFriendID, MESSAGES_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem, ChatListItem } from "../../models/chat";
import { RootState } from "../../store";
import MessaggeItem from "./MessaggeItem";

type Props = {};

const AllMessages = (props: Props) => {
  const loadMessage = useSelector((state: RootState) => state.chat);
  const { loading, chatList } = loadMessage;
  const [messages, setMessages] = useState<ChatListItem[]>();
  const uid = useGetUser()?.uid;
  const size = useRef<number>(0);
  const messagesRef = useRef<ChatListItem[]>([]);
  useEffect(() => {
    let isCancel = false;
    const displayAllMessages = async () => {
      if (uid) {
        const list = await getAllMessageByUser(uid);
        let result: ChatListItem[] = [];

        size.current = list.length;

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
                  name: `${friend.firstName} ${friend.lastName}`,
                  status: false,
                  isActive: false,
                  messages: messages,
                };
                const index = result.findIndex(
                  (mes) => mes.friendID === item.friendID
                );
                if (index !== -1) {
                  result.splice(index, 1, item);
                } else {
                  result = [...result, item];
                }
                messagesRef.current = result;

                if (!isCancel) {
                  // setTimeout(() => {
                  setMessages(messagesRef.current);
                  // }, 1000);
                }
              }
            }
          });
        }
      }
    };

    // call function
    displayAllMessages();

    // clear function
    return () => {
      isCancel = true;
    };
  }, [uid]);

  // useEffect(()=>{
  //   setTimeout(()=>{
  //     if(messagesRef.current.length > 0){
  //       setMessages(messagesRef.current)
  //     }
  //   },1000)
  // },[uid])

  const MessageLoading = () => {
    return <div className="all__message__item--layer"></div>;
  };

  return (
    <div className="all__message">
      <div className="all__message__title">
        <i className="fas fa-envelope"></i>
        <span>All Message</span>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="all__message__main">
        {messages && messages.length > 0
          ? messages
              .sort((a, b) => {
                return a.messages[0].createdDate - b.messages[0].createdDate;
              })
              .map((message) => (
                <MessaggeItem
                  msg={message}
                  key={`${message + (Math.random() * 10000).toString()}`}
                />
              ))
          : (size.current > 0 || (messages && messages.length < 1)) &&
            Array.from(new Array(size.current)).map((item, index) => (
              <MessageLoading key={index} />
            ))}
      </div>
    </div>
  );
};

export default AllMessages;
