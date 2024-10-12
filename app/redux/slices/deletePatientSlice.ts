import { patientInitialState } from "@/app/types/Type";
import { axiosInstance } from "@/app/utils/axiosInstance";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState: patientInitialState = {
  isError: false,
  isLoading: false,
  patient: [],
};

export const deletePatient = createAsyncThunk(
  "patient/delete",
  async (id: any, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(`/api/patient`, {
        data: { id },
      });
      const deletePatient = response?.data;

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
    });
  },
});

export default DeletePatientSlice.reducer;
