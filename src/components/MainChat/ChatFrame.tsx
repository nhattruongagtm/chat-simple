import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Collection } from "typescript";
import { getAllMessageByUser, getFriendID, MESSAGES_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import {
  updateLoadingTime,
  updateTab,
} from "../../features/global/deviceSlice";
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
export const ChatMainContext = React.createContext<ChatCollection | null>(null);
export interface ChatCollection {
  id: string;
  content: ChatListItem;
}
const ChatFrame = (props: Props) => {
  const dispatch = useDispatch();
  const params = useParams() as Params;
  const uid = useGetUser()?.uid;
  const chatMain = useSelector(
    (state: RootState) => state.chat.chatList.messages
  );
  const chatDetail = useSelector((state: RootState) => state.chat.chatDetail);
  const [chatFrame, setChatFrame] = useState<ChatCollection>();

  useEffect(() => {
    let isCancel = false;
    const displayAllMessages = async () => {
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

                    const collection: ChatCollection = {
                      id: friendID,
                      content: chatItem,
                    };

                    setChatFrame(collection);
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
  }, [params]);

  return (
    <ChatMainContext.Provider value={chatFrame as ChatCollection}>
      <Header />
      <ChatScreen />
      <InputFrame />
    </ChatMainContext.Provider>
  );
};

export default ChatFrame;
