import { UserInfo, UserState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const updateUser = createAsyncThunk(
  "user/update",
  async (data: UserInfo, { rejectWithValue }) => {
    try {
      const res = await axios.put(`${BASE_URL}/api/profile`, data);
      const resData = res?.data;
      return resData;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const updateUserSlice = createSlice({
  name: "userUpdate",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder.addCase(updateUser.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(updateUser.fulfilled, (state, action) => {
      state.loading = false;
      state.user = action.payload;
    });

    builder.addCase(updateUser.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload as string;
    });
  },
});

export default updateUserSlice.reducer;
