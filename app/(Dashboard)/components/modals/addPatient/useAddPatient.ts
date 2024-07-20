"use client";

import { addPatient } from "@/app/redux/slices/patientSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddPatientTypes, PatientStatus } from "@/app/types/Type";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useAddPatient = ({ onClose, isUpdate }: AddPatientTypes) => {
  const [name, setName] = useState("");
  const [diagnosis, setDiagnosis] = useState("");
  const [profileImage, setProfileImage] = useState("");
  const [status, setStatus] = useState(PatientStatus.ONGOING);
  const [appointmentDate, setAppointmentDate] = useState("");

  const dispatch: AppDispatch = useDispatch();
  const patient = useSelector((state: RootState) => state.patient.patient);
  const isError = useSelector((state: RootState) => state.patient.isLoading);
  const isLoading = useSelector((state: RootState) => state.patient.isError);

  const handleAddPatient = () => {
    const patientData = {
      name,
      diagnosis,
      profileImage,
      status,
      appointmentDate,
    };
    dispatch(addPatient(patientData));
    toast.success("Patient added");
    onClose();
  };
  const handleUpdatePatient = () => {
    console.log("Updated");
    toast.success("Patient updated");
    onClose();
  };

  const submitHandler = () => {
    if (!isUpdate) {
      handleAddPatient();
    } else {
      handleUpdatePatient;
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
