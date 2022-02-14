import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatList, getListMessagesWithFriends, getWaitingList } from "../../api/chat";
import { getAllUsers, getUserByID } from "../../api/firestore";
import { closeSearchUserPopup } from "../../features/auth/modalSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { RootState } from "../../store";
import SearchUserItem from "./SearchUserItem";

type Props = {};

const SearchUser = (props: Props) => {
  const dispatch = useDispatch();
  const isPopup = useSelector((state: RootState) => state.modal.searchUser);
  const [users, setUsers] = useState<User[]>();

  // get id from token
  const user = useGetUser()
  
  useEffect(() => {
    getAllUsers()
      .then((res) => {
        if (res) {
          setUsers(res);
        }
      })
      .catch((e) => {
        console.log(e);
      });
      
  }, []);

  // check new friend
  const checkIsFriend = (uid: string)=>{

    const index = user?.friends.findIndex(friend => friend.id === uid && friend.accept === true)

    if(index!== -1){
      return false;
    }
    return true;
  }
  return (
    <div
      className={isPopup ? "search__user search__user--popup" : "search__user"}
    >
      <div className="search__user__header">
        <span>
          Add friends <i className="fas fa-user-plus"></i>
        </span>
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
        <div className="search__user__list">
          {users &&
            users.map((user) => (
              <SearchUserItem key={user.uid} user={user} isFriend={checkIsFriend(user.uid)}/>
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
