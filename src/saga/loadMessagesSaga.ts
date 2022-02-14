import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, takeEvery, takeLatest } from "redux-saga/effects";
import { getChatList } from "../api/chat";
import { requestLoadMessages, requestLoadMessagesSuccess } from "../features/chat/chatSlice";
import { ChatList } from "../models/chat";

function* loadMessageWatcher(action: PayloadAction<string>){
    try{
        const uid = action.payload;
        const result: ChatList = yield call(getChatList,uid);

        yield put(requestLoadMessagesSuccess(result))
    }
    catch(e){
        console.log(e)
    }
}
function* loadMessageSaga(){
    yield takeEvery(requestLoadMessages,loadMessageWatcher)
}
export default loadMessageSaga;