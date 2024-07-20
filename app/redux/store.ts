"use client";
import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slices/taskSlice";
import PatientReducer from "./slices/patientSlice";
export const store = configureStore({
  reducer: {
    task: TaskReducer,
    patient: PatientReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
