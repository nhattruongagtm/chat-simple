import React from "react";
import { MessageItem } from "./AllMessages";

type MessaggeItemProps = {
    msg: MessageItem;
};

const getTime = (date : Date) =>{
    return date.toLocaleTimeString().slice(0,5);
}

const MessaggeItem = ({msg}: MessaggeItemProps) => {
  return (
    <div className="all__message__item all__message__item--active">
      <div className="message__item__avatar">
        <img
          src={msg.avatarClient}
          alt=""
          className="message__user__notify__avatar"
        />
        <div className="icon--active">

        </div>
      </div>
      <div className="notify__name__info message__item__name">
        <p className="name">{msg.nameClient}</p>
        <p className="message message__item__content message__item__content--active">
          {msg.content}
        </p>
      </div>
      <div className="message__item__time">{getTime(msg.time)}</div>
    </div>
  );
};

export default MessaggeItem;
