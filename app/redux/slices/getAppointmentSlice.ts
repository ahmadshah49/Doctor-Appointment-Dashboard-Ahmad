import { AppointmentInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AppointmentInitialState = {
  appointment: [],
  isError: false,
  isLoading: false,
};

export const fetchAppointment = createAsyncThunk(
  "getAppointment/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/appointment`);
      const data = response.data;
      console.log("Appointment Data", data);
      return data;
    } catch (error) {
      console.log("Error While Getting the appointments", error);
      rejectWithValue(error);
    }
  }
);

const getAppointment = createSlice({
  name: "getAppointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAppointment.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(fetchAppointment.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.appointment = action.payload;
    });
    builder.addCase(fetchAppointment.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("Error while getting appointments", action.payload);
    });
  },
});

export default getAppointment.reducer;
