import React from "react";
import { useSelector } from "react-redux";
import { recallMessage } from "../../api/chat";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem as Chat, ContentFile } from "../../models/chat";
import { RootState } from "../../store";
import { getTime } from "../Messages/MessaggeItem";
import { User } from "../../models/auth";
import { info } from "console";
import { Avatar } from "../Messages/MessagePanel";
import { useLocation } from "react-router";
import { ThemeMessage } from "../Detail/Detail";
interface ChatItemProps {
  own: boolean;
  msg: Chat;
  space: number;
  info: User;
}
interface SpaceTimeProps {
  time: number;
}
interface RecallComponentProps {
  type: number;
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
      const dateTime = new Date(number).toLocaleTimeString().split("/");
      const d = dateTime.toString().split(":");
      result = `${d[0]}:${d[1]}`;
      result = `T${new Date(number).getDay() + 1} ${result}`;
    }
    return result;
  };
  return (
    <div className="space__time">
      <p>{getTime(time)}</p>
    </div>
  );
};

const ChatItem = ({ own, msg, space, info }: ChatItemProps) => {
  const content = msg.content as ContentFile;
  const spaceTime = Math.floor((msg.createdDate - space) / 1000);
  const chatID = useSelector((state: RootState) => state.chat.chatID);
  const uid = useGetUser()?.uid;
  const location = useLocation().pathname.split("/");
  const path = location[location.length - 1];
  const handleDisplayOptions = (e: React.TouchEvent<HTMLDivElement>) => {
    console.log("press");
  };

  const storage:ThemeMessage[] = useSelector((state: RootState)=>state.storage.theme);
  const theme = storage.find(item => item.id === path);
  const color = theme ? theme.color : "";

  console.log("color",color)


  // Detete: status code = 1, Recall: status code = 2

  const handleDeleteMessage = () => {
    recallMessage(chatID, msg, 1);
  };
  const handleRecallMessage = () => {
    recallMessage(chatID, msg, 2);
  };
  const RecallComponent = ({ type }: RecallComponentProps) => {
    return (
      <div
        className={
          type === 1
            ? "message__item recall__client message--client"
            : "message__item recall__client"
        }
      >
        <div className="avatar message__item__avatar">
          <i className="fa-regular fa-circle-check"></i>
        </div>
        <div className="message__recall">Tin nhắn đã được thu hồi</div>
      </div>
    );
  };
  return (
    <>
      {(msg.status === 0 || msg.status === 2) && (
        <>
          {spaceTime < 2 * 60 && spaceTime > 60 ? (
            <div className="empty__space"></div>
          ) : (
            spaceTime > 7000 && <SpaceTime time={msg.createdDate} />
          )}
          {(content.media.length > 0 ||
            content.video.length > 0 ||
            content.text !== "") && (
            <>
              {msg.status !== 2 ? (
                <>
                  {msg.content && (
                    <div
                      className={
                        own === false
                          ? "message__item"
                          : "message__item message__item--client"
                      }

                      // onTouchStart={handleDisplayOptions}
                    >
                      <div className="avatar message__item__avatar">
                        {msg.ownID === uid ? (
                          <>
                            {msg.sendStatus === 0 ? (
                              <i className="fa-regular fa-circle-check"></i>
                            ) : (
                              <i className="fa-solid fa-circle-check"></i>
                            )}
                          </>
                        ) : info.photoUrl !== "" ? (
                          <img src={info.photoUrl} alt="" />
                        ) : (
                          // <Avatar name={info.firstName} />
                          <img
                            src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-2.jpg"
                            alt=""
                          />
                        )}
                      </div>
                      <div className="message__item__content">
                        {(content.media.length > 0 ||
                          content.video.length > 0) && (
                          <div className="" id="media__attach">
                            {content.media.map((item, index) => (
                              <img src={item} alt={item} key={index} />
                            ))}

                            {content.video.map((item, index) => (
                              <video key={index} controls>
                                <source src={item} type="video/mp4"></source>
                              </video>
                            ))}
                          </div>
                        )}

                        {msg.content.text !== "" && (
                          <>
                            {own === false ? (
                              <p>{msg.content.text}</p>
                            ) : (
                              <p
                                className="message--client"
                                style={{ backgroundColor: color}}
                              >
                                {msg.content.text}
                              </p>
                            )}
                          </>
                        )}

                        {/* <div className="message__item__features"></div> */}
                      </div>
                      <div className="message__item__more">
                        <div className="message__item__more__icons">
                          <i className="far fa-grin-beam"></i>
                          <i className="fas fa-reply"></i>
                          {uid && uid === msg.ownID && (
                            <div className="delete__recall">
                              <i className="fas fa-ellipsis-v"></i>
                              <div className="message__item__delete">
                                <span onClick={handleDeleteMessage}>
                                  Delete
                                </span>
                                <span onClick={handleRecallMessage}>
                                  Recall
                                </span>
                              </div>
                            </div>
                          )}
                        </div>
                        <div className="message__item__more__time">
                          {getTime(msg.createdDate)}
                        </div>
                      </div>
                    </div>
                  )}
                </>
              ) : (
                <RecallComponent type={msg.ownID === uid ? 1 : 0} />
              )}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ChatItem;
