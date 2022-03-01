import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ACCESS__TOKEN } from "../../constants/routes";
import { User } from "../../models/auth";

export interface SignUpUser {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}
export interface LoginUser {
  email: string;
  password: string;
}
export interface AuthState {
  isLoading: boolean;
  user: SignUpUser | LoginUser | null;
  error: string;
  myAccount: User;
}
const initialState: AuthState = {
  isLoading: false,
  user: {
    email: "",
    password: "",
    firstName: "",
    lastName: "",
  },
  error: "",
  myAccount: {
    firstName: "",
    lastName: "",
    email: "",
    createdDate: Date.now(),
    friends: [],
    password: "",
    photoUrl: "",
    uid: "",
  },
};
export const signUpSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    requestSignUp: (state, action: PayloadAction<SignUpUser>) => {
      state.isLoading = true;
      state.user = action.payload;
      state.error = "";
    },
    requestSignUpSuccess: (state) => {
      state.isLoading = false;
      state.error = "";
    },
    requestSignUpFail: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      state.error = action.payload;
      state.user = null;
    },
    requestLogin: (state, action: PayloadAction<LoginUser>) => {
      state.isLoading = true;
    },
    requestLoginSuccess: (state, action: PayloadAction<string>) => {
      state.isLoading = false;
      localStorage.setItem(ACCESS__TOKEN, action.payload);
    },
    requestLoginFail: (state) => {
      state.isLoading = false;
    },
    updateMyId: (state, action: PayloadAction<User>) => {
      const user = action.payload;
      state.myAccount = user;
      state.myAccount.password = "****************";
    },
    requestLogout: (state) => {
      localStorage.removeItem(ACCESS__TOKEN);
      state = initialState;
    },
  },
});

export const {
  requestSignUp,
  requestSignUpFail,
  requestSignUpSuccess,
  requestLogin,
  requestLoginFail,
  requestLoginSuccess,
  updateMyId,
  requestLogout,
} = signUpSlice.actions;

export default signUpSlice.reducer;
