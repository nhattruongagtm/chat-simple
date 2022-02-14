import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getWaitingList } from "../../api/chat";
import { openSearchUserPopup } from "../../features/auth/modalSlice";
import { requestAddFriend } from "../../features/chat/friendsSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import AllMessages from "./AllMessages";
import MessageList from "./MessageList";
import SearchFrame from "./SearchFrame";

interface MessagePanelProps {}

interface AvatarProps{
  name: string
}
const fakes = [
  {
    uid: "sdfsd",
    firstName: "Nhat",
    lastName: "Truong",
    createdDate: Date.now(),
    email: "nhattruongagtm@gmail.com",
    password: "",
    photoUrl:
      "https://toigingiuvedep.vn/wp-content/uploads/2022/01/hinh-anh-avatar-cute-meo-simmy-600x600.jpg",
    friends: [],
  },
  {
    uid: "sdfsd",
    firstName: "Black",
    lastName: "Siu",
    createdDate: Date.now(),
    email: "nhattruongagtm@gmail.com",
    password: "",
    photoUrl:
      "https://pdp.edu.vn/wp-content/uploads/2021/01/anh-avatar-dep-dai-dien-facebook-zalo.jpg",
    friends: [],
  },
];

export const MessagePanel = (props: MessagePanelProps) => {
  const dispatch = useDispatch();
  const user = useGetUser();
  const handleSearchUser = () => {
    dispatch(openSearchUserPopup());
  };
  const [waitingList, setWaitingList] = useState<User[]>([]);
  useEffect(() => {
    const getWaiting = async () => {
      try {
        const result = await getWaitingList(user?.uid as string,1);
        setWaitingList(result)
      } catch (error) {
        console.log(error);
      }
    };
    getWaiting()
  }, [user]);
  const Avatar = ({name}: AvatarProps) =>{
    return (
      <div className="message__panel__avatar">
        <span>{name}</span>
    </div>
    )
  }
  const handleAcceptFriend = (uid: string) =>{
    dispatch(requestAddFriend({uid: user?.uid as string,fid: uid,type: 1}))
  }
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
            {waitingList &&
              waitingList.reverse().map((item) => (
                <div className="message__user__notify" key={item.uid}>
                 {item.photoUrl !== '' ? (
                <img
                src={item.photoUrl}
                alt=""
                className="message__user__notify__avatar"
              />
              ):(
                <Avatar name={item.firstName[0].toUpperCase()}/>
              )
              }
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
                        <span className="message__request" onClick={()=>handleAcceptFriend(item.uid)}>Accept</span>
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
