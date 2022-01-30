import React from "react";
import AllMessages from "./AllMessages";
import MessageList from "./MessageList";
import SearchFrame from "./SearchFrame";

interface MessagePanelProps {}

export const MessagePanel = (props: MessagePanelProps) => {
  return (
    <div className="message__panel">
      <div className="message__panel__info">
        <div className="message__panel__info__user">
          <div className="message__user__header">
            <div className="message__panel__avatar">
              <img src="./assets/avatar1.svg" alt="" />
            </div>
            <div className="message__panel__name">
              <div className="message__panel__name__absolute">
                <div className="message__panel__name__main">
                  <p className="name">Carter Donin</p>
                  <p className="message">UI/UX Designer</p>
                </div>
                <div className="message__panel__name__more">
                  <i className="fas fa-ellipsis-h"></i>
                </div>
              </div>
            </div>
          </div>
          <div className="message__user__main">
            <div className="message__user__notify">
              <img
                src="./assets/avatar1.svg"
                alt=""
                className="message__user__notify__avatar"
              />
              <div className="notify__name__info">
                <p className="name">Carter Donin</p>
                <p className="message">
                  <span className="mail"></span> <span>21</span> messages
                </p>
              </div>
              <div className="notify__name__status">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            <div className="message__user__notify">
              <img
                src="./assets/avatar3.svg"
                alt=""
                className="message__user__notify__avatar"
              />
              <div className="notify__name__info message__user__request">
                <p className="name">Carter Donin</p>
                <div className="message message__request">
                  <div className="requests">
                    <img
                      src="./assets/avatar1.svg"
                      alt=""
                      className="request__item"
                    />
                    <img
                      src="./assets/avatar2.svg"
                      alt=""
                      className="request__item"
                    />
                    <img
                      src="./assets/avatar3.svg"
                      alt=""
                      className="request__item"
                    />
                  </div>
                  <span className="mail"></span> <span>3</span> requests
                </div>
              </div>
            </div>
            <div className="message__user__create">
              <button>
                <span>create new user</span> <i className="fas fa-plus"></i>
              </button>
            </div>
          </div>
        </div>
      </div>
      <MessageList />
      <SearchFrame />
      <AllMessages />
    </div>
  );
};
