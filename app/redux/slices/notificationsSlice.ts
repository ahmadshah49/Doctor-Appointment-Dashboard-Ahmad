import { NotificationInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: NotificationInitialState = {
  data: [],
  isError: false,
  isLoading: false,
};
export const addNotification = createAsyncThunk(
  "notification/add",
  async (data: string, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/api/notification`, { data });

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
      const res = await axiosInstance.get(`/api/notification`);
      console.log(res?.data);
      const data = res?.data;
      return data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteNotifications = createAsyncThunk(
  "notification/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/notification`, {
        data: { id },
      });
      const deleteNotification = response?.data;

      return deleteNotification;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const deleteAllNotifications = createAsyncThunk(
  "notification/deleteAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(
        `/api/deleteAllNotifications`
      );
      const deleteAllNotifications = response?.data;
      return deleteAllNotifications;
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
    });
    builder.addCase(getNotification.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(getNotification.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = Array.isArray(action.payload) ? action.payload : [];
    });
    builder.addCase(getNotification.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteNotifications.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteNotifications.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteNotifications.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
    builder.addCase(deleteAllNotifications.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteAllNotifications.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.data = action.payload;
    });
    builder.addCase(deleteAllNotifications.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});
export default notificationSlice.reducer;
