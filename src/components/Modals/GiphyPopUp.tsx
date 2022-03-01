import { GifsResult, GiphyFetch } from "@giphy/js-fetch-api";
import React, { useEffect, useState } from "react";
import { IGif } from "@giphy/js-types";
import { Grid } from "@giphy/react-components";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store";
import { displayGiphyPopup } from "../../features/auth/modalSlice";
import { requestSendMessage } from "../../features/chat/chatSlice";
import { MessageModel } from "../MainChat/InputFrame";
import { useLocation, useParams } from "react-router";
import { Params } from "../MainChat/ChatFrame";

type Props = {};

type GiphyType = "video" | "gif" | "text" | "emoji" | "sticker";

export interface GiphyValue {
  input: string;
  url: string;
  type: GiphyType;
}
interface GiphyTab {
  type: GiphyType;
  title: string;
}

const giphyInitial = new GiphyFetch(
  process.env.REACT_APP_GIPHY_KEY
    ? process.env.REACT_APP_GIPHY_KEY
    : "q0M3ypyodGE1SmQkYOycmw3LupiIejJO"
);

const GiphyPopUp = (props: Props) => {
  const dispatch = useDispatch();
  const paths = useLocation().pathname.split('/');
  const path = paths[paths.length - 1];
  const [results, setResults] = useState<IGif[]>([]);
  const myAccount = useSelector((state: RootState)=>state.signUp.myAccount)
  const isDisplayPopUp = useSelector(
    (state: RootState) => state.modal.isGiphyPopup
  );
  const fetchGifs = (offset: number) =>
    giphyInitial.trending({ offset, limit: 100 });

  const [giphy, setGiphy] = useState<GiphyValue>({
    input: "hi",
    type: "gif",
    url: "",
  });
  const tabs: GiphyTab[] = [
    {
      type: "gif",
      title: "GIFs",
    },
    {
      type: "sticker",
      title: "Trend",
    },
    {
      type: "text",
      title: "Text",
    },
    {
      type: "emoji",
      title: "Emoji",
    },
  ];
  useEffect(() => {
    const callApi = async () => {
      let res: GifsResult | null = null;
      switch (giphy.type) {
        case "gif":
          res = await giphyInitial.search(giphy.input);
          break;
        case "emoji":
          res = await giphyInitial.emoji();
          break;
        case "text":
          res = await giphyInitial.animate(giphy.input, { limit: 30 });
          break;
        case "sticker":
          res = await giphyInitial.trending();
          break;
        default:
          res = await giphyInitial.search("hi");
          break;
      }
      res && setResults(res.data);
    };
    callApi();
  }, [giphy]);

  const handleSendGiphy = (url : string) =>{
    const giphy: MessageModel ={
      id: path,
      info: myAccount,
      content: {
        content: {
          media: [url],
          sticker: "",
          text: '',
          video: []
        },
        createdDate: Date.now(),
        emojo: [],
        id: '',
        ownID: myAccount.uid,
        sendStatus: 0,
        status: 0,
      },
    }
    dispatch(requestSendMessage(giphy))
    dispatch(displayGiphyPopup())
  }
  return (
    <div className={isDisplayPopUp ? "giphy giphy--display" : "giphy"}>
      <div className="giphy__header">
        <p>Giphy</p>
        <i
          className="bx bxs-x-circle"
          onClick={() => dispatch(displayGiphyPopup())}
        ></i>
      </div>
      <div className="giphy__main">
        <div className="giphy__form">
          <i className="bx bx-search"></i>
          <input
            type="text"
            value={giphy.input}
            placeholder="Search Giphy"
            onChange={(e) => setGiphy({ ...giphy, input: e.target.value })}
          />
        </div>
        <ul className="giphy__tabs">
          {tabs.map((item) => (
            <li
              className={
                giphy.type === item.type
                  ? "giphy__tabs__item active"
                  : "giphy__tabs__item"
              }
              key={item.type}
              onClick={() => setGiphy({ ...giphy, type: item.type })}
            >
              {item.title}
            </li>
          ))}
        </ul>
        <div className="giphy__list">
          
            {results.map((item) => (
              <div className="giphy__item" key={item.id}>
                <img
                  src={item.images.fixed_width.url}
                  alt=""
                  onClick={()=>handleSendGiphy(item.images.fixed_width.url)}
                />
              </div>
            ))}
          
        </div>
      </div>
    </div>
  );
};

export default GiphyPopUp;
