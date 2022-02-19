import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { getAllMessageByUser, getFriendID, MESSAGES_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import { updateLoadingTime, updateTab } from "../../features/global/deviceSlice";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem, ChatListItem } from "../../models/chat";
import { RootState } from "../../store";
import ChatScreen from "./ChatScreen";
import Header from "./Header";
import InputFrame from "./InputFrame";

interface Props {}
export interface Params {
  friendID: string;
}
export const ChatMainContext = React.createContext<ChatListItem | null>(null);

const ChatFrame = (props: Props) => {
  const dispatch = useDispatch()
  const params = useParams() as Params;
  const uid = useGetUser()?.uid;
  const chatMain = useSelector(
    (state: RootState) => state.chat.chatList.messages
  );
  const chatDetail = useSelector((state: RootState) => state.chat.chatDetail);
  const [chatFrame, setChatFrame] = useState<ChatListItem>();

  // useEffect(() => {
  //   let isCancel = false
  //   const chatSent = chatDetail[chatDetail.length - 1]
  //   if(!isCancel && chatFrame){
  //     const item: ChatListItem = {...chatFrame,messages: [...chatFrame.messages,chatSent]}
  //     setChatFrame(item)
  //   }
  //   return ()=>{
  //     isCancel = true
  //   }
  // }, [chatDetail]);

  useEffect(() => {
    let isCancel = false;
    const displayAllMessages = async () => {
      const startTime = Date.now();
      try {
        const user = chatMain.find((item) => item.friendID === params.friendID);
        if (uid) {
          const list = await getAllMessageByUser(uid);
          let messagesList: ChatListItem = {
            friendID: "",
            avatar: "",
            isActive: false,
            messages: [],
            name: "",
            status: false,
          };

          if (user) {
            const friendID = list.find(
              (item) => item.indexOf(user.friendID) !== -1
            );

            if (friendID) {
              const ref = doc(db, MESSAGES_DOC, friendID);
              onSnapshot(ref, async (doc) => {
                if (doc.exists()) {
                  const ids = friendID.split("-");
                  const messages = doc.data().messages as ChatItem[];
                  const friend = await getUserByID(getFriendID(uid, ids));
                  if (friend) {
                    const chatItem: ChatListItem = {
                      friendID: friend.uid,
                      name: `${friend.firstName} ${friend.lastName}`,
                      avatar: friend.photoUrl,
                      isActive: false,
                      messages: messages,
                      status: true,
                    };
                    messagesList = chatItem;
                    const endTime = Date.now()

                    const waitTime = (endTime - startTime)/1000
                    
                    dispatch(updateLoadingTime(waitTime+0.2))
                    setChatFrame(messagesList);
                  }
                }
              });
            }
          }
        }
      } catch (e) {
        console.log(e);
      }
    };
    if (!isCancel) {
      displayAllMessages();
    }
    return () => {
      isCancel = true;
    };
  }, [params, chatMain]);

  return (
    <ChatMainContext.Provider value={chatFrame as ChatListItem}>
      <Header />
      <ChatScreen />
      <InputFrame />
    </ChatMainContext.Provider>
  );
};

export default ChatFrame;
