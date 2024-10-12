import { Patient, patientInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: patientInitialState = {
  patient: [],
  isLoading: false,
  isError: false,
};

export const addPatient = createAsyncThunk(
  "patient/add",
  async (patientData: Patient, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(`/api/patient`, patientData);
      const newPatient = await response?.data;

      return newPatient;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);
export const getPatient = createAsyncThunk(
  "patient/get",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(`/api/patient`);
      const GetPatients = await response?.data;

      return GetPatients;
    } catch (error) {
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
    });
  },
});

export default PatientSlice.reducer;
