import React, { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../../api/firestore";
import {
  closeSearchUserPopup,
  MemberInfo,
} from "../../features/auth/modalSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { RootState } from "../../store";
import { Avatar } from "../Messages/MessagePanel";
import AddGroupChip from "./AddGroupChip";
import SearchUserItem from "./SearchUserItem";
import { isAddGroup as isGroupMode } from "../../features/auth/modalSlice";
import { Member } from "../../models/chat";
import { createMessageCollecction1 } from "../../api/chat";

type Props = {};

const SearchUser = (props: Props) => {
  const dispatch = useDispatch();
  const isPopup = useSelector((state: RootState) => state.modal.searchUser);
  const groupInfo = useSelector((state: RootState) => state.modal.isAddGroup);
  const [users, setUsers] = useState<User[]>();
  // get id from token
  const user = useGetUser();

  useEffect(() => {
    let isCancel = false;
    if (!isCancel) {
      getAllUsers()
        .then((res) => {
          if (res) {
            setUsers(res);
          }
        })
        .catch((e) => {
          console.log(e);
        });
    }

    return () => {
      isCancel = true;
    };
  }, []);

  // check new friend
  const checkIsFriend = (uid: string) => {
    const index = user?.friends.findIndex(
      (friend) => friend.id === uid && friend.accept === true
    );

    if (index !== -1) {
      return false;
    }
    return true;
  };

  const handleCreateGroup = () => {
    let { users } = groupInfo;
    let newUsers: Member[] = [];

    user && users.forEach((item) => {
      newUsers.push({
        id: item.id,
        status: false,
        nickName: "",
        isAdmin: item.id === user.uid ? true : false,
      });
    });
    
    user && createMessageCollecction1(user.uid,newUsers).catch((e)=>{
      console.log(e)
    });

  };

  return (
    <div
      className={isPopup ? "search__user search__user--popup" : "search__user"}
    >
      <div className="search__user__header">
        <span>
          Add friends <i className="fas fa-user-plus"></i>
        </span>
        <div className="btn__create__group">
          <button onClick={() => dispatch(isGroupMode())}>Create Group</button>
        </div>
        <i
          className="fas fa-times search__user__header__close"
          onClick={() => dispatch(closeSearchUserPopup())}
        ></i>
      </div>
      <div className="search__user__main">
        <div className="search__user__input">
          <input type="text" placeholder="Search to find friends..." />
          <i className="fas fa-search"></i>
        </div>
        {groupInfo.state && groupInfo.users.length > 0 && (
          <div className="list__group">
            {groupInfo.users.map((item) => (
              <AddGroupChip user={item} key={item.id} />
            ))}
            <button onClick={handleCreateGroup}>Create</button>
          </div>
        )}
        <div className="search__user__list">
          {users &&
            users.map((user) => (
              <SearchUserItem
                key={user.uid}
                user={user}
                isFriend={checkIsFriend(user.uid)}
              />
            ))}

          <div className="search__user__list__more">
            <button>See more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
