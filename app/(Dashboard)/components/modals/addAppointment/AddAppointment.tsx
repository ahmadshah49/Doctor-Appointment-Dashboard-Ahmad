"use client";

import { addAppointment } from "@/app/redux/slices/addAppointmentSlice";
import { fetchCurrentUser } from "@/app/redux/slices/userSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import clsx from "clsx";
import React, { useEffect, useState } from "react";
import { FaRegClock } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import { useDispatch, useSelector } from "react-redux";
import {
  AddAppointmentTypes,
  Appointment,
  AppointmentTypes,
  PatientStatus,
} from "../../../../types/Type";
import CheckBox from "../../checkBox/CheckBox";
import InputTwo from "../../inputTwo/InputTwo";
import toast from "react-hot-toast";

const AddAppointment: React.FC<AddAppointmentTypes> = ({
  isUpdate,
  onClose,
  data,
}) => {
  const [name, setName] = useState("");
  const [purpose, setPurpose] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");
  const [status, setStatus] = useState(PatientStatus.WAITING);
  const [currentDate, setCurrentDate] = useState(new Date());
  const [appointmentType, setAppointmentType] = useState(
    AppointmentTypes.Offline_Consultation
  );

  const disPatch: AppDispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.currentUser);
  const { appointment, isError, isLoading } = useSelector(
    (state: RootState) => state.addAppointment
  );
  useEffect(() => {
    disPatch(fetchCurrentUser());
  }, [disPatch]);

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
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const submitHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const data = {
      name,
      start,
      end,
      purpose,
      status,
      appointmentType,
    };
    disPatch(addAppointment(data));
    onClose();
    toast.success("Schedule Added!");
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm z-50 w-full h-full fixed inset-0">
      <div
        onClick={handleOverlayClick}
        className="flex items-center justify-center h-full"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[5px] transition-all h-4/5 overflow-y-auto ease-in-out lg:w-[760px]"
        >
          <div className="text-left flex justify-between w-full items-center text-[22px] px-[31px] py-[23px] rounded-t-[5px] font-bold text-white bg-primary">
            <h1>{isUpdate ? "Update Appointment" : "Add Appointment"}</h1>
            <span onClick={onClose}>
              <IoCloseSharp size={30} />
            </span>
          </div>

          <form onSubmit={submitHandler} className="px-10 text-left">
            <div className="flex justify-evenly items-start my-10">
              <span className="flex flex-col gap-2 items-center justify-center">
                <RiUserLine size={25} className=" text-center text-blue-500" />
                <h1 className="text-blue-500 text-[18px] font-normal">
                  PRACTITIONER
                  <p className="text-center text-base font-normal text-black">
                    {user?.name}
                  </p>
                  <p className="text-center font-bold text-black text-base">
                    General Doctor
                  </p>
                </h1>
              </span>
              <span className="flex flex-col gap-2 items-center justify-center">
                <FaRegClock size={25} className=" text-blue-500" />
                <h1 className="text-blue-500 text-[18px] font-normal">
                  DATE AND TIME
                </h1>
                <p>{formatDate(currentDate)}</p>

                <p>{formatTime(currentDate)}</p>
              </span>
              <span className="flex flex-col gap-2 items-center justify-center">
                <SlLocationPin size={25} className=" text-blue-500" />
                <h1 className="text-blue-500 text-[18px] font-normal">
                  LOCATION
                </h1>
                <p className="text-center text-base font-normal text-black">
                  {user?.companyName}
                </p>
              </span>
            </div>

            <InputTwo
              id="name"
              label="Patient"
              name="name"
              value={name}
              type="text"
              required
              onChange={(e) => setName(e)}
            />
            <InputTwo
              name="purpose"
              id="purpose"
              label="Purpose of visit"
              value={purpose}
              type="text"
              required
              onChange={(e) => setPurpose(e)}
              sup
            />
            <InputTwo
              name="start"
              id="start"
              label="Start Date & Time"
              value={start}
              type="datetime-local"
              required
              onChange={(e) => setStart(e)}
              sup
            />
            <InputTwo
              name="end"
              id="end"
              label="End Date & Time"
              value={end}
              type="datetime-local"
              required
              onChange={(e) => setEnd(e)}
              sup
            />

            <CheckBox
              label="Appointment Status"
              options={Object.values(PatientStatus)}
              selectedOption={status}
              setSelectedOption={setStatus}
            />

            <CheckBox
              label="Appointment Type"
              options={Object.values(AppointmentTypes)}
              selectedOption={appointmentType}
              setSelectedOption={setAppointmentType}
            />

            <div className="flex items-center justify-end gap-[30px] mr-12 mb-6 mt-28">
              <button
                type="button"
                onClick={onClose}
                className="   rounded-md font-medium text-black"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading}
                className={clsx(
                  `border-[1px] border-primary py-[7px] px-[11px] rounded-md disabled:bg-gray-400 disabled:cursor-not-allowed  text-base font-medium text-primary `
                )}
              >
                {isLoading ? "Saving" : "Save"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddAppointment;
