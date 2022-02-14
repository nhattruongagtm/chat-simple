import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, takeLatest } from "redux-saga/effects";
import { addFriend } from "../api/chat";
import { PairFriends, requestAddFriend } from "../features/chat/friendsSlice";

function* addFriendWatcher(action: PayloadAction<PairFriends>) {
  yield delay(500);
  const { uid, fid, type } = action.payload;
  try {

    yield call(addFriend,uid,fid,type);
  } catch (error) {
  }
}

export function* addFriendSaga() {
  yield takeLatest(requestAddFriend, addFriendWatcher);
}
