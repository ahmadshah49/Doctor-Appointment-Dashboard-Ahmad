import { patientInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: patientInitialState = {
  isError: false,
  isLoading: false,
  patient: [],
};

export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axios.delete(`${BASE_URL}/api/patient`, {
        data: { id },
      });
      const deletePatient = response?.data;
      console.log("Deleted", deletePatient);
      return deletePatient;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const DeletePatientSlice = createSlice({
  name: "delete patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(deletePatient.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(deletePatient.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(deletePatient.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("Error", action.payload);
    });
  },
});

export default DeletePatientSlice.reducer;
