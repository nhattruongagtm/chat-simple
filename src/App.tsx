import React from "react";
import { Route, Switch } from "react-router";
import "./App.scss";
import { ACCESS__TOKEN } from "./constants/routes";
import LoginPage from "./pages/Auth/LoginPage";
import { SignUpPage } from "./pages/Auth/SignUpPage";
import MainScreen from "./pages/Home/MainScreen";
import jwtDecode from "jwt-decode";
import { getIDUser } from "./utils/auth";
function App() {
  return (
    <div className="screen">
      <div className="wrapper">
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
