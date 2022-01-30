import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SignUpUser {
  email: string;
  password: string;
}
export interface SignUpState {
  isLoading: boolean;
  user: SignUpUser;
  error: string;
}
const initialState: SignUpState = {
  isLoading: false,
  user: {
    email: "",
    password: "",
  },
  error: "",
};
export const signUpSlice = createSlice({
  name: "signUp",
  initialState,
  reducers: {
    requestSignUp: (state) => {
      state.isLoading = true;
    },
    requestSignUpSuccess: (state, action: PayloadAction<SignUpUser>)=>{
        state.isLoading = false;
        state.user = action.payload;
    },
    requestSignUpFail: (state,action: PayloadAction<string>) =>{
        state.isLoading = false;
        state.error = action.payload;
    }
  },
});

export const {requestSignUp,requestSignUpFail,requestSignUpSuccess} = signUpSlice.actions;

export default signUpSlice.reducer

