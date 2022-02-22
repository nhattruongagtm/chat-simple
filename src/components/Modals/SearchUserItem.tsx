import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { requestAddFriend } from "../../features/chat/friendsSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { Avatar } from "../Messages/MessagePanel";

type SearchUserItemProps = {
  user: User;
  isFriend: boolean;
};

const SearchUserItem = ({ user, isFriend }: SearchUserItemProps) => {
  const [isNewFriend, setIsNewFriend] = useState<boolean>(isFriend);
  const [isRequest, setIsRequest] = useState("Add");
  const dispatch = useDispatch();
  const u = useGetUser();
  const handleChat = () => {
    console.log("chat to ", user.uid);
  };

  const handleAddFriend = (uid: string) => {
      if (u) {
          dispatch(requestAddFriend({ uid: u.uid, fid: uid, type: 0 }));
        //   setIsRequest("Requested")
    }
  };

  return (
    <div className="search__user__list__item" key={user.uid}>
      <div className="avatar search__user__avatar">
       {
         user.photoUrl!=="" ? (
          <img
          src={user.photoUrl}
          alt=""
        />
         ): (
           <Avatar name={user.firstName}/>
         )
       }
      </div>
      <p className="search__user__name">{`${user.firstName} ${user.lastName}`}</p>
      <p className="search__user__familiar">(30 mutual friends) </p>
      <div className="search__user__btn">
        {isNewFriend ? (
          <button
            className="search__user__btn--add"
            onClick={() => handleAddFriend(user.uid)}
          >
            {isRequest}
          </button>
        ) : (
          <button className="search__user__btn--chat" onClick={handleChat}>
            Chat
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchUserItem;
