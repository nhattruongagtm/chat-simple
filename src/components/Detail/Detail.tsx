import React from "react";

type DetailProps = {};

const Detail = (props: DetailProps) => {
  return (
    <div className="detail__info">
      <div className="detail__header">
        <div className="detail__header__title">
          <i className="fas fa-comments"></i>
          <span>Chat Details</span>
        </div>
        <i className="fas fa-times header__close"></i>
      </div>
      <div className="detail__figure">
        <div className="detail__photo avatar">
          <img src="./assets/avatar1.svg" alt="" />
        </div>
        <p>Chilli Chilli</p>
      </div>
      <div className="detail__attach">
        <div className="detail__attach__item">
          <div className="detail__attach__title">Files</div>
          <div className="detail__attach__main ">
            <i className="fas fa-file files"></i>
            <span>541</span>
          </div>
        </div>
        <div className="detail__attach__item">
          <div className="detail__attach__title">Links</div>
          <div className="detail__attach__main ">
            <i className="fas fa-link links"></i>
            <span>28</span>
          </div>
        </div>
      </div>
      <div className="detail__members">
        <div className="detail__members__title">
          <div className="detail__members__tt">
            <span>Members</span>
            <span>52</span>
          </div>
        </div>
        <div className="detail__members__more">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="members__list">
        <div className="members__list__item">
          <div className="avatar">
            <img src="./assets/avatar3.svg" alt="" />
          </div>
          <div className="members__list__name">
            Smith jade
            <span>Creator</span>
          </div>
          <div className="members__list__call">
            <i className="fa-solid fa-phone"></i>
            <i className="far fa-comment"></i>
          </div>
        </div>
        <div className="members__list__item">
          <div className="avatar">
            <img src="./assets/avatar1.svg" alt="" />
          </div>
          <div className="members__list__name">Huawing Wang</div>
          <div className="members__list__call">
            <i className="fa-solid fa-phone"></i>
            <i className="far fa-comment"></i>
          </div>
        </div>
        <div className="members__list__item">
          <div className="avatar">
            <img src="./assets/avatar2.svg" alt="" />
          </div>
          <div className="members__list__name">Michael Alex</div>
          <div className="members__list__call">
            <i className="fa-solid fa-phone"></i>
            <i className="far fa-comment"></i>
          </div>
        </div>
      </div>
      <div className="detail__members">
        <div className="detail__members__title">
          <div className="detail__members__tt">
            <span>Media</span>
            <span>27</span>
          </div>
        </div>
        <div className="detail__members__more">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="detail__media">
        <div className="detail__media__item">
          <img src="./assets/avatar2.svg" alt="" />
        </div>
        <div className="detail__media__item">
          <img src="./assets/avatar3.svg" alt="" />
        </div>
        <div className="detail__media__item">
          <img src="./assets/avatar1.svg" alt="" />
        </div>
        <div className="detail__media__item">
          <img src="./assets/avatar1.svg" alt="" />
        </div>
        <div className="detail__media__more detail__media__item">+1566</div>
      </div>

      <div className="detail__members">
        <div className="detail__members__title">
          <div className="detail__members__tt">
            <span>Options</span>
          </div>
        </div>
        <div className="detail__members__more">
          <i className="fas fa-chevron-down"></i>
        </div>
      </div>
      <div className="detail__options">
        <div className="detail__options__item">
          <p>Colors: </p>
          <div className="detail__options__colors">
            <label htmlFor="red" className="color__item color__item--red">
              <i className="fas fa-circle"></i>
            </label>
            <label htmlFor="red" className="color__item color__item--yellow">
              <i className="fas fa-circle"></i>
            </label>
            <label htmlFor="red" className="color__item color__item--blue">
              <i className="fas fa-circle"></i>
            </label>
            <label htmlFor="red" className="color__item color__item--green">
              <i className="fas fa-circle"></i>
            </label>
          </div>
          <input type="radio" name="colors" hidden id="red" />
          <input type="radio" name="colors" hidden id="blue" />
          <input type="radio" name="colors" hidden id="yellow" />
          <input type="radio" name="colors" hidden id="pink" />
        </div>
      </div>
    </div>
  );
};

export default Detail;
