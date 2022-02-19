import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TabType = 0 | 1 | 2;
export interface Device {
  width: number;
  tab: TabType;
  loadingTime: number;
}

const initialState: Device = {
  width: 0,
  tab: 0,
  loadingTime: 0.2,
};

const deviceReducer = createSlice({
  name: "device",
  initialState,
  reducers: {
    updateWidth: (state, action: PayloadAction<number>) => {
      state.width = action.payload;
    },
    updateTab: (state, action: PayloadAction<TabType>) => {
      state.tab = action.payload;
    },
    updateLoadingTime: (state, action: PayloadAction<number>) => {
      state.loadingTime = action.payload;
    },
  },
});

export const { updateWidth, updateTab,updateLoadingTime } = deviceReducer.actions;

export default deviceReducer.reducer;
