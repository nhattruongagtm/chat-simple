import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  requestSendMessage,
  requestSendMessageSuccess,
} from "../../features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem, ChatListItem, ContentFile } from "../../models/chat";
import { RootState } from "../../store";
import { ChatMainContext } from "./ChatFrame";

export interface MessageModel {
  id: string;
  content: ChatItem;
}

const InputFrame = () => {
  const initialValue: ContentFile = {
    media: [],
    sticker: "",
    text: "",
    video: "",
  };
  const [content, setContent] = useState<ContentFile>(initialValue);
  const hostUser = useGetUser();
  const dispatch = useDispatch();
  const id = useContext(ChatMainContext)?.id;

  const msg = useSelector((state: RootState) => state.chat.chatDetail);

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
    console.log(content);
    if (
      (text && text.trim() !== "") ||
      media.length > 0 ||
      video !== "" ||
      sticker !== ""
    ) {
      const chatItem: ChatItem = {
        content: content,
        createdDate: Date.now(),
        emojo: [],
        id: hostUser?.uid as string,
        ownID: hostUser?.uid as string,
        sendStatus: 0,
        status: 0,
      };
      if (id) {
        dispatch(requestSendMessage({ id: id, content: chatItem }));
      }
      // message(chatItem)
      setContent(initialValue);
    }
  };

  const handleChangeFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;

    if (files) {
      let blobs = [];
      for (let i = 0; i < files.length; i++) {
        const url = URL.createObjectURL(files[i]);
        blobs.push(url);
      }
      setContent({ ...content, media: [...content.media, ...blobs] });
    }
  };
  const handleDeleteAttachItem = (index: number) => {
    setContent({
      ...content,
      media: content.media.filter((item, i) => i !== index),
    });
  };

  return (
    <form className="input__chat" onSubmit={handleSendMessage}>
      {content.media.length > 0 && (
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
          </div>
        </div>
      )}
      <div className="avatar input__chat__avatar">
        <img src={hostUser?.photoUrl} alt="" />
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={content.text as string}
        onChange={(e) => setContent({ ...content, text: e.target.value })}
      />
      <div className="input__attach">
        <i className="fas fa-microphone"></i>
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
