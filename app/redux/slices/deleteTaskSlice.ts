import { initalStateTypes } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: initalStateTypes = {
  isError: false,
  isLoading: false,
  task: [],
};

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/task`, {
        data: { id },
      });
      const deleteTask = response?.data;
      return deleteTask;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const DeleteTaskSlice = createSlice({
  name: "delete task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteTask.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteTask.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.task = action.payload;
    });
    builder.addCase(deleteTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default DeleteTaskSlice.reducer;
