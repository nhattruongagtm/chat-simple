import React from "react";
import { useDispatch } from "react-redux";
import { MemberInfo, removeMemberInGroup } from "../../features/auth/modalSlice";
import { User } from "../../models/auth";
import { Avatar } from "../Messages/MessagePanel";

type Props = {
    user: MemberInfo,
};

const AddGroupChip = ({user}: Props) => {
  const dispatch = useDispatch();
  return (
    <div className="list__group__item">
      {user && (
        <div className="list__group__item__avatar avatar">
          {user.avatar !== "" ? (
            <img src={user.avatar} alt="" />
          ) : (
            <Avatar name={user.name} />
          )}
        </div>
      )}
      <p>{user && user.name}</p>
      <i className="bx bxs-x-circle" onClick={()=>dispatch(removeMemberInGroup(user.id))}></i>
    </div>
  );
};

export default AddGroupChip;
