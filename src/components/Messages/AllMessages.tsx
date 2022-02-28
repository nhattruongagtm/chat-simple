import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllMessageByUser,
  getFriendID,
  getFriends,
  getRoomList,
  MESSAGES_DOC,
} from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { ChatData, ChatItem, ChatList, ChatListData } from "../../models/chat";
import { RootState } from "../../store";
import MessaggeItem from "./MessaggeItem";

type Props = {};
export interface OwnChat {
  user: User[];
  data: ChatListData[];
}

const AllMessages = (props: Props) => {
  const [messages, setMessages] = useState<OwnChat>();
  const chatMain = useSelector((state: RootState) => state.chat.chatList);
  const user = useSelector((state: RootState) => state.signUp.myAccount);
  const size = useRef<number>(0);
  
  useEffect(() => {
    let isCancel = false;
    const displayAllMessages = async () => {
      if (user.uid) {

        let result: ChatListData[] = [];
        const list = await getRoomList(user.uid);
        size.current = list.length;

        for (let i = 0; i < list.length; i++) {

          let partner: User[] = [];
          const ref = doc(db, MESSAGES_DOC, list[i].id);
          
          onSnapshot(ref, async (doc) => {
            if (doc.exists()) {
              const data = doc.data() as ChatList;
              const { images, members, messages, type, isActive, status,name } =
                data;

              let friends: User[] = [];


              if (Number(members.length) === 2) {
                const idPartner = members.filter(
                  (item) => item.id !== user.uid
                )[0];
                if (idPartner) {
                  const friend = await getUserByID(idPartner.id);
                  friend && partner.push(friend);
                }
              }
              else{
                 
              members.filter(item=>item.id !== user.uid).forEach(async item=>{
                const friend = await getUserByID(item.id);
                friend && partner.push(friend);

              })
              }

              for (let i = 0; i < members.length; i++) {
                const friend = await getUserByID(members[i].id);

                if (friend) {
                  friend.password = "***************";
                  friends.push(friend);
                }
              }
              let chatDatas: ChatData[] = [];

              for (let i = 0; i < messages.length; i++) {
                const item = messages[i];

                try {
                  const friend = await getUserByID(item.ownID);

                if (friend) {
                  const chatData: ChatData = {
                    friend: friend,
                    data: item,
                  };
                  chatDatas.push(chatData);
                }
                } catch (error) {
                  console.log(error)
                }
              }
              const newData: ChatListData = {
                avatar:
                  (type === 0 && partner.length === 1) 
                    ? [partner[0].photoUrl]
                    : [...getFriends(partner)],
                name: (partner.length > 0 && name) ? name : `${partner[0].firstName} ${partner[0].lastName}`,
                id: doc.id,
                images: images,
                members: members,
                isActive: isActive,
                status: status,
                type: type,
                friends: friends,
                messages: chatDatas,
              };

              const index = result.findIndex((mes) => mes.id === doc.id);
              if (index > -1) {
                result = result.filter((mes, ind) => ind !== index);
              }
              result = [...result, newData];



              if (!isCancel) {
                setMessages({
                  user: partner,
                  data: result,
                });
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
  }, [user]);

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
        {messages && messages.data.length > 0
          ? messages.data
              .sort((a, b) => {
                return (
                  b.messages[b.messages.length - 1].data.createdDate -
                  a.messages[a.messages.length - 1].data.createdDate
                );
              })
              .map((message) => (
                <MessaggeItem
                  msg={message}
                  key={`${message + (Math.random() * 10000).toString()}`}
                />
              ))
          : (size.current > 0 || (messages && messages.data.length < 1)) &&
            Array.from(new Array(size.current)).map((item, index) => (
              <MessageLoading key={index} />
            ))}
      </div>
    </div>
  );
};

export default AllMessages;
