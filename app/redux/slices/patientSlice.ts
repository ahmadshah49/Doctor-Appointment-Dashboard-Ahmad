import { Patient, patientInitialState } from "@/app/types/Type";
import { BASE_URL } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState: patientInitialState = {
  patient: [],
  isLoading: false,
  isError: false,
};

export const addPatient = createAsyncThunk(
  "patient/add",
  async (patientData: Patient, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/patient`, patientData);
      const newPatient = await response?.data;
      console.log("New Patient", newPatient);
      return newPatient;
    } catch (error) {
      console.log("Error while adding patients", error);
      rejectWithValue(error);
    }
  }
);

const addPatientSlice = createSlice({
  name: "Add patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(addPatient.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(addPatient.fulfilled, (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.patient = [action.payload, ...state.patient].sort(
        (a, b) => new Date(b.Date).getTime() - new Date(a.Date).getTime()
      );
      builder.addCase(addPatient.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        console.log("error", action.error.message);
      });
    });
  },
});

export default addPatientSlice.reducer;
