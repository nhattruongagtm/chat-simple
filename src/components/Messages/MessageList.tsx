import React from "react";

type MessageListProps = {};

const MessageList = (props: MessageListProps) => {
  return (
    <div className="message__list">
      <div className="message__list__title">
        <p>
          <span>Message</span>
          <span>(29)</span>
        </p>
        <div className="message__title__icon">
        <i className="fas fa-edit"></i>
        </div>
      </div>
    </div>
  );
};

export default MessageList;