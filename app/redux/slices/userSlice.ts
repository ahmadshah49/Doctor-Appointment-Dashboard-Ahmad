import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { UserInfo, UserState } from "@/app/types/Type";
import axios from "axios";



const initialState: UserState = {
  user: null,
  loading: false,
  error: null,
};

export const fetchCurrentUser = createAsyncThunk(
  "user/fetchCurrentUser",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get("http://localhost:3000/api/getLoginUser");
      const data = res.data;
      console.log("Get Current User Data", data);
      return data;
    } catch (error) {
      return rejectWithValue("Failed to fetch user");
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default userSlice.reducer;
