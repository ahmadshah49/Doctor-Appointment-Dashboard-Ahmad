import { initalStateTypes, patientInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: initalStateTypes = {
  isError: false,
  isLoading: false,
  task: [],
};

export const deleteTask = createAsyncThunk(
  "task/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/task`, {
        data: { id },
      });
      const deleteTask = response?.data;
      console.log("Deleted", deleteTask);
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
      console.log("Error", action.payload);
    });
  },
});

export default DeleteTaskSlice.reducer;
