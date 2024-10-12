import { AppointmentInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: AppointmentInitialState = {
  appointment: [],
  isError: false,
  isLoading: false,
};

export const fetchAppointment = createAsyncThunk(
  "getAppointment/fetchAppointments",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/appointment`);
      const data = response.data;
      return data;
    } catch (error) {
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
    });
  },
});

export default getAppointment.reducer;
