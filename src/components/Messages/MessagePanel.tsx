import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getWaitingList } from "../../api/chat";
import { openSearchUserPopup } from "../../features/auth/modalSlice";
import { requestAddFriend } from "../../features/chat/friendsSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { RootState } from "../../store";
import AllMessages from "./AllMessages";
import MessageList from "./MessageList";
import SearchFrame from "./SearchFrame";

interface MessagePanelProps {}

interface AvatarProps {
  name: string;
}


export const MessagePanel = (props: MessagePanelProps) => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const device = useSelector((state: RootState) => state.device);
  const isMobile = device.width <= 480 ? true : false;
  const loadingTime = device.loadingTime;


  const handleSearchUser = () => {
    dispatch(openSearchUserPopup());
  };
  const [waitingList, setWaitingList] = useState<User[]>([]);

  useEffect(() => {
    const getWaiting = async () => {
      try {
        const result = await getWaitingList(user?.uid as string, 1);
        setWaitingList(result);
      } catch (error) {
        console.log(error);
      }
    };
    getWaiting();
  }, [user]);
  const Avatar = ({ name }: AvatarProps) => {
    return (
      <div className="message__panel__avatar">
        <span>{name}</span>
      </div>
    );
  };
  const handleAcceptFriend = (uid: string) => {
    dispatch(requestAddFriend({ uid: user?.uid as string, fid: uid, type: 1 }));
  };

  // useEffect(() => {
  //   const messagePanel = document.getElementById("message");
  //   if (messagePanel) {
  //     messagePanel.style.transition = `${0.5}s`;
  //   }
  // }, [loadingTime]);
  return (
    <div
      className={
        isMobile && device.tab === 0
          ? "message__panel"
          : "message__panel message__panel--display"
      }
      id="message"
    >
      <div className="message__panel__info">
        <div className="message__panel__info__user">
          <div className="message__user__header">
            <div className="message__panel__avatar">
              <img src={user?.photoUrl} alt="" />
            </div>
            <div className="message__panel__name">
              <div className="message__panel__name__absolute">
                <div className="message__panel__name__main">
                  <p className="name">
                    {user?.firstName} {user?.lastName}
                  </p>
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
                src={user?.photoUrl}
                alt=""
                className="message__user__notify__avatar"
              />
              <div className="notify__name__info">
                <p className="name">Messages</p>
                <p className="message">
                  <span className="mail"></span> <span>21</span> messages
                </p>
              </div>
              <div className="notify__name__status">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            {waitingList &&
              waitingList.reverse().map((item) => (
                <div className="message__user__notify" key={item.uid}>
                  {item.photoUrl !== "" ? (
                    <img
                      src={item.photoUrl}
                      alt=""
                      className="message__user__notify__avatar"
                    />
                  ) : (
                    <Avatar name={item.firstName[0].toUpperCase()} />
                  )}
                  <div className="notify__name__info message__user__request">
                    <p className="name">{`${item.firstName} ${item.lastName}`}</p>
                    <div className="message ">
                      {waitingList &&
                        waitingList.slice(1, 4).map((user) => (
                          <div className="requests" key={user.uid}>
                            <img
                              src={user.photoUrl}
                              alt=""
                              className="request__item"
                            />
                          </div>
                        ))}
                      <span className="mail"></span>{" "}
                      {waitingList && waitingList.length > 1 ? (
                        <>
                          <span>{waitingList.length}</span> requests
                        </>
                      ) : (
                        <span
                          className="message__request"
                          onClick={() => handleAcceptFriend(item.uid)}
                        >
                          Accept
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            <div className="message__user__create">
              <button onClick={handleSearchUser}>
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
