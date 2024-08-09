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

  useEffect(() => {
    dispatch(getPatient()).unwrap();
  }, [dispatch]);

  useEffect(() => {
    setPatientList(patients);
  }, [patients]);

  const sortedPatients = patientList.slice().sort((a, b) => {
    const dateA = new Date(a.appointmentDate ?? 0);
    const dateB = new Date(b.appointmentDate ?? 0);
    return dateA.getTime() - dateB.getTime();
  });
  const handleDelete = async (id: any) => {
    try {
      dispatch(deletePatient(id)).unwrap();
      dispatch(getPatient()).unwrap();
      toast.success("deleted");
    } catch (error) {
      console.log("Error", error);
    }
  };

  return { handleDelete, sortedPatients, isError, isLoading, patientList };
};
