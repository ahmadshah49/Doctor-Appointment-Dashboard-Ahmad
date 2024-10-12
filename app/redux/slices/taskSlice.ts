import { initalStateTypes, Task } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: initalStateTypes = {
  task: [],
  isLoading: false,
  isError: false,
  errorMessage: "",
};

export const addTask = createAsyncThunk(
  "tasks/addTask",
  async (taskData: Task, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/task`, taskData);
      const newTask = response.data;

      return newTask;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const fetchTasks = createAsyncThunk(
  "tasks/fetchTask",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/task`);
      const Tasks = await response?.data;

      return Tasks;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

const addTaskSlice = createSlice({
  name: "Add Task",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addTask.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(addTask.fulfilled, (state, action) => {
      state.isLoading = false;
      state.task = [action.payload, ...state.task].sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(fetchTasks.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.task = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default addTaskSlice.reducer;
