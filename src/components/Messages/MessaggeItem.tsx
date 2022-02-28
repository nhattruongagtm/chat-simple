import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { requestLoadDetail } from "../../features/chat/chatSlice";
import { updateTab } from "../../features/global/deviceSlice";
import { User } from "../../models/auth";
import { ChatItem, ChatListData } from "../../models/chat";
import { RootState } from "../../store";
import { Params } from "../MainChat/ChatFrame";
import { OwnChat } from "./AllMessages";
import { Avatar } from "./MessagePanel";

type MessaggeItemProps = {
  msg: ChatListData;
};

export const getTime = (number: number) => {
  let result = "";
  const now = Date.now();
  const second = (now - number) / 1000;
  if (second < 0) {
    result = "vừa mới";
  } else if (second <= 60 * 60 * 24) {
    result = new Date(number).toLocaleTimeString().slice(0, 5);
  } else {
    const dateTime = new Date(number).toLocaleDateString().split("/");
    result = `${Number(dateTime[0]) > 10 ? dateTime[0] : `0${dateTime[0]}`}/${
      Number(dateTime[1]) > 10 ? dateTime[0] : `0${dateTime[1]}`
    }`;
  }
  return result;
};

const MessaggeItem = ({ msg }: MessaggeItemProps) => {
  const {messages: msgs} = msg


  const history = useHistory();
  const dispatch = useDispatch();
  const newMessage = msgs[msgs.length - 1];
  const { data } = newMessage;
  // const fullName = `${user[0].firstName} ${user[0].lastName}`;
  const fullName = msg.name;
  const path = useLocation().pathname.split("/").pop();
  const device = useSelector((state: RootState) => state.device);

  const handleLoadDetail = () => {
    path !== msg.id && history.push(`/me/${msg.id}`);
    // path && dispatch(requestLoadDetail(msg.messages));
    if (device.width <= 480) {
      dispatch(updateTab(1));
    }
  };
  // const getLastMessage = () => {
  //   const { messages } = msg;
  //   for (let i = messages.length - 1; i > 0; i--) {
  //     if (messages[i].status !== 1) {
  //       return messages[i];
  //     }
  //   }
  // };



  return (
    <div
      className={
         msg.id === path
          ? "all__message__item all__message__item--active"
          : "all__message__item"
      }
      onClick={handleLoadDetail}
    >
      <div className="message__item__avatar">
        {msg.avatar[0] !== "" ? (
          <img src={msg.avatar[0]} alt="" />
        ) : (
          <Avatar name={fullName} />
        )}
        <div className="icon--active"></div>
      </div>
      <div className="notify__name__info message__item__name">
        <p className="name">{fullName}</p>
        <p className="message message__item__content message__item__content--activ e">
          {data.content.text !== ""
            ? data.content.text
            : `Nhắn tin ngay với ${fullName} ngay!`}
        </p>
      </div>
      <div className="message__item__time">{getTime(data.createdDate)}</div>
    </div>
  );
};

export default MessaggeItem;
