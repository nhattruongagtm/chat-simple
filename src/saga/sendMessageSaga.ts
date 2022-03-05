import { PayloadAction } from "@reduxjs/toolkit";
import { call, delay, put, take, takeEvery } from "redux-saga/effects";
import { blob } from "stream/consumers";
import { sendMessage } from "../api/chat";
import { uploadMedia } from "../api/storage";
import { BlobType, MessageModel } from "../components/MainChat/InputFrame";
import {
  requestSendMessage,
  requestSendMessageSuccess,
} from "../features/chat/chatSlice";
import { ChatItem } from "../models/chat";
const getListUrl = (list: BlobType[], type: number = 0) => {
  const result: File[] = [];
  for (let i = 0; i < list.length; i++) {
    const item = list[i];
    if (item.type === type) {
      result.push(item.file);
    }
  }
  return result;
};
function* sendMessageWatcher({ payload }: PayloadAction<MessageModel>) {
  try {
    const { id, content, blobs } = payload;

    if (blobs && blobs.length > 0) {
      let urls:string[] = []
      let videoUrls:string[] = []

      let urlType: File[] = yield call(getListUrl,blobs,0);
      let videoType: File[] = yield call(getListUrl,blobs,1);

      if(urlType.length > 0){
        const url: string[] = yield call(
          uploadMedia,
          content.ownID,
          id,
          urlType
        );
        urls = url;
      }
      else{
        urls = []
      }
      if(videoType.length > 0){
        const url: string[] = yield call(
          uploadMedia,
          content.ownID,
          id,
          videoType
        );
        videoUrls = url;
      }
      else{
        videoUrls = []
      }

      const newContent: ChatItem = {
        ...content,
        content: { ...content.content, media: urls, video: videoUrls },
      };
      yield call(sendMessage, id, newContent);
    } else {
      yield call(sendMessage, id, content);
    }

    // // update send status
    yield delay(500);
    yield put(requestSendMessageSuccess(payload));
  } catch (error) {
    console.log(error);
  }
}
function* sendMessageSaga() {
  yield takeEvery(requestSendMessage, sendMessageWatcher);
}

export default sendMessageSaga;
