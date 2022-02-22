import { PayloadAction } from "@reduxjs/toolkit";
import { delay, takeLatest } from "redux-saga/effects";
import { Keyword, onChangeKeyword } from "../features/chat/searchFriendsSlice";

function* searchWatcher(action: PayloadAction<string>) {
  yield delay(500);

  console.log(action.payload);
}

function* searchFriendsSaga() {
  yield takeLatest(onChangeKeyword, searchWatcher);
}
export default searchFriendsSaga;
