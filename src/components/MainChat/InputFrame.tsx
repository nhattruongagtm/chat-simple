import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { uploadMedia } from "../../api/storage";
import { displayGiphyPopup } from "../../features/auth/modalSlice";
import {
  requestSendMessage,
  requestSendMessageSuccess,
} from "../../features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { User } from "../../models/auth";
import { ChatItem, ContentFile } from "../../models/chat";
import { RootState } from "../../store";
import { ChatMainContext } from "./ChatFrame";

export interface MessageModel {
  id: string;
  info: User;
  content: ChatItem;
  blobs?: BlobType[];
}

export interface BlobType{
  type: 0 | 1,
  file: File,
}

const InputFrame = () => {
  const initialValue: ContentFile = {
    media: [],
    sticker: "",
    text: "",
    video: [],
  };
  const [content, setContent] = useState<ContentFile>(initialValue);
  const myAccount = useSelector((state: RootState) => state.signUp.myAccount);
  const dispatch = useDispatch();
  const id = useContext(ChatMainContext)?.id;

  const msg = useSelector((state: RootState) => state.chat.chatDetail);

  const blobsRef = useRef<BlobType[]>([]);

  useEffect(() => {
    return () => {
      if (content.media.length) {
        content.media.map((item) => {
          URL.revokeObjectURL(item);
        });
      }
    };
  }, []);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { media, text, video, sticker } = content;
    if (
      (text && text.trim() !== "") ||
      media.length > 0 ||
      video.length > 0 ||
      sticker !== ""
    ) {
      const chatItem: ChatItem = {
        content: content,
        createdDate: Date.now(),
        emojo: [],
        id: `${myAccount.uid}-${Date.now()}`,
        ownID: myAccount.uid as string,
        sendStatus: 0,
        status: 0,
      };
      if (id) {
        console.log(content);
        dispatch(
          requestSendMessage({
            id: id,
            info: myAccount,
            content: chatItem,
            blobs: blobsRef.current,
          })
        );
        // message(chatItem)
        setContent(initialValue);
      }
    }
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files && id) {
      let blobs = [];
      let blobsVideo = [];
      for (let i = 0; i < files.length; i++) {
        const item = files[i];
        const url = URL.createObjectURL(item);
        if (item.type === "video/mp4") {
          blobsVideo.push(url);
          blobsRef.current.push({
            type: 1,
            file: item,
          });
        } else {
          blobsRef.current.push({
            type: 0,
            file: item,
          });
          blobs.push(url);
        }
      }
      setContent({
        ...content,
        media: [...content.media, ...blobs],
        video: [...content.video, ...blobsVideo],
      });
    }
  };
  const handleDeleteAttachItem = (index: number) => {
    setContent({
      ...content,
      media: content.media.filter((item, i) => i !== index),
    });
  };
  const handleDeleteAttachVideoItem = (index: number) => {
    setContent({
      ...content,
      video: content.video.filter((item, i) => i !== index),
    });
  };

  return (
    <form className="input__chat" onSubmit={handleSendMessage}>
      {(content.media.length > 0 || content.video.length > 0) && (
        <div className="attach__panel">
          <div className="attach__panel__main">
            {content.media.map((item, index) => (
              <div className="attach__panel__item" key={index}>
                <div className="attach__item--layer"></div>
                <div
                  className="attach__item__close"
                  onClick={() => handleDeleteAttachItem(index)}
                >
                  <i className="fa-regular fa-circle-xmark"></i>{" "}
                </div>
                <img src={item} alt="" />
              </div>
            ))}
            {content.video.map((item, index) => (
              <div className="attach__panel__item" key={index}>
                <div className="attach__item--layer"></div>
                <div
                  className="attach__item__close"
                  onClick={() => handleDeleteAttachVideoItem(index)}
                >
                  <i className="fa-regular fa-circle-xmark"></i>{" "}
                </div>
                <video src={item} />
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="avatar input__chat__avatar">
        <img src={myAccount.photoUrl} alt="" />
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={content.text as string}
        onChange={(e) => setContent({ ...content, text: e.target.value })}
      />
      <div className="input__attach">
        <i
          className="bx bx-smile"
          onClick={() => dispatch(displayGiphyPopup())}
        ></i>
        <label htmlFor="attach" className="attach">
          <i className="fas fa-paperclip"></i>
        </label>
        <input
          type="file"
          id="attach"
          hidden
          onChange={handleChangeFileInput}
          multiple
        />
        <button type="submit">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
      {/* <div className="typing">
        
      </div> */}
    </form>
  );
};

export default InputFrame;
