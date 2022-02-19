import { PayloadAction } from "@reduxjs/toolkit";
import { take, takeEvery } from "redux-saga/effects";
import { requestSendMessage } from "../features/chat/chatSlice";
import { ChatItem } from "../models/chat";

function* sendMessageWatcher(action: PayloadAction<ChatItem>){
    console.log(action.payload)
}
function* sendMessageSaga(){
    yield takeEvery(requestSendMessage,sendMessageWatcher)
}

export default sendMessageSaga;
