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
export const getPatient = createAsyncThunk(
  "patient/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/patient`);
      const GetPatients = await response?.data;
      console.log("Get Patient", GetPatients);
      return GetPatients;
    } catch (error) {
      console.log("Error while getting patients", error);
      rejectWithValue(error);
    }
  }
);

const PatientSlice = createSlice({
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
      state.patient.push(action.payload);
    });
    builder.addCase(addPatient.rejected, (state, action) => {
      state.isLoading = false;
      state.isError = true;
      console.log("error", action.error.message);
    });
    builder.addCase(getPatient.pending, (state) => {
      state.isLoading = true;
      state.isError = false;
    });
    builder.addCase(getPatient.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(getPatient.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
      console.log("Error", action.error.message);
    });
  },
});

export default PatientSlice.reducer;
