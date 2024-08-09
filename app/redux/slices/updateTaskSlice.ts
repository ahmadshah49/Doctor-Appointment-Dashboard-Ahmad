import { initalStateTypes, Task } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: initalStateTypes = {
  isError: false,
  isLoading: false,
  task: [],
};

export const updateTask = createAsyncThunk(
  "task/update",
  async (TaskData: Task, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/task`, TaskData);
      const updateTask = response?.data;
      console.log("task data", TaskData);

      console.log("Updated", updateTask);
      return updateTask;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const UpdateTaskSlice = createSlice({
  name: "Update Task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateTask.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateTask.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.task = [action.payload, ...state.task];
      // state.task = state.task.map((task) =>
      //   task.id === action.payload.id ? action.payload : task
      // );
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("Error", action.payload);
    });
  },
});

export default UpdateTaskSlice.reducer;
