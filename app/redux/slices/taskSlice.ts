import { AddTodoTypes, initalStateTypes, Task } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

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
      const response = await axios.post(`${BASE_URL}/api/task`, taskData);
      const newTask = await response.data;
      return newTask;
    } catch (error) {
      console.log(error);

      return rejectWithValue("Something Went Wrong");
    }
  }
);

export const fetchTasks = createAsyncThunk("tasks/fetchTask", async () => {
  try {
    const response = await axios.get(`${BASE_URL}/api/task`);
    const Tasks = await response.data;
    return Tasks;
  } catch (error) {
    console.log(error);

    return new Error("Something Went Wrong");
  }
});

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
      state.task = action.payload;
    });
    builder.addCase(addTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log(
        "Error While adding task with taskSlice line no 43",
        action.payload
      );
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
      console.log("Error While Fetching Tasks", action.payload);
    });
  },
});

export default addTaskSlice.reducer;
