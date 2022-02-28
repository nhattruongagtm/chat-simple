import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, take, takeEvery } from "redux-saga/effects";
import { sendMessage } from "../api/chat";
import { MessageModel } from "../components/MainChat/InputFrame";
import {
  requestSendMessage,
  requestSendMessageSuccess,
} from "../features/chat/chatSlice";
import { ChatItem } from "../models/chat";

function* sendMessageWatcher({ payload }: PayloadAction<MessageModel>) {
  try {
    const { id, content } = payload;
    yield call(sendMessage, id, content);
    // update send status
    yield delay(500)
    yield put(requestSendMessageSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}
function* sendMessageSaga() {
  yield takeEvery(requestSendMessage, sendMessageWatcher);
}

export default sendMessageSaga;
