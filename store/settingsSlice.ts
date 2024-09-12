import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface SettingsState {
    [key: string]: any
}

const advancedState: SettingsState = {}

const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    personality: "normal",
    mood: 'normal',
    responseSize: 'medium',
    advanced: advancedState
  },
  reducers: {
    setParam: (state: SettingsState, action: PayloadAction<any>) => {
      const { key, value } = action.payload;

      if (state[key] !== value) {
        state[key] = value;
      }
    },

    setAdvancedParam: (state: SettingsState, action: PayloadAction<any>) => {
        const { id, value } = action.payload;
        
        state.advanced[id] = value;
    }
  },
});

export const { setParam, setAdvancedParam } = settingsSlice.actions;

export default settingsSlice.reducer;
