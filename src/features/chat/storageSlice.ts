import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ThemeMessage } from "../../components/Detail/Detail";
import { MESSAGE__THEME } from "../../constants/storage";

interface Storage {
  theme: ThemeMessage[];
}
const initialState: Storage = {
  theme: [],
};

const storageSlice = createSlice({
  name: "storage",
  initialState,
  reducers: {
    changeColor: (state, action: PayloadAction<ThemeMessage[]>) => {
      localStorage.setItem(MESSAGE__THEME, JSON.stringify(action.payload));
      state.theme = action.payload;
    },
  },
});

export const { changeColor } = storageSlice.actions;

export default storageSlice.reducer;
