import React from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { ACCESS__TOKEN } from "../../constants/routes";
import { updateMyId } from "../../features/auth/signUpSlice";
interface MenuProps {}

export const Menu = (props: MenuProps) => {
  const navigate = useHistory();
  const dispatch = useDispatch();

  const handleSignOut = () => {
    localStorage.removeItem(ACCESS__TOKEN);
    
    navigate.push("/");
    
  };
  return (
    <div className="menu">
      <div className="menu__colors"></div>
      <div className="menu__item">
        <img src="./assets/home-fill.svg" alt="" />
      </div>
      <div className="menu__item">
        <img src="./assets/home-fill.svg" alt="" />
      </div>
      <div className="menu__exit">
        <div className="menu__item" onClick={handleSignOut}>
          <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};
