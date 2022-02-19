import React, { useContext, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestSendMessage, requestSendMessageSuccess } from "../../features/chat/chatSlice";
import useGetUser from "../../hooks/useGetUser";
import { ChatItem } from "../../models/chat";
import { RootState } from "../../store";
import { ChatMainContext } from "./ChatFrame";

interface InputFrameProps {}

const InputFrame = (props: InputFrameProps) => {
  const [inputText, setInputText] = useState<string>("");
  const hostUser = useGetUser();
  const dispatch = useDispatch();

  const msg = useSelector((state: RootState) => state.chat.chatDetail);

  useEffect(() => {}, [msg]);

  const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputText.trim() !== "") {
      const chatItem: ChatItem = {
        content: inputText,
        createdDate: Date.now(),
        emojo: [],
        id: hostUser?.uid as string,
        ownID: hostUser?.uid as string,
        sendStatus: 0,
        status: 0,
      };
      dispatch(requestSendMessage(chatItem));
      setInputText("");
    }
  };

  return (
    <form className="input__chat" onSubmit={handleSendMessage}>
      <div className="avatar input__chat__avatar">
        <img src={hostUser?.photoUrl} alt="" />
      </div>
      <input
        type="text"
        placeholder="Type your message..."
        value={inputText}
        onChange={(e) => setInputText(e.target.value)}
      />
      <div className="input__attach">
        <i className="fas fa-microphone"></i>
        <i className="fas fa-paperclip"></i>
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
