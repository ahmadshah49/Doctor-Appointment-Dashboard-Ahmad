"use client";
import { ReactNode, useEffect, useRef, useState } from "react";

import { Task } from "@/app/types/Type";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { deleteTask } from "@/app/redux/slices/deleteTaskSlice";
import toast from "react-hot-toast";
import { fetchTasks } from "@/app/redux/slices/taskSlice";
import ToogleTodoButton from "../modals/toogleTodoButton/ToogleTodoButton";

interface ThreeDotsBoxProps {
  children?: ReactNode;
  id?: string;
  data?: Task;
}

const ThreeDotsBox: React.FC<ThreeDotsBoxProps> = ({ children, id, data }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const disPatch: AppDispatch = useDispatch();
  const { isError, isLoading, task, errorMessage } = useSelector(
    (state: RootState) => state.deleteTask
  );
  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  const handleDelete = () => {
    disPatch(deleteTask(id));
    disPatch(fetchTasks());
    toast.success("Task Deleted!");
  };

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
