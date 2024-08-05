import { Notification, NotificationInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: NotificationInitialState = {
  data: [],
  isError: false,
  isLoading: false,
};
export const addNotification = createAsyncThunk(
  "notification/add",
  async (data: string, { rejectWithValue }) => {
    try {
      const res = await axios.post(`${BASE_URL}/api/notification`, { data });
      const notification = res?.data;
      return notification;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getNotification = createAsyncThunk(
  "notification/get",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(`${BASE_URL}/api/notification`);
      const data = res?.data;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(addNotification.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(addNotification.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(addNotification.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("error", action.payload);
    });
    builder.addCase(getNotification.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(getNotification.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("error", action.payload);
    });
  },
});
export default notificationSlice.reducer;
