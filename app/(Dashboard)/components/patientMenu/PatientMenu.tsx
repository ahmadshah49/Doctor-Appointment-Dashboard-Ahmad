import React from "react";
import { LuFilter } from "react-icons/lu";
import { LuSearch } from "react-icons/lu";
import { LuPlus } from "react-icons/lu";
import { LuHelpCircle } from "react-icons/lu";

const PatientMenu = () => {
  return (
    <div className="p-4 px-6 my-4 shadow-md flex items-center justify-between">
      <div className="font-medium text-xl">
        Patients <span className="text-gray-400 font-normal">(74)</span>
      </div>
      <div className="flex items-center justify-between gap-6">
        <span className="w-10 h-10 rounded-md  border  border-gray-400 flex items-center justify-center">
          <LuPlus size={25} className="font-bold" />
        </span>
        <span className="w-10 h-10 rounded-md  border border-gray-400 flex items-center justify-center">
          <LuSearch size={25} className="font-bold" />
        </span>
        <span className="w-10 h-10 rounded-md  border border-gray-400 flex items-center justify-center">
          <LuFilter size={25} className="font-bold" />
        </span>
        <span className="w-10 h-10 rounded-md  border border-gray-400 flex items-center justify-center">
          <LuHelpCircle size={25} className="font-bold" />
        </span>
      </div>
    </div>
  );
};

export default PatientMenu;
