import React from "react";
import Detail from "../../components/Detail/Detail";
import MainChat from "../../components/MainChat/MainChat";
import { Menu } from "../../components/Menu/Menu";
import { MessagePanel } from "../../components/Messages/MessagePanel";

interface Props {}

const MainPage = (props: Props) => {
  return (
    <div className="main__page">
      <Menu />
      <MessagePanel />
      <MainChat />
      <Detail />
    </div>
  );
};

export default MainPage;
