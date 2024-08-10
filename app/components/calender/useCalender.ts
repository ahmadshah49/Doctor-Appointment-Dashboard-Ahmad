"use client";

import { fetchAppointment } from "@/app/redux/slices/getAppointmentSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Appointment } from "@/app/types/Type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useCalender = () => {
  const [events, setEvents] = useState<Appointment[]>([]);
  const disPatch: AppDispatch = useDispatch();
  const { appointment, isError, isLoading } = useSelector(
    (state: RootState) => state.getAppointment
  );
  useEffect(() => {
    disPatch(fetchAppointment());
  }, [disPatch]);

  useEffect(() => {
    setEvents(appointment);
  }, [appointment, setEvents]);

  const formatTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };
  return { events, appointment, isError, isLoading, formatTime };
};
