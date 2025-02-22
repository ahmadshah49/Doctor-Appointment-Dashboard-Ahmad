import { Appointment, AppointmentInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
const initialState: AppointmentInitialState = {
  appointment: [],
  isError: false,
  isLoading: false,
};

export const addAppointment = createAsyncThunk(
  "addAppontent/add",
  async (data: Appointment, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/appointment`, data);

      return response?.data;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const addAppontentSlice = createSlice({
  name: "addAppontent",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addAppointment.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addAppointment.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.appointment.push(action.payload);
    });
    builder.addCase(addAppointment.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
    });
  },
});

export default addAppontentSlice.reducer;
