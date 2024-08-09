"use client";

import { addPatient, getPatient } from "@/app/redux/slices/patientSlice";
import { updatePatient } from "@/app/redux/slices/updatePatientSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddPatientTypes, PatientStatus } from "@/app/types/Type";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useAddPatient = ({
  onClose,
  isUpdate,
  id,
  patient,
}: AddPatientTypes) => {
  const [name, setName] = useState(patient?.name || "");

  const [diagnosis, setDiagnosis] = useState(patient?.diagnosis || "");
  const [profileImage, setProfileImage] = useState(patient?.profileImage || "");
  const [status, setStatus] = useState(
    patient?.status || PatientStatus.ONGOING
  );
  const [appointmentDate, setAppointmentDate] = useState(
    patient?.appointmentDate || ""
  );

  const dispatch: AppDispatch = useDispatch();

  const isError = useSelector((state: RootState) => state.patient.isLoading);
  const isLoading = useSelector((state: RootState) => state.patient.isError);

  const handleAddPatient = () => {
    const patientData = {
      id,
      name,
      diagnosis,
      profileImage,
      status,
      appointmentDate,
    };
    dispatch(addPatient(patientData)).unwrap();
    toast.success("Patient added");
    onClose();
  };
  const handleUpdatePatient = () => {
    const patientData = {
      id,
      name,
      diagnosis,
      profileImage,
      status,
      appointmentDate,
    };
    dispatch(updatePatient(patientData)).unwrap();
    dispatch(getPatient()).unwrap();
    toast.success("Patient updated");
    onClose();
  };

  const submitHandler = () => {
    if (!isUpdate) {
      handleAddPatient();
    } else {
      handleUpdatePatient();
    }
  };

  return {
    name,
    status,
    patient,
    isError,
    isLoading,
    diagnosis,
    profileImage,
    appointmentDate,
    setName,
    setStatus,
    setDiagnosis,
    submitHandler,
    setProfileImage,
    setAppointmentDate,
  };
};
