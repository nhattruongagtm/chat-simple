import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ChatCollection } from "../../components/MainChat/ChatFrame";
import { MessageModel } from "../../components/MainChat/InputFrame";
import { ChatItem, ChatListData } from "../../models/chat";

const initialState: InitialState = {
  loading: false,
  chatList: [
    // {
    //   images: [],
    //   messages: [],
    //   members: [],
    //   type: 0,
    // },
  ],
  sendLoading: false,
  chatDetail: [],
  chatID: "",
};
interface InitialState {
  chatList: ChatListData[];
  loading: boolean;
  sendLoading: boolean;
  chatDetail: ChatItem[];
  chatID: string;
}

const ChatMainReducer = createSlice({
  name: "chatMain",
  initialState,
  reducers: {
    // requestLoadMessages: (state, action: PayloadAction<string>) => {
    //   state.loading = true;
    // },
    // requestLoadMessagesSuccess: (state, action: PayloadAction<ChatList>) => {
    //   state.loading = false;
    //   state.chatList = action.payload;
    // },
    // requestLoadMessagesFail: (state) => {
    //   state.loading = false;
    // },
    requestLoadMessages1: (state, action: PayloadAction<string>) => {
      state.loading = true;
    },
    requestLoadMessagesSuccess1: (
      state,
      action: PayloadAction<ChatListData[]>
    ) => {
      state.loading = false;
      state.chatList = action.payload;
    },
    requestLoadMessageItemSuccess: (
      state,
      action: PayloadAction<ChatListData>
    ) => {
      const index = state.chatList.findIndex(
        (item) => item.id === action.payload.id
      );

      if (index > -1) {
        state.chatList[index] = action.payload;
      }
      else{
        state.chatList.push(action.payload)
      }
    },
    requestLoadMessagesFail1: (state) => {
      state.loading = false;
    },
    requestLoadDetail: (state, action: PayloadAction<ChatItem[]>) => {
      state.chatDetail = action.payload;
    },
    requestLoadDetailSuccess: (state, action: PayloadAction<ChatItem[]>) => {
      state.chatDetail = action.payload;
    },
    requestLoadDetailFail: (state, action: PayloadAction<ChatItem[]>) => {},
    requestSendMessage: (state, action: PayloadAction<MessageModel>) => {
      const { id, content, info } = action.payload;

      const index = state.chatList.findIndex((item) => item.id === id);

      if (index > -1) {
        state.chatList[index].messages.push({
          friend: info,
          data: content,
        });
      }

    },
    requestSendMessageSuccess: (state, action: PayloadAction<MessageModel>) => {
      const { id, content, info } = action.payload;

      const index = state.chatList.findIndex((item) => item.id === id);
      if (index > -1) {
        const indexItem = state.chatList[index].messages.findIndex(
          (item) => item.data.id === content.id
        );
        if (indexItem > -1) {
          state.chatList[index].messages[indexItem].data.sendStatus = 1;
        }
      }
    },
    requestSendMessageFail: (state) => {
      state.sendLoading = false;
    },
    updateChatID: (state, action: PayloadAction<string>) => {
      state.chatID = action.payload;
    },
  },
});

export const {
  requestLoadMessages1,
  requestLoadMessagesFail1,
  requestLoadMessagesSuccess1,
  requestSendMessage,
  requestSendMessageFail,
  requestSendMessageSuccess,
  requestLoadDetail,
  requestLoadDetailFail,
  requestLoadDetailSuccess,
  updateChatID,
  requestLoadMessageItemSuccess,
} = ChatMainReducer.actions;

export default ChatMainReducer.reducer;
