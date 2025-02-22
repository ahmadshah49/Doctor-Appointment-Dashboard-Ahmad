import React from "react";
import { LuFilter, LuHelpCircle, LuPlus, LuSearch } from "react-icons/lu";
import { MenuProps } from "../../types/Type";
import ToogleAppointmentButton from "../modals/toogleAppointmentButton/ToogleAppointmentButton";

const ScheduleMenu: React.FC<MenuProps> = ({ title }) => {
  return (
    <div className="p-4 px-6 rounded-md bg-white my-4 shadow-md flex items-center justify-between">
      <div className="font-medium text-xl">
        {title} <span className="text-gray-400 font-normal"></span>
      </div>
      <div className="flex items-center justify-between gap-6">
        <ToogleAppointmentButton className="md:w-12 w-8 h-8 md:h-12 rounded-md  border  border-gray-400 flex items-center justify-center">
          <LuPlus title="Add Schedule" size={25} className="font-bold" />
        </ToogleAppointmentButton>
        <span className="w-12 h-12 md:flex  rounded-md  border border-gray-400 hidden items-center justify-center">
          <LuSearch size={25} className="font-bold" />
        </span>
        <span className="w-12 h-12 rounded-md md:flex  border border-gray-400 hidden items-center justify-center">
          <LuFilter size={25} className="font-bold" />
        </span>
        <span className="w-12 h-12 rounded-md  border md:flex border-gray-400 hidden items-center justify-center">
          <LuHelpCircle size={25} className="font-bold" />
        </span>
      </div>
    </div>
  );
};

export default ScheduleMenu;
