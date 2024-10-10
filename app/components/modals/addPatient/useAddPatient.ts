"use client";

import { storage } from "@/app/lib/firebase";
import { addPatient, getPatient } from "@/app/redux/slices/patientSlice";
import { updatePatient } from "@/app/redux/slices/updatePatientSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddPatientTypes, PatientStatus } from "@/app/types/Type";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useAddPatient = ({
  onClose,
  isUpdate,
  id,
  patient,
}: AddPatientTypes) => {
  const [name, setName] = useState(patient?.name || "");
  const [loading, setLoading] = useState(false);
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
  };

  const submitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    if (!isUpdate) {
      handleAddPatient();
      onClose();
    } else {
      handleUpdatePatient();
      onClose();
    }
  };

  const inputRef = useRef<HTMLInputElement>(null);

  const handleImageClick = () => {
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setLoading(true);
      const storageRef = ref(storage, `patients/${file.name}`);
      const uploadTask = uploadBytes(storageRef, file);

      uploadTask
        .then((snapshot) => {
          return getDownloadURL(snapshot.ref);
        })
        .then((downloadUrl) => {
          setProfileImage(downloadUrl);
          setLoading(false);
        })
        .catch((error) => {
          toast.error("Upload Failed");
          setLoading(false);
        });
    }
  };
  const handleRemoveImage = () => {
    setProfileImage("");
  };

  return {
    handleImageClick,
    loading,
    inputRef,
    handleImageChange,
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
    handleRemoveImage,
  };
};
