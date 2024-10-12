import { initalStateTypes, Task } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: initalStateTypes = {
  isError: false,
  isLoading: false,
  task: [],
};

export const updateTask = createAsyncThunk(
  "task/update",
  async (TaskData: Task, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/task`, TaskData);
      const updateTask = response?.data;

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
    });
    builder.addCase(updateTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default UpdateTaskSlice.reducer;
