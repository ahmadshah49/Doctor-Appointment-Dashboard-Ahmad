"use client";
import { FaPlus } from "react-icons/fa6";
import ToogleAppointmentButton from "../modals/toogleAppointmentButton/ToogleAppointmentButton";
import UpComingSchedule from "../upComingSchedule/UpComingSchedule";

const DashboardSchedule = () => {
  return (
    <div className=" rounded-md bg-white shadow-md p-4">
      <div className="flex justify-between border-b pb-2 border-gray-200">
        <h1 className="text-base font-bold">Upcoming schedule</h1>
        <ToogleAppointmentButton className="flex items-center gap-4 font-semibold text-primary text-xs">
          New Appointment
          <div className="text-xs border p-2 rounded-md border-gray-300">
            <FaPlus />
          </div>
        </ToogleAppointmentButton>
      </div>
      <UpComingSchedule />
    </div>
  );
};

export default DashboardSchedule;
