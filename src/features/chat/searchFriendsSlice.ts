import { createSlice, PayloadAction } from "@reduxjs/toolkit"

export interface Keyword{
    keyword: string
}

const initialState: Keyword = {
    keyword: ''
}

const searchFriendsReducer = createSlice({
    name: 'searchFriends',
    initialState,
    reducers: {
        onChangeKeyword: (state,action: PayloadAction<string>) =>{
            state.keyword = action.payload
        },
    }
})

export const {onChangeKeyword} = searchFriendsReducer.actions

export default searchFriendsReducer.reducer