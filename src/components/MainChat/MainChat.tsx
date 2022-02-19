import React from "react";
import { Route, Switch } from "react-router";
import NavigationBottom from "../NavigationBottom/NavigationBottom";
import ChatFrame from "./ChatFrame";

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
      <NavigationBottom/>
    </div>
  );
};

export default MainChat;
