"use client";
import { deleteTask } from "@/app/redux/slices/deleteTaskSlice";
import { fetchTasks } from "@/app/redux/slices/taskSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect, useRef, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useThreeDots = (id: string | undefined) => {
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

  return {
    handleDelete,
    handleClickOutside,
    toggleMenu,
    isError,
    isLoading,
    task,
    errorMessage,
    menuRef,
    isOpenMenu,
    setIsOpenMenu,
  };
};
