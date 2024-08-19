import { configureStore } from "@reduxjs/toolkit";
import settingsSlice from "./settingsSlice";
import { TypedUseSelectorHook, useDispatch, useSelector, useStore } from "react-redux";

export const store = configureStore({
    reducer: {
        settings: settingsSlice,
        users: Object,
        chats: Object,
        messages: Object
    }
})

export type AppStore = typeof store;
export type RootState = ReturnType<AppStore['getState']>;
export type AppDispatch = AppStore['dispatch'];

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppStore: () => AppStore = useStore;