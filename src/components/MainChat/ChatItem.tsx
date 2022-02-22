import React, { useContext } from "react";
import { ChatItem as Chat, ContentFile } from "../../models/chat";
import { getTime } from "../Messages/MessaggeItem";
import { ChatMainContext } from "./ChatFrame";

interface ChatItemProps {
  own: boolean;
  msg: Chat;
  space: number;
}
interface SpaceTimeProps {
  time: number;
}
const SpaceTime = ({ time }: SpaceTimeProps) => {

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

      result = `${new Date(number).getDay() + 1} ${result}`;
    }
    return result;
  };
  return (
    <div className="space__time">
      <p>{getTime(time)}</p>
    </div>
  );
};

const ChatItem = ({ own, msg,space}: ChatItemProps) => {
  const content = msg.content as ContentFile;
  const spaceTime = Math.floor((msg.createdDate - space) / 1000)
  // console.log(spaceTime)
  return (
    <>
      {(spaceTime < 2*60 && spaceTime > 60) ? <div className="empty__space"></div> : (spaceTime > 1000) && <SpaceTime time={msg.createdDate} />}
      {(content.media.length > 0 || content.text !== "") && (
        <>
          {msg.content && (
            <div
              className={
                own === false
                  ? "message__item"
                  : "message__item message__item--client"
              }
            >
              <div className="avatar message__item__avatar">
                <i className="fa-regular fa-circle-check"></i>
                {/* <img src={user?.avatar} alt=""/> */}
                {/* <i className="fa-solid fa-circle-check"></i> */}
              </div>
              <div className="message__item__content">
                {content.media.length > 0 && (
                  <div className="message__item__attach">
                    {content.media.map((item, index) => (
                      <img
                        src="https://www.timeoutdubai.com/cloud/timeoutdubai/2021/09/11/hfpqyV7B-IMG-Dubai-UAE.jpg"
                        alt={item}
                        key={index}
                      />
                    ))}
                  </div>
                )}
                {msg.content.text !== "" && (
                  <p className={own === true ? "" : "message--client"}>
                    {msg.content.text}
                  </p>
                )}

                <div className="message__item__features"></div>
              </div>
              <div className="message__item__more">
                <div className="message__item__more__icons">
                  <i className="far fa-grin-beam"></i>
                  <i className="fas fa-reply"></i>
                  <i className="fas fa-ellipsis-v"></i>
                </div>
                <div className="message__item__more__time">
                  {getTime(msg.createdDate)}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default ChatItem;
