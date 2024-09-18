import React from "react";
import ToogleButton from "../modals/toogleButton/ToogleButton";
import { LuFilter, LuHelpCircle, LuPlus, LuSearch } from "react-icons/lu";
import Button from "../button/Button";

const AddNewPatientMenu = () => {
  return (
    <div className="md:p-4 p-2 px-6 rounded-md bg-white my-4 shadow-md flex items-center justify-between">
      <div className="font-medium  text-xl">
        Add new patient <span className="text-gray-400 font-normal"></span>
      </div>
      <div className="flex items-center justify-between gap-6"></div>
    </div>
  );
};

export default AddNewPatientMenu;
