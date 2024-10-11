"use client";
import clsx from "clsx";
import React from "react";
import { FaRegClock } from "react-icons/fa6";
import { IoCloseSharp } from "react-icons/io5";
import { RiUserLine } from "react-icons/ri";
import { SlLocationPin } from "react-icons/sl";
import {
  AddAppointmentTypes,
  AppointmentTypes,
  PatientStatus,
} from "../../../types/Type";
import CheckBox from "../../checkBox/CheckBox";
import InputTwo from "../../inputTwo/InputTwo";
import { useAddAppointments } from "./useAddAppointments";

const AddAppointment: React.FC<AddAppointmentTypes> = ({
  onClose,
  data,
  isUpdate,
}) => {
  const {
    appointmentType,
    currentDate,
    end,
    name,
    purpose,
    setAppointmentType,
    setEnd,
    setName,
    setPurpose,
    setStart,
    setStatus,
    start,
    status,
    submitHandler,
    formatDate,
    formatTime,
    isLoading,
    user,
    handleOverlayClick,
  } = useAddAppointments({ onClose, isUpdate, data });

  return (
    <div className="bg-black/60 backdrop-blur-sm z-50 w-full h-full fixed inset-0">
      <div
        onClick={handleOverlayClick}
        className="flex items-center justify-center h-full"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[5px] transition-all h-4/5 sm:mx-0 mx-2 overflow-y-auto ease-in-out lg:w-[760px]"
        >
          <div className="text-left flex  justify-between w-full items-center px-3 md:px-[31px] py-[23px] rounded-t-[5px] font-bold text-white bg-primary">
            <h1 className=" md:text-[22px] text-base ">
              {isUpdate ? "Update" : "Add"} Appointment
            </h1>
            <span onClick={onClose}>
              <IoCloseSharp size={30} />
            </span>
          </div>

          <div className="flex flex-wrap justify-evenly md:gap-0 gap-2 items-start my-10">
            <span className="flex flex-col md:my-0 my-[13px] gap-2 items-center justify-center">
              <RiUserLine size={24} className=" text-center text-blue-500" />
              <h1 className="text-blue-500 leading-7 text-[18px] font-normal">
                PRACTITIONER
                <p className="text-center text-base font-normal text-black">
                  {user?.name}
                </p>
                <p className="text-center font-bold text-black text-base">
                  General Doctor
                </p>
              </h1>
            </span>
            <span className="flex flex-col md:my-0 my-4 gap-2 items-center justify-center">
              <FaRegClock size={24} className=" text-blue-500" />
              <h1 className="text-blue-500 text-[18px] font-normal">
                DATE AND TIME
              </h1>
              <p>{formatDate(currentDate)}</p>

              <p>{formatTime(currentDate)}</p>
            </span>
            <span className="flex flex-col gap-2 md:my-0 my-4 items-center justify-center">
              <SlLocationPin size={24} className=" text-blue-500" />
              <h1 className="text-blue-500 text-[18px] font-normal">
                LOCATION
              </h1>
              <p className="text-center text-base font-normal text-black">
                {user?.companyName}
              </p>
            </span>
          </div>
          <form onSubmit={submitHandler} className="md:px-10 px-4 text-left">
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
