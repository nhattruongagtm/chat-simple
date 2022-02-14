import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface InitialFriends{
    isRequest: boolean,
}
const initialState: InitialFriends = {
    isRequest: false
}
export interface PairFriends{
    uid: string
    fid: string
    type: number
}
const friendReducer = createSlice({
    name: "friends",
    initialState,
    reducers: {
        requestAddFriend:(state, action: PayloadAction<PairFriends>)=>{
            state.isRequest = true
        },
        requestAddFriendSuccess:(state)=>{
            state.isRequest = false
        },
        requestAddFriendFail:(state)=>{
            state.isRequest = false
        },
    }

})

export const {requestAddFriend,requestAddFriendFail,requestAddFriendSuccess} = friendReducer.actions
export default friendReducer.reducer