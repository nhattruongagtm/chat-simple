import { PayloadAction } from "@reduxjs/toolkit";
import { call, put, takeEvery } from "redux-saga/effects";
import { getRoomList } from "../api/chat";
import { requestLoadMessages1, requestLoadMessagesSuccess1 } from "../features/chat/chatSlice";
import { ChatListData } from "../models/chat";

function* loadMessageWatcher(action: PayloadAction<string>){
    try{
        const uid = action.payload;

        
        const result: ChatListData[] = yield call(getRoomList,uid);
        
        yield put(requestLoadMessagesSuccess1(result))
    }
    catch(e){
        console.log(e)
    }
}
function* loadMessageSaga(){
    yield takeEvery(requestLoadMessages1,loadMessageWatcher)
}
export default loadMessageSaga;