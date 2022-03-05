import { PayloadAction } from "@reduxjs/toolkit";
import { push } from "connected-react-router";
import { User } from "firebase/auth";
import { User as UserInfo } from "../models/auth";
import md5 from "md5";
import { call, delay, put, takeLatest } from "redux-saga/effects";
import { getUserByID, login } from "../api/firestore";
import { LOGIN_FAIL, LOGIN_SUCCESS } from "../constants/notify";
import { ACCESS__TOKEN } from "../constants/routes";
import {
  LoginUser,
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  updateMyId,
  
} from "../features/auth/signUpSlice";
import useGetUser from "../hooks/useGetUser";

const getToken = async (user: User) => {
  const result = await user.getIdToken();
  return result;
};
function* loginWatcher(action: PayloadAction<LoginUser>) {
  yield delay(500);
  try {
    const { email, password } = action.payload;
    const result: User = yield call(login, email, md5(password));

    if (result) {
      const token: string = yield call(getToken, result);
      if (token) {
        yield put(requestLoginSuccess(token));
        const user: UserInfo = yield call(getUserByID,result.uid);
        yield put(updateMyId(user))
        yield put(push("/me"));
      } else {
        yield put(requestLoginFail());
      }
    }
  } catch (error) {
    console.log("e", error);
  }
}
function* loginSaga() {
  yield takeLatest(requestLogin, loginWatcher);
}

export default loginSaga;
