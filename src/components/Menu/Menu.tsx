import React from "react";
import { useHistory } from "react-router";
interface MenuProps {}

export const Menu = (props: MenuProps) => {
  const navigate = useHistory();
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
        <div className="menu__item" onClick={()=>navigate.push('/')}>
        <i className="fas fa-sign-out-alt"></i>
        </div>
      </div>
    </div>
  );
};
