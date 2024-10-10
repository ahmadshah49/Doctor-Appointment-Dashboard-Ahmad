"use client";
import { ReactNode } from "react";
import { Task } from "@/app/types/Type";
import ToogleTodoButton from "../modals/toogleTodoButton/ToogleTodoButton";
import { useThreeDots } from "./useThreeDots";

interface ThreeDotsBoxProps {
  children?: ReactNode;
  id?: string;
  data?: Task;
}

const ThreeDotsBox: React.FC<ThreeDotsBoxProps> = ({ children, id, data }) => {
  const { handleDelete, toggleMenu, isOpenMenu, menuRef } = useThreeDots(id);
  return (
    <div ref={menuRef} className="relative cursor-pointer">
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        className="border border-gray-300 text-sky p-2 rounded-md"
      >
        {children}
      </div>
      {isOpenMenu && (
        <div className="absolute -left-20 bg-white shadow-xl rounded-md border p-2 z-50">
          <div className="block w-full text-center transition ease-linear font-semibold text-blue-600 px-4 py-2 hover:bg-blue-300 rounded-lg">
            <ToogleTodoButton data={data} isUpdate>
              Update
            </ToogleTodoButton>
          </div>
          <button
            onClick={handleDelete}
            className="block w-full text-center font-semibold transition ease-linear text-red-600 px-4 py-2 hover:bg-red-300 rounded-lg"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ThreeDotsBox;
