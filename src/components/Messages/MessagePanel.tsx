import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { USER_DOC } from "../../api/chat";
import { getUserByID } from "../../api/firestore";
import { db } from "../../config/firebase";
import { openSearchUserPopup } from "../../features/auth/modalSlice";
import { requestAddFriend } from "../../features/chat/friendsSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { RootState } from "../../store";
import AllMessages from "./AllMessages";
import SearchFrame from "./SearchFrame";

interface MessagePanelProps {}

interface AvatarProps {
  name: string;
}

export const Avatar = ({ name }: AvatarProps) => {
  return (
    <div className="message__panel__avatar avatar--no">
      <span>{name && name.split("")[0].toUpperCase()}</span>
    </div>
  );
};

export const MessagePanel = (props: MessagePanelProps) => {
  const dispatch = useDispatch();
  let user = useSelector((state: RootState) => state.signUp.myAccount);
  const device = useSelector((state: RootState) => state.device);
  const isMobile = device.width <= 480 ? true : false;

  const handleSearchUser = () => {
    dispatch(openSearchUserPopup());
  };

  const [waitingList, setWaitingList] = useState<User[]>([]);

  const handleAcceptFriend = (uid: string) => {
    dispatch(requestAddFriend({ uid: user.uid, fid: uid, type: 1 }));
  };

  useEffect(() => {
    let isCancel = false;
    const getWaitingList = async () => {
      if (user.uid !== "") {
        try {
          const waitingRef = doc(db, USER_DOC, user.uid);

          onSnapshot(waitingRef, async (doc) => {
            if (doc.exists()) {
              const data = doc.data() as User;
              const { friends } = data;

              const waitingList = friends.filter(
                (item) => !item.accept && item.type === 1
              );
              let result: User[] = [];
              for (let i = 0; i < waitingList.length; i++) {
                const element = waitingList[i];
                const friend = await getUserByID(element.id);

                if (friend) {
                  result = [...result, friend];
                }
              }
              if (!isCancel) {
                setWaitingList(result);
              }
            }
          });
        } catch (e) {
          console.log(e);
        }
      }
    };
    getWaitingList();
  }, [user]);

  const HeaderSkeleton = () => {
    return (
      <>
        <div className="message__user__header message__user__header--skeleton">
          <div className=" message__panel__avatar message__panel__avatar--skeleton">
            <div></div>
          </div>
          <div className="message__panel__name">
            <div className="message__panel__name__absolute">
              <div className="message__panel__name__main">
                <p className="name name--skeleton"></p>
                <p className="messasge message--skeleton"></p>
              </div>
              <div className="message__panel__name__more">
                <i className="fas fa-ellipsis-h"></i>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };

  const handleSearchFriends = (keyword: string) => {
    console.log(keyword);
  };
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
          {user.uid !== "" ? (
            <>
              <div className="message__user__header">
                <div className="message__panel__avatar">
                  {user && user.photoUrl !== "" ? (
                    <img src={user.photoUrl} alt="" />
                  ) : (
                    user &&
                    user.photoUrl === "" && <Avatar name={user.firstName} />
                  )}
                </div>
                <div className="message__panel__name">
                  <div className="message__panel__name__absolute">
                    <div className="message__panel__name__main">
                      <p className="name">
                        {user.firstName} {user.lastName}
                      </p>
                      <p className="message">UI/UX Designer</p>
                    </div>
                    <div className="message__panel__name__more">
                      <i className="fas fa-ellipsis-h"></i>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <HeaderSkeleton />
          )}

          <div className="message__user__main">
            <div className="message__user__notify">
              {user.uid !== "" && user.photoUrl !== "" ? (
                <img
                  src={user.photoUrl}
                  alt=""
                  className="message__user__notify__avatar"
                />
              ) : user.uid !== "" && user.photoUrl === "" ? (
                <Avatar name={user.firstName} />
              ) : (
                <div className="avatar--skeleton"></div>
              )}
              <div className="notify__name__info">
                <p className={user ? "name" : "name name--skeleton"}>
                  Messages
                </p>
                <p className="message">
                  {user.uid !== "" ? (
                    <>
                      <span className="mail"></span> <span>21</span> messages
                    </>
                  ) : (
                    <span className="message notify--skeleton"></span>
                  )}
                </p>
              </div>
              <div className="notify__name__status">
                <i className="fas fa-check-circle"></i>
              </div>
            </div>
            {waitingList &&
              waitingList.reverse().map((item) => (
                <div className="message__user__notify" key={item.uid}>
                  {user && item.photoUrl !== "" ? (
                    <img
                      src={item.photoUrl}
                      alt=""
                      className="message__user__notify__avatar"
                    />
                  ) : (
                    <Avatar name={item.firstName} />
                  )}
                  <div className="notify__name__info message__user__request">
                    <p className="name">{`${item.firstName} ${item.lastName}`}</p>
                    <div className="message">
                      {waitingList &&
                        waitingList.slice(1, 4).map((user) => (
                          <div className="requests" key={user.uid}>
                            {user.photoUrl !== "" ? (
                              <img src={user.photoUrl} alt="" />
                            ) : (
                              <Avatar name={user.firstName} />
                            )}
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
      <SearchFrame onGetKeyword={handleSearchFriends} />
      <AllMessages />
    </div>
  );
};
