"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCurrentUser } from "@/app/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { PatientStatus } from "@/app/types/Type";

import { AppointmentTypes } from "@/app/types/Type";
import { addAppointment } from "@/app/redux/slices/addAppointmentSlice";
import { addNotification } from "@/app/redux/slices/notificationsSlice";
import toast from "react-hot-toast";

type useAddAppointmentsTypes = {
  onClose: () => void;
};

export const useAddAppointments = ({ onClose }: useAddAppointmentsTypes) => {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState(PatientStatus.WAITING);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState(
    AppointmentTypes.Offline_Consultation
  );

  const dispatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.currentUser);
  const { isLoading } = useSelector((state: RootState) => state.addAppointment);

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      timeZone: "Asia/Karachi",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    });
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const notificationData = `${name}'s appointment on ${formatDate(
      new Date(start)
    )} at ${formatTime(new Date(start))} - ${formatTime(
      new Date(end)
    )}, appointment is ${appointmentType} and Purpose is ${purpose}`;

    dispatch(
      addAppointment({
        name,
        start,
        end,
        purpose,
        status,
        appointmentType,
      })
    );

    dispatch(addNotification(notificationData));
    onClose();
    toast.success("Schedule Added!");
  };

  return {
    name,
    setName,
    purpose,
    setPurpose,
    start,
    setStart,
    end,
    setEnd,
    status,
    setStatus,
    currentDate,
    appointmentType,
    setAppointmentType,
    submitHandler,
    formatDate,
    formatTime,
    isLoading,
    user,
  };
};
