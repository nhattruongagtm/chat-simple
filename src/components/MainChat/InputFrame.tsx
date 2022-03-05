import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  insertTyping,
  MESSAGES_DOC,
  removeTyping,
  TYPINGS_DOC,
} from "../../api/chat";
import { db } from "../../config/firebase";
import { displayGiphyPopup } from "../../features/auth/modalSlice";
import {
  requestSendMessage,
  resetTypingMessage,
  typingMessage,
} from "../../features/chat/chatSlice";
import { User } from "../../models/auth";
import {
  ChatItem,
  ChatListData,
  ContentFile,
  TypingMessage,
} from "../../models/chat";
import { RootState } from "../../store";
import { Avatar } from "../Messages/MessagePanel";
import { ChatMainContext, Params } from "./ChatFrame";

export interface MessageModel {
  id: string;
  info: User;
  content: ChatItem;
  blobs?: BlobType[];
}

export interface BlobType {
  type: 0 | 1;
  file: File;
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
  const param: Params = useParams();
  const path = param.friendID;

  const msg = useSelector((state: RootState) => state.chat.chatDetail);
  // const typingStore = useSelector((state: RootState) => state.chat.typing);
  // const typing = path ? typingStore.find(item=>item.id === path)?.avatar : "";
  const blobsRef = useRef<BlobType[]>([]);
  const [isTyping, setIsTyping] = useState<string>("");

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
       
        dispatch(
          requestSendMessage({
            id: id,
            info: myAccount,
            content: chatItem,
            blobs: blobsRef.current,
          })
        );

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
  const handleChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;
    const data = {
      id: path,
      avatar:
        myAccount.photoUrl !== "" ? myAccount.photoUrl : myAccount.firstName,
    };
    if (text.trim().length === 1) {
      insertTyping(data);
    }
    setContent({ ...content, text });
  };

  useEffect(() => {
    const data = {
      id: path,
      avatar:
        myAccount.photoUrl !== "" ? myAccount.photoUrl : myAccount.firstName,
    };
    if (content.text === "") {
      removeTyping(data);
    }
  }, [content.text]);

  useEffect(() => {
    let isCancel = false;
    const typingListener = async () => {
      if (path) {
        try {
          const typingRef = doc(db, TYPINGS_DOC, path);

          onSnapshot(typingRef, (doc) => {
            if (doc.exists()) {
              const data = doc.data() as TypingMessage;

              const { typing } = data;

              const partner = typing.filter(
                (item) => item !== (myAccount.photoUrl || myAccount.firstName)
              );

              if (partner.length > 0) {
                setIsTyping(partner[partner.length - 1]);
              } else {
                setIsTyping("");
              }
            }
          });
        } catch (error) {
          console.log(error);
        }
      }
    };
    !isCancel && id && typingListener();

    return () => {
      isCancel = true;
    };
  }, [content]);

  useEffect(() => {
    if (isTyping !== "") {
      const dots = document.getElementsByClassName(
        "typing__dots"
      ) as HTMLCollectionOf<HTMLElement>;

      if (dots) {
        for (let i = 0; i < dots[0].children.length; i++) {
          const element = dots[0].childNodes[i] as HTMLElement;

          element.style.animation = `typing ${1.5}s infinite `;
          element.style.animationDelay = `${0.5 + i}s`;
        }
      }
    }
  }, [isTyping]);

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
        {myAccount && myAccount.photoUrl !== "" ? (
          <img src={myAccount.photoUrl} alt="" />
        ) : (
          myAccount &&
          myAccount.photoUrl === "" && <Avatar name={myAccount.firstName} />
        )}
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={content.text as string}
        onChange={handleChangeInput}
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
      {isTyping !== "" &&
        isTyping !== myAccount.photoUrl &&
        isTyping !== myAccount.firstName && (
          <div className="typing">
            <audio src="../audio/typing.mp3" autoPlay />
            <div className="avatar typing__avatar">
              {isTyping.indexOf("http") !== -1 ? (
                <img src={isTyping} alt="" />
              ) : (
                <>
                  <img
                    src="https://dvdn247.net/wp-content/uploads/2020/07/avatar-mac-dinh-2.jpg"
                    alt=""
                  />
                </>
              )}
            </div>
            <div className="typing__dots">
              <i className="bx bxs-circle"></i>
              <i className="bx bxs-circle"></i>
              <i className="bx bxs-circle"></i>
            </div>
          </div>
        )}
    </form>
  );
};

export default InputFrame;
