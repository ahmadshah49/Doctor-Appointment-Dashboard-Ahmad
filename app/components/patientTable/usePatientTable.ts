"use client";
import { deletePatient } from "@/app/redux/slices/deletePatientSlice";
import { getPatient } from "@/app/redux/slices/patientSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Patient } from "@/app/types/Type";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const usePatientTable = () => {
  const dispatch: AppDispatch = useDispatch();
  const patients = useSelector((state: RootState) => state.patient.patient);
  const isError = useSelector((state: RootState) => state.patient.isError);
  const isLoading = useSelector((state: RootState) => state.patient.isLoading);
  const [patientList, setPatientList] = useState<Patient[]>([]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECOVERED":
        return "bg-green-200 text-green-800";
      case "ONGOING":
        return "bg-yellow-200 text-yellow-800";
      case "WAITING":
        return "bg-red-200 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };

  useEffect(() => {
    dispatch(getPatient()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    setPatientList(patients);
  }, [patients]);

  const sortedPatients = patientList?.slice().sort((a, b) => {
    const dateA = new Date(a.appointmentDate ?? 0);
    const dateB = new Date(b.appointmentDate ?? 0);
    return dateA.getTime() - dateB.getTime();
  });
  const handleDelete = async (id: any) => {
    try {
      dispatch(deletePatient(id)).unwrap();
      dispatch(getPatient()).unwrap();
      toast.success("deleted");
    } catch (error) {}
  };

  return {
    handleDelete,
    sortedPatients,
    isError,
    isLoading,
    patientList,
    getStatusColor,
  };
};
