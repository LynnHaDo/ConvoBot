import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    [key: string]: any
}

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    personality: "normal",
    mood: 'normal',
    responseSize: 'medium',
    advanced: {} as SettingsState
  },
  reducers: {
    setParam: (state: SettingsState, action: PayloadAction<any>) => {
      const { key, value } = action.payload;

      if (state[key] !== value) {
        state[key] = value;
      }
    },

    setAdvancedParam: (state: SettingsState, action: PayloadAction<any>) => {
        const { key, value } = action.payload;

        if (state.advanced[key] !== value) {
            state.advanced[key] = value;
        }
    }
  },
});

export const { setParam, setAdvancedParam } = settingsSlice.actions;

export default settingsSlice.reducer;
