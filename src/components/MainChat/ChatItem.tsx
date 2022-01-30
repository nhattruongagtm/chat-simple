import React from "react";

interface ChatItemProps {}

const ChatItem = (props: ChatItemProps) => {
  return (
    <>
      <div className="message__item">
        <div className="avatar message__item__avatar">
          <img src="./assets/avatar2.svg" alt="" />
        </div>
        <div className="message__item__content">
          <p>How's it going?</p>
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
      <div className="message__item message__item__client">
        <div className="avatar message__item__avatar">
          <img src="./assets/avatar2.svg" alt="" />
        </div>
        <div className="message__item__content">
          <p>Not bad, about you?</p>
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
    </>
  );
};

export default ChatItem;
