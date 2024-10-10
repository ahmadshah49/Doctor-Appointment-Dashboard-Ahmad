"use client";
import { fetchTasks } from "@/app/redux/slices/taskSlice";
import { updateCheckBoxTask } from "@/app/redux/slices/updateCheckBoxSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { Task } from "@/app/types/Type";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

export const useTasks = (isShow: boolean | undefined) => {
  const todos = useSelector((state: RootState) => state.task.task);
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const isError = useSelector((state: RootState) => state.task.isError);
  const [todo, setTodo] = useState<Task[]>([]);
  const disPatch: AppDispatch = useDispatch();
  const { completed } = useSelector(
    (state: RootState) => state.updateTaskCheckBox
  );
  useEffect(() => {
    if (todos) {
      setTodo(todos);
    }
  }, [todos]);

  const Todos = isShow ? todo?.slice(0, 9) : todo;

  const handleCheckboxChange = (id: any) => {
    const updatedTodos = todo.map((item) =>
      item?.id === id.toString()
        ? {
            ...item,
            completed:
              item?.completed === "COMPLETED" ? "NOT_COMPLETED" : "COMPLETED",
          }
        : item
    );
    setTodo(updatedTodos);
    const updatedTask = updatedTodos.find((task) => task?.id === id);
    if (updatedTask) {
      disPatch(
        updateCheckBoxTask({
          id: updatedTask?.id as string,
          completed: updatedTask?.completed,
        })
      );
    }
  };

  useEffect(() => {
    disPatch(fetchTasks());
  }, [disPatch]);

  return { todos, isLoading, isError, handleCheckboxChange, completed, Todos };
};
