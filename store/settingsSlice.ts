import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    [key: string]: any
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    personality: "normal",
    mood: 'normal',
    responseSize: 'medium'
  },
  reducers: {
    setParam: (state: SettingsState, action: PayloadAction<any>) => {
      const { key, value } = action.payload;

      if (state[key] !== value) {
        state[key] = value;
      }
    },
  },
});

export const { setParam } = settingsSlice.actions;

export default settingsSlice.reducer;
