import { prisma } from "@/app/lib/prisma";
import { taskState, TodoTypes } from "@/app/types/Type";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: taskState = {
  tasks: [],
  isLoading: false,
  isError: "",
};

export const fetchTasks = createAsyncThunk<
  TodoTypes[],
  void,
  { rejectValue: string }
>("tasks/fetchTasks", async (_, { rejectWithValue }) => {
  try {
    const tasks = await prisma.task.findMany();
    console.log("tasks in Slice", tasks);

    return tasks;
  } catch (error) {
    console.error("Error While Fetching Collections");
    return rejectWithValue("Failed to fetch tasks");
  }
});

console.log(fetchTasks.name);

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchTasks.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchTasks.fulfilled, (state, action) => {
      state.isLoading = false;
      state.tasks = action.payload;
    });
    builder.addCase(fetchTasks.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = action.error.message ?? "Failed  to fetch Tasks";
    });
  },
});
export default taskSlice.reducer;
