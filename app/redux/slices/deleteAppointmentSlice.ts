import { AppointmentInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: AppointmentInitialState = {
  isError: false,
  isLoading: false,
  appointment: [],
};

export const deleteAppointment = createAsyncThunk(
  "appointment/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/appointment`, {
        data: { id },
      });
      const deleteAppointment = response?.data;

      return deleteAppointment;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const DeleteAppointmentSlice = createSlice({
  name: "delete Appointment",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deleteAppointment.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deleteAppointment.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.appointment = action.payload;
    });
    builder.addCase(deleteAppointment.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default DeleteAppointmentSlice.reducer;
