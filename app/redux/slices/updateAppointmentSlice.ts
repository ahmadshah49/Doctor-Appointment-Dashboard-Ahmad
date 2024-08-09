import { Appointment, AppointmentInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AppointmentInitialState = {
  isError: false,
  isLoading: false,
  appointment: [],
};

export const updateAppointment = createAsyncThunk(
  "appointment/update",
  async (AppointmentData: Appointment, { rejectWithValue }) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/appointment`,
        AppointmentData
      );
      const updateAppointment = response?.data;

      return updateAppointment;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const UpdateAppointmentSlice = createSlice({
  name: "Update Appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updateAppointment.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updateAppointment.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.appointment = action.payload;
    });
    builder.addCase(updateAppointment.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default UpdateAppointmentSlice.reducer;
