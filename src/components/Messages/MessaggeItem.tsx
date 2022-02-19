import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation, useParams } from "react-router";
import { requestLoadDetail } from "../../features/chat/chatSlice";
import { updateTab } from "../../features/global/deviceSlice";
import { ChatListItem } from "../../models/chat";
import { RootState } from "../../store";
import { Params } from "../MainChat/ChatFrame";

type MessaggeItemProps = {
  msg: ChatListItem;
};

const getTime = (number: number) => {
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
  const history = useHistory();
  const dispatch = useDispatch();
  const newMessage = msg.messages[msg.messages.length - 1];
  const path = useLocation().pathname.split("/").pop();
  const device = useSelector((state: RootState)=>state.device)

  const handleLoadDetail = () =>{
    history.push(`/me/${msg.friendID}`)
    path && dispatch(requestLoadDetail(msg.messages))
    if(device.width <= 480){
      dispatch(updateTab(1))
    }
  }
  return (
    <div
      className={
        msg.friendID === path
          ? "all__message__item all__message__item--active"
          : "all__message__item"
      }
      onClick={handleLoadDetail}
    >
      <div className="message__item__avatar">
        <img
          src={msg.avatar}
          alt=""
          className="message__user__notify__avatar"
        />
        <div className="icon--active"></div>
      </div>
      <div className="notify__name__info message__item__name">
        <p className="name">{msg.name}</p>
        <p className="message message__item__content message__item__content--active">
          {newMessage.content !== null
            ? newMessage.content
            : `Nhắn tin ngay với ${msg.name} ngay!`}
        </p>
      </div>
      <div className="message__item__time">
        {getTime(newMessage.createdDate)}
      </div>
    </div>
  );
};

export default MessaggeItem;
