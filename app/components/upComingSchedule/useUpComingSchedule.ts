"use client";
import { deleteAppointment } from "@/app/redux/slices/deleteAppointmentSlice";
import { fetchAppointment } from "@/app/redux/slices/getAppointmentSlice";
import { AppDispatch } from "@/app/redux/store";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { useCalender } from "../calender/useCalender";

export const useUpComingSchedule = () => {
  const { events, isError, isLoading } = useCalender();
  const disPatch: AppDispatch = useDispatch();
  const [isOpen, setOpen] = useState<boolean[]>(
    Array(events?.length || 0).fill(false)
  );

  const toogleOpen = (index: number) => {
    setOpen((prevOpen) => {
      const newOpen = [...prevOpen];
      newOpen[index] = !newOpen[index];
      return newOpen;
    });
  };
  const getStatusColor = (status: string) => {
    switch (status) {
      case "RECOVERED":
        return "bg-green-600 text-green-800";
      case "ONGOING":
        return "bg-yellow-500 text-yellow-800";
      case "WAITING":
        return "bg-red-600 text-red-800";
      default:
        return "bg-gray-200 text-gray-800";
    }
  };
  const formatTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "Asia/Karachi",
    });
  };
  const handleDelete = (id: string) => {
    disPatch(deleteAppointment(id)).unwrap();
    disPatch(fetchAppointment()).unwrap();
    toast.success("Appointment Deleted!");
  };

  const newTime = (date: any) => {
    return new Date(date).toLocaleString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: false,
    });
  };

  return {
    newTime,
    handleDelete,
    formatTime,
    getStatusColor,
    toogleOpen,
    events,
    isOpen,
    isLoading,
    isError,
  };
};
