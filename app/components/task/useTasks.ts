"use client";
import { fetchTasks } from "@/app/redux/slices/taskSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTasks = () => {
  const disPatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.task.task);
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const isError = useSelector((state: RootState) => state.task.isError);

  useEffect(() => {
    disPatch(fetchTasks());
  }, [disPatch]);

  return { todos, isLoading, isError };
};
