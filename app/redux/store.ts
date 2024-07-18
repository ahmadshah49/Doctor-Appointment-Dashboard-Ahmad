"use client";
import { configureStore } from "@reduxjs/toolkit";
import addTaskReducer from "./slices/taskSlice";
export const store = configureStore({
  reducer: {
    task: addTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
