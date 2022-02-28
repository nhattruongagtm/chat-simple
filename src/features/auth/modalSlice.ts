import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { StaticRouter } from "react-router";

export interface MemberInfo {
  id: string;
  avatar: string;
  name: string;
}
export interface Modal {
  searchUser: boolean;
  isAddGroup: {
    state: boolean;
    users: MemberInfo[];
  };
  isDisplayLayer: boolean;
}
const initialState: Modal = {
  searchUser: false,
  isAddGroup: {
    state: false,
    users: [],
  },
  isDisplayLayer: false,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openSearchUserPopup: (state) => {
      state.searchUser = true;
      state.isDisplayLayer = true;
      
    },
    closeSearchUserPopup: (state) => {
      state.searchUser = false;
      state.isDisplayLayer = false;
    },
    isAddGroup: (state) => {
      state.isAddGroup.state = !state.isAddGroup.state;
    },
    addMemberIntoGroup: (state, action: PayloadAction<MemberInfo>) => {
      const index = state.isAddGroup.users.findIndex(
        (item) => item.id === action.payload.id
      );

      index === -1 && state.isAddGroup.users.push(action.payload);
    },
    removeMemberInGroup: (state, action: PayloadAction<string>) => {
      state.isAddGroup.users = state.isAddGroup.users.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const {
  openSearchUserPopup,
  closeSearchUserPopup,
  isAddGroup,
  addMemberIntoGroup,
  removeMemberInGroup,
} = modalSlice.actions;

export default modalSlice.reducer;
