import { MenuProps } from "@/app/types/Type";
import React from "react";
import { LuFilter, LuHelpCircle, LuPlus, LuSearch } from "react-icons/lu";
import ToogleButton from "../modals/toogleButton/ToogleButton";

const Menu: React.FC<MenuProps> = ({ title, totalPatients }) => {
  return (
    <div className="md:p-4 p-2 px-6 rounded-md bg-white my-4 shadow-md flex items-center justify-between">
      <div className="font-medium  text-[22px]">
        {title}{" "}
        <span className="text-gray-400 font-normal">({totalPatients})</span>
      </div>
      <div className="flex items-center justify-between gap-6">
        <ToogleButton className="md:w-12 w-8 h-8 md:h-12 rounded-md  border  border-gray-400 flex items-center justify-center">
          <LuPlus title="Add Paitent" size={25} className="font-bold " />
        </ToogleButton>

        <span className="w-12 h-12  rounded-md  border border-gray-400 md:flex hidden  items-center justify-center">
          <LuSearch size={25} className="font-bold" />
        </span>
        <span className="w-12 h-12 rounded-md   border border-gray-400 md:flex hidden  items-center justify-center">
          <LuFilter size={25} className="font-bold" />
        </span>
        <span className="w-12 h-12 rounded-md  border  border-gray-400 md:flex hidden  items-center justify-center">
          <LuHelpCircle size={25} className="font-bold" />
        </span>
      </div>
    </div>
  );
};

export default Menu;
