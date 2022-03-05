import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useParams } from "react-router";
import { MESSAGE__THEME } from "../../constants/storage";
import { changeColor } from "../../features/chat/storageSlice";
import { updateTab } from "../../features/global/deviceSlice";
import { RootState } from "../../store";
import { Params } from "../MainChat/ChatFrame";
interface MediaType {
  url: string;
  type: number;
}
export interface ThemeMessage {
  id: string;
  color: string;
}
type DetailProps = {};

const Detail = (props: DetailProps) => {
  const dispatch = useDispatch();
  const device = useSelector((state: RootState) => state.device);
  const isMobile = device.width <= 480 ? true : false;
  const location = useLocation().pathname.split("/");
  const path = location[location.length - 1];
  const chatItem = useSelector(
    (state: RootState) => state.chat.chatList
  ).filter((item) => item.id === path)[0];

  const getFileCount = useCallback(() => {
    let result: MediaType[] = [];
    if (chatItem) {
      for (let i = 0; i < chatItem.messages.length; i++) {
        const item = chatItem.messages[i].data.content;
        if (item.media.length > 0) {
          for (let j = 0; j < item.media.length; j++) {
            if (item.media[j] && item.media[j].includes("https://firebase")) {
              result = [...result, { url: item.media[j], type: 0 }];
            }
          }
        }
        if (item.video.length > 0) {
          for (let j = 0; j < item.video.length; j++) {
            result = [...result, { url: item.video[j], type: 1 }];
          }
        }
      }
    }
    return result;
  }, [path, chatItem]);

  const handleChangeColor = (color: string) => {
    const data: ThemeMessage = {
      id: path,
      color: color,
    };

    const store = localStorage.getItem(MESSAGE__THEME);

      if (store) {
        const storage = JSON.parse(store);
        if (storage) {
          let newStorage = [...storage];
          const index = newStorage.findIndex(
            (item) => item.id === data.id && color === data.color
          );

          if (index > -1) {
            newStorage[index] = data;
          } else {
            newStorage.push(data);
          }

          dispatch(changeColor(newStorage));
        }
      }
  };

  const medias = getFileCount().reverse();

  return (
    <div
      className={
        isMobile && device.tab === 2
          ? "detail__info detail__info--display"
          : "detail__info"
      }
    >
      {chatItem && (
        <>
          <div className="detail__header">
            <div className="detail__header__title">
              <i className="fas fa-comments"></i>
              <span>Chat Details</span>
            </div>
            <i
              className="fas fa-times header__close"
              onClick={() => dispatch(updateTab(1))}
            ></i>
          </div>
          <div className="detail__figure">
            <div className="detail__photo avatar">
              <img src={chatItem && chatItem.avatar[0]} alt="" />
            </div>
            <p>
              {chatItem.type === 0 && chatItem.members[0].nickName !== ""
                ? chatItem.members[0].nickName
                : chatItem.name}
            </p>
          </div>
          <div className="detail__attach">
            <div className="detail__attach__item">
              <div className="detail__attach__title">Files</div>
              <div className="detail__attach__main ">
                <i className="fas fa-file files"></i>
                <span>0</span>
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
          {chatItem.type === 1 && (
            <>
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
            </>
          )}
          {medias.length > 0 && (
            <>
              <div className="detail__members">
                <div className="detail__members__title">
                  <div className="detail__members__tt">
                    <span>Media</span>
                    <span>{medias.length}</span>
                  </div>
                </div>
                <div className="detail__members__more">
                  {/* <i className="fas fa-chevron-down"></i> */}
                </div>
              </div>
              <div className="detail__media">
                {medias &&
                  medias.slice(0,4).map((item, index) => (
                    <div key={index}>
                     
                        <div className="detail__media__item">
                          {item.type === 0 ? (
                            <img src={item.url} alt="" />
                          ) : (
                            <video src={item.url} />
                          )}
                        </div>
                      
                    </div>
                  ))}

                {medias.length > 5 && (
                  <div className="detail__media__more detail__media__item">
                    +{medias.length - 4}
                  </div>
                )}
              </div>
            </>
          )}

          <div className="detail__members">
            <div className="detail__members__title">
              <div className="detail__members__tt">
                <span>Options</span>
              </div>
            </div>
            <div className="detail__members__more">
              {/* <i className="fas fa-chevron-down"></i> */}
            </div>
          </div>
          <div className="detail__options">
            <div className="detail__options__item">
              <p>Colors: </p>
              <div className="detail__options__colors">
                <label
                  htmlFor="red"
                  className="color__item color__item--red"
                  onClick={() => handleChangeColor("red")}
                >
                  <i className="fas fa-circle"></i>
                </label>
                <label
                  htmlFor="red"
                  className="color__item color__item--yellow"
                  onClick={() => handleChangeColor("#5e00eb")}
                >
                  <i className="fas fa-circle"></i>
                </label>
                <label
                  htmlFor="red"
                  className="color__item color__item--blue"
                  onClick={() => handleChangeColor("#2295FF")}
                >
                  <i className="fas fa-circle"></i>
                </label>
                <label
                  htmlFor="red"
                  className="color__item color__item--green"
                  onClick={() => handleChangeColor("green")}
                >
                  <i className="fas fa-circle"></i>
                </label>
                <label
                  htmlFor="red"
                  className="color__item color__item--pink"
                  onClick={() => handleChangeColor("rgb(255, 78, 225)")}
                >
                  <i className="fas fa-circle"></i>
                </label>
              </div>
              <input type="radio" name="colors" hidden id="red" />
              <input type="radio" name="colors" hidden id="blue" />
              <input type="radio" name="colors" hidden id="yellow" />
              <input type="radio" name="colors" hidden id="pink" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Detail;
