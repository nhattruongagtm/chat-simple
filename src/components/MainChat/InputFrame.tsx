import React from "react";

interface InputFrameProps {}

const InputFrame = (props: InputFrameProps) => {
  return (
    <div className="input__chat">
      <div className="avatar input__chat__avatar">
        <img src="./assets/avatar1.svg" alt="" />
      </div>
      <input type="text" placeholder="Type your message..."/>
      <div className="input__attach">
        <i className="fas fa-microphone"></i>
        <i className="fas fa-paperclip"></i>
        <i className="fas fa-paper-plane"></i>
      </div>
      <div className="typing">
        
      </div>
    </div>
  );
};

export default InputFrame;
