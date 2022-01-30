import React from "react";

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  return (
    <div className="header__chat">
      <div className="header__name__group">
        <span>Chilli Chilli</span>
        <span>25</span>
      </div>
      <div className="header__options">
        <i className="fas fa-video"></i>
        <i className="fas fa-phone-alt"></i>
        <i className="fas fa-file-image"></i>
        <i className="fas fa-file-alt"></i>
      </div>
      <div className="header__avatar">
        <div className="header__avatar__item__personal avatar">
                    <img src="./assets/avatar2.svg" alt="" />
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
