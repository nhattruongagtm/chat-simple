import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatCollection } from "../../components/MainChat/ChatFrame";
import { MessageModel } from "../../components/MainChat/InputFrame";
import { ChatItem, ChatList } from "../../models/chat";

const initialState: InitialState = {
  loading: false,
  chatList: {
    images: [],
    messages: [],
  },
  sendLoading: false,
  chatDetail: [],
};
interface InitialState {
  chatList: ChatList;
  loading: boolean;
  sendLoading: boolean;
  chatDetail: ChatItem[];
}

const ChatMainReducer = createSlice({
  name: "chatMain",
  initialState,
  reducers: {
    requestLoadMessages: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    requestLoadMessagesSuccess: (state, action: PayloadAction<ChatList>) => {
      state.loading = false;
      state.chatList = action.payload;
    },
    requestLoadMessagesFail: (state) => {
      state.loading = false;
    },
    requestLoadDetail: (state, action: PayloadAction<ChatItem[]>) => {
        state.chatDetail = action.payload
    },
    requestLoadDetailSuccess: (state, action: PayloadAction<ChatItem[]>) => {
      state.chatDetail = action.payload;
    },
    requestLoadDetailFail: (state, action: PayloadAction<ChatItem[]>) => {},
    requestSendMessage: (state, action: PayloadAction<MessageModel>) => {
      state.sendLoading = true;
      // state.chatDetail.push(action.payload.) 
      
    },
    requestSendMessageSuccess: (state, action: PayloadAction<ChatItem>) => {
      state.sendLoading = true;
      state.chatDetail.push(action.payload)  
    },
    requestSendMessageFail: (state) => {
      state.sendLoading = false;
    },
  },
});

export const {
  requestLoadMessages,
  requestLoadMessagesFail,
  requestLoadMessagesSuccess,
  requestSendMessage,
  requestSendMessageFail,
  requestSendMessageSuccess,
  requestLoadDetail,
  requestLoadDetailFail,
  requestLoadDetailSuccess,
} = ChatMainReducer.actions;

export default ChatMainReducer.reducer;
