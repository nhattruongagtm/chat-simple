import { createSlice } from "@reduxjs/toolkit"

export interface Modal{
    searchUser: boolean;
    isDisplayLayer: boolean;
}
const initialState: Modal = {
    searchUser: false,
    isDisplayLayer: false,
}

export const modalSlice = createSlice({
    name: 'modal',
    initialState,
    reducers: {
        openSearchUserPopup:(state)=>{
            state.searchUser = true
            state.isDisplayLayer = true
        },
        closeSearchUserPopup:(state)=>{
            state.searchUser = false
            state.isDisplayLayer =false
        }

    }
})

export const {openSearchUserPopup,closeSearchUserPopup} = modalSlice.actions;

export default modalSlice.reducer