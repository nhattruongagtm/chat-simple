import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateTab } from "../../features/global/deviceSlice";
import { RootState } from "../../store";
import { Avatar } from "../Messages/MessagePanel";
import { ChatMainContext } from "./ChatFrame";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const user = React.useContext(ChatMainContext);
  const dispatch = useDispatch();
  const device = useSelector((state: RootState) => state.device);
  const handleDisplayDetail = () => {
    if (device.width <= 480) {
      dispatch(updateTab(2));
    }
  };
  
  return (
    <div className="header__chat">
      <div className="header__name__group">
        <span>{user?.name}</span>
        {/* membership numbers */}
        <span>{}</span>
      </div>
      <div className="header__options">
        <i className="fas fa-video"></i>
        <i className="fas fa-phone-alt"></i>
        <i className="fas fa-file-image header__options__file"></i>
        <i className="fas fa-file-alt header__options__file"></i>
      </div>
      <div className="header__avatar">
        <div
          className="header__avatar__item__personal avatar"
          onClick={handleDisplayDetail}
        >
          {user && user.avatar[0] !== "" ? (
            <img src={user.avatar[0]} alt="" />
          ) : (
            user && user.avatar[0] === "" && <Avatar name={user.name} />
          )}
          <div className="icon--active"></div>
        </div>
        {/* <div className="header__avatar__item">
          <img src="./assets/avatar2.svg" alt="" />
        </div>
        <div className="header__avatar__item">
          <img src="./assets/avatar1.svg" alt="" />
        </div>
        <div className="header__avatar__item">
          <img src="./assets/avatar3.svg" alt="" />
        </div>
        <div className="header__avatar__item header__avatar__item__number">
          +6
        </div> */}
      </div>
    </div>
  );
};

export default Header;
