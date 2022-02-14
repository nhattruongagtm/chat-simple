import React from "react";
import { Route, Switch } from "react-router";
import ChatFrame from "./ChatFrame";
import ChatScreen from "./ChatScreen";
import Header from "./Header";
import InputFrame from "./InputFrame";

type MainChatProps = {};

const MainChat = (props: MainChatProps) => {
  return (
    <div className="main__chat">
      <Switch>
        <Route path="/me/:friendID">
          <ChatFrame/>
        </Route>
        <Route path="/me">
          <span style={{color: 'white', textAlign: 'center', padding: '10px 0 0 0'}}>Hãy cùng nhau trò chuyện nhé!</span>
        </Route>
      </Switch>
    </div>
  );
};

export default MainChat;
