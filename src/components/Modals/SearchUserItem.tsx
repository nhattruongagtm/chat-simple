import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addMemberIntoGroup, MemberInfo } from "../../features/auth/modalSlice";
import { requestAddFriend } from "../../features/chat/friendsSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { RootState } from "../../store";
import { Avatar } from "../Messages/MessagePanel";

type SearchUserItemProps = {
  user: User;
  isFriend: boolean;
};

const SearchUserItem = ({ user, isFriend }: SearchUserItemProps) => {
  const [isNewFriend, setIsNewFriend] = useState<boolean>(isFriend);
  const [isRequest, setIsRequest] = useState("Add");
  const isAddGroup = useSelector((state: RootState)=>state.modal.isAddGroup.state)
  const dispatch = useDispatch();
  const u = useGetUser();
  const handleChat = () => {
    console.log("chat to ", user.uid);
  };

  const handleAddFriend = (uid: string) => {
    if (u) {
      dispatch(requestAddFriend({ uid: u.uid, fid: uid, type: 0 }));
    }
  };

  const member:MemberInfo = {
    id: user.uid,
    avatar: user.photoUrl,
    name: `${user.firstName} ${user.lastName}`
  }

  return (
    <div className="search__user__list__item" key={user.uid}>
      <div className="avatar search__user__avatar">
        {user.photoUrl !== "" ? (
          <img src={user.photoUrl} alt="" />
        ) : (
          <Avatar name={user.firstName} />
        )}
      </div>
      <div className="search__user__info">
        <p className="search__user__name">{`${user.firstName} ${user.lastName}`}</p>
        <p className="search__user__familiar">(30 mutual friends) </p>
      </div>
      <div className="search__user__btn">
        {isAddGroup ? (
          <button
              className="search__user__btn--add"
              onClick={()=>dispatch(addMemberIntoGroup(member))}
            >
              Add Member
            </button>
        ): isNewFriend ? (
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
          )
        }
      </div>
    </div>
  );
};

export default SearchUserItem;
