import { Patient, patientInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: patientInitialState = {
  isError: false,
  isLoading: false,
  patient: [],
};

export const updatePatient = createAsyncThunk(
  "patient/update",
  async (patientData: Patient, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(`/api/patient`, patientData);
      const updatePatient = response?.data;

      return updatePatient;
    } catch (error) {
      rejectWithValue(error);
    }
  }
);

const UpdatePatientSlice = createSlice({
  name: "Update patient",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(updatePatient.pending, (state) => {
      state.isError = false;
      state.isLoading = true;
    });
    builder.addCase(updatePatient.fulfilled, (state, action) => {
      state.isError = false;
      state.isLoading = false;
      state.patient = action.payload;
    });
    builder.addCase(updatePatient.rejected, (state, action) => {
      state.isError = true;
      state.isLoading = false;
    });
  },
});

export default UpdatePatientSlice.reducer;
