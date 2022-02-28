import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { Collection } from "typescript";
import { getAllMessageByUser, getFriendID, MESSAGES_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import {
  requestLoadMessageItemSuccess,
  requestLoadMessages1,
  requestLoadMessagesSuccess1,
  updateChatID,
} from "../../features/chat/chatSlice";
import {
  updateLoadingTime,
  updateTab,
} from "../../features/global/deviceSlice";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem } from "../../models/chat";
import { RootState } from "../../store";
import ChatScreen from "./ChatScreen";
import Header from "./Header";
import InputFrame from "./InputFrame";
import { ChatListData } from "../../models/chat";

interface Props {}
export interface Params {
  friendID: string;
}
export const ChatMainContext = React.createContext<ChatListData | null>(null);
export interface ChatCollection {
  id: string;
  content: ChatItem;
}
const ChatFrame = (props: Props) => {
  const dispatch = useDispatch();
  const params = useParams() as Params;
  const chatMain = useSelector((state: RootState) => state.chat.chatList);
  const [chatDetail, setChatDetail] = useState<ChatListData>();
  const user = useSelector((state: RootState) => state.signUp.myAccount);

  useEffect(() => {

    const chatItem = chatMain && chatMain.filter(item=>item.id === params.friendID)[0];
    if(chatItem){
      setChatDetail(chatItem)
    }
  }, [chatMain,params]);

  return (
    <ChatMainContext.Provider value={chatDetail as ChatListData}>
      <Header />
      <ChatScreen />
      <InputFrame />
    </ChatMainContext.Provider>
  );
};

export default ChatFrame;
