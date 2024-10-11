"use client";
import { fetchCurrentUser } from "@/app/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Appointment, PatientStatus } from "@/app/types/Type";
import { ChangeEvent, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { addAppointment } from "@/app/redux/slices/addAppointmentSlice";
import { fetchAppointment } from "@/app/redux/slices/getAppointmentSlice";
import { addNotification } from "@/app/redux/slices/notificationsSlice";
import { updateAppointment } from "@/app/redux/slices/updateAppointmentSlice";
import { AppointmentTypes } from "@/app/types/Type";
import toast from "react-hot-toast";

type useAddAppointmentsTypes = {
  onClose: () => void;
  isUpdate?: boolean;
  data?: Appointment;
};

export const useAddAppointments = ({
  onClose,
  isUpdate,
  data,
}: useAddAppointmentsTypes) => {
  const [name, setName] = useState(data?.name || "");
  const [purpose, setPurpose] = useState(data?.purpose || "");
  const [start, setStart] = useState(data?.start || "");
  const [end, setEnd] = useState(data?.end || "");
  const [status, setStatus] = useState(data?.status || PatientStatus.WAITING);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState(
    data?.appointmentType || AppointmentTypes.Offline_Consultation
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
    }, 60000);

    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString("en-US", {
      weekday: "short",
      day: "2-digit",
      month: "short",
    });
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString("en-US", {
      timeZone: "Asia/Karachi",
      hour: "2-digit",
      minute: "numeric",
      hour12: true,
    });
  };
  const handleUpdateAppointment = () => {
    try {
      const updateData = {
        name,
        start,
        end,
        purpose,
        status,
        appointmentType,
      };
      dispatch(updateAppointment(updateData)).unwrap();
      dispatch(fetchAppointment()).unwrap();
      toast.success("Appointment Updated!");
      onClose();
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      onClose();
    }
  };
  const handleAddAppointment = () => {
    try {
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
      ).unwrap();
      dispatch(fetchAppointment()).unwrap();
      dispatch(addNotification(notificationData)).unwrap();
      onClose();
      console.log("Timestamp", start, end);

      toast.success("Schedule Added!");
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      onClose();
    }
  };
  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!isUpdate) {
      handleAddAppointment();
    } else {
      handleUpdateAppointment();
    }
  };
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };
  const inputs = [
    {
      id: "name",
      label: "Patient",
      name: "name",
      value: name,
      type: "text",
      onChange: (e: ChangeEvent<HTMLInputElement>) => setName(e.target.value),
      required: true,
    },
    {
      id: "purpose",
      label: "Purpose of visit",
      name: "purpose",
      value: purpose,
      type: "text",
      onChange: (e: ChangeEvent<HTMLInputElement>) =>
        setPurpose(e.target.value),
      required: true,
    },
    {
      id: "start",
      label: "Start Date & Time",
      name: "start",
      value: start,
      type: "datetime-local",
      onChange: (e: ChangeEvent<HTMLInputElement>) => setStart(e.target.value),
      required: true,
    },
    {
      id: "end",
      label: "End Date & Time",
      name: "end",
      value: end,
      type: "datetime-local",
      onChange: (e: ChangeEvent<HTMLInputElement>) => setEnd(e.target.value),
      required: true,
    },
  ];
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
    handleOverlayClick,
    inputs,
  };
};
