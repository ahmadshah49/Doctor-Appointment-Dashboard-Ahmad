import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
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
      const response = await axiosInstance.put(`/api/updateTask`, data);
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
