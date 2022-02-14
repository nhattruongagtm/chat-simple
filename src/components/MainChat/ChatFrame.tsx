import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { ChatListItem } from "../../models/chat";
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
  const params = useParams() as Params;
  const chatMain = useSelector(
    (state: RootState) => state.chat.chatList.messages
  );
  const [chatFrame, setChatFrame] = useState<ChatListItem>();

  useEffect(() => {
    const newChat = chatMain.filter(
      (item) => item.friendID === params.friendID
      );
      console.log(chatMain)
    if (newChat.length > 0) {
        setChatFrame(newChat[0]);
        
    }
  }, [params.friendID,chatMain]);

  return (
    <ChatMainContext.Provider value={chatFrame as ChatListItem}>
      <Header />
      <ChatScreen />
      <InputFrame />
    </ChatMainContext.Provider>
  );
};

export default ChatFrame;
