import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import { ACCESS__TOKEN } from "./constants/routes";
import LoginPage from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
import MainScreen from "./pages/Home/MainScreen";
import jwtDecode from "jwt-decode";
import { getIDUser } from "./utils/auth";
import { useDispatch } from "react-redux";
import { updateWidth } from "./features/global/deviceSlice";
export const DeviceWithContext = React.createContext<number>(0)
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const wrapper = document.querySelector("#wrapper");
    window.addEventListener("resize", () => {
      if(wrapper){
        dispatch(updateWidth(wrapper.clientWidth))
      }
    });
  }, []);

  return (
    <div className="screen">
      <div className="wrapper" id="wrapper">
        <Switch>
          <Route exact path="/">
            <LoginPage />
          </Route>
          <Route path="/signup">
            <SignUpPage />
          </Route>
          <Route path="/me">
            <MainScreen />
          </Route>
        </Switch>
      </div>
    </div>
  );
}
export default App;
