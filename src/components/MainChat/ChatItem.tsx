import React, { useContext } from "react";
import { ChatItem  as Chat} from "../../models/chat";
import { ChatMainContext } from "./ChatFrame";

interface ChatItemProps {
  own: boolean
  msg: Chat
}

const ChatItem = ({own,msg}: ChatItemProps) => {
  const user = useContext(ChatMainContext)

  if(!msg.content){
    return <h1 className="chat__greetings">Nhắn tin với {user?.name} nhé!</h1>
  }
  return (
      <div className={own === false ? "message__item": "message__item message__item__client"}>
        <div className="avatar message__item__avatar">
          <img src={user?.avatar} alt="" />
        </div>
        <div className="message__item__content">
            <p>{msg.content}</p>
          
          <div className="message__item__features"></div>
        </div>
        <div className="message__item__more">
          <div className="message__item__more__icons">
            <i className="far fa-grin-beam"></i>
            <i className="fas fa-reply"></i>
            <i className="fas fa-ellipsis-v"></i>
          </div>
          <div className="message__item__more__time">
            12:05
          </div>
        </div>
      </div>
  );
};

export default ChatItem;
