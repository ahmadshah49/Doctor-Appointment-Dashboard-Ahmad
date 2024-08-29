import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
type checkBoxType = {
  isError: boolean;
  isLoading: boolean;
  completed: string;
};
type CheckBoxData = {
  id: string;
  completed: string;
};
const initialState: checkBoxType = {
  isError: false,
  isLoading: false,
  completed: "",
};
export const updateCheckBoxTask = createAsyncThunk(
  "taskCheckbox/update",
  async (data: CheckBoxData, { rejectWithValue }) => {
    try {
      const response = await axios.put(`${BASE_URL}/api/updateTask`, data);
      const updateCheckBox = response?.data;

      return updateCheckBox;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
const UpdateTaskCheckBoxSlice = createSlice({
  name: "Update Task CheckBox",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateCheckBoxTask.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateCheckBoxTask.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.completed = action.payload;
    });
    builder.addCase(updateCheckBoxTask.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export default UpdateTaskCheckBoxSlice.reducer;
