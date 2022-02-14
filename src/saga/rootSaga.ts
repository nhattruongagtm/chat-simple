import { all, delay, takeEvery, takeLatest } from "redux-saga/effects";
import { addFriendSaga } from "./addFriendSaga";
import loadMessageSaga from "./loadMessagesSaga";
import loginSaga from "./loginSaga";
import signUpSaga from "./signUpSaga";

export function* rootSaga() {
  yield all([signUpSaga(), loginSaga(), addFriendSaga(), loadMessageSaga()]);
}
