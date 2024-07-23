"use client";
import { configureStore } from "@reduxjs/toolkit";
import TaskReducer from "./slices/taskSlice";
import PatientReducer from "./slices/patientSlice";
import DeletePatientReducer from "./slices/deletePatientSlice";
import UpdatePatientReducer from "./slices/updatePatientSlice";
import UpdateTaskReducer from "./slices/updateTaskSlice";
import DeleteTaskReducer from "./slices/deleteTaskSlice";
export const store = configureStore({
  reducer: {
    task: TaskReducer,
    patient: PatientReducer,
    deletePatient: DeletePatientReducer,
    updatePatient: UpdatePatientReducer,
    deleteTask: DeleteTaskReducer,
    updateTask: UpdateTaskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
