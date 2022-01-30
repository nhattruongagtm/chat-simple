import React from "react";
import MessaggeItem from "./MessaggeItem";

type Props = {};

export interface MessageItem {
  id: number;
  userClient: number;
  avatarClient: string;
  nameClient: string;
  time: Date;
  content: string;
}
const AllMessages = (props: Props) => {
  const messages: MessageItem[] = [
    {
      id: 1,
      userClient: 1,
      nameClient: "Smith Ava",
      avatarClient: "http://localhost:3000/assets/avatar1.svg",
      time: new Date(),
      content: "How's is going?",
    },
    {
      id: 2,
      userClient: 1,
      nameClient: "Simon",
      avatarClient: "http://localhost:3000/assets/avatar2.svg",
      time: new Date(),
      content: "Not bad, How about you, Ava?",
    },
  ];
  return (
    <div className="all__message">
      <div className="all__message__title">
        <i className="fas fa-envelope"></i>
        <span>All Message</span>
        <i className="fas fa-ellipsis-h"></i>
      </div>
      <div className="all__message__main">
        {
            messages.map((message)=>(
                <MessaggeItem msg={message} key={message.id}/>
            ))
        }
      </div>
    </div>
  );
};

export default AllMessages;
