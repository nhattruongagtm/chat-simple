import React from "react";
import { Route, Routes } from "react-router";
import "./App.scss";
import Detail from "./components/Detail/Detail";
import MainChat from "./components/MainChat/MainChat";
import { Menu } from "./components/Menu/Menu";
import { MessagePanel } from "./components/Messages/MessagePanel";
import MainPage from "./pages/Home/MainPage";
import LoginPage from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
function App() {
  return (
    <div className="screen">
      <div className="wrapper">
        <Routes>
          <Route path="/" element={<LoginPage/>}/>
          <Route path="/signup" element={<SignUpPage/>}/>
          <Route path="/me" element={<MainPage/>}/>
        </Routes>
      </div>
    </div>
  );
}

export default App;
