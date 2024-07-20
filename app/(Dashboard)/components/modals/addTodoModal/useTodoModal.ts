"use client";

import { addTask } from "@/app/redux/slices/taskSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddTodoTypes, TodoStatus } from "@/app/types/Type";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useTodoModal = ({ onClose, isUpdate }: AddTodoTypes) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(TodoStatus.NOT_COMPLETED);

  const disPatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const isError = useSelector((state: RootState) => state.task.isError);

  const handleAddTodo = () => {
    const taskData = {
      title,
      completed,
      description,
    };

    try {
      disPatch(addTask(taskData)).unwrap();
      toast.success("Task added successfully");
      onClose();
    } catch (error) {
      toast.error("Failed to add task");
      console.log("Error adding task", error);
    } finally {
      onClose();
    }
  };

  const handleUpdateTodo = () => {
    console.log("add todo", { name, status });
    onClose();
  };

  const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isUpdate) {
      handleAddTodo();
    } else {
      handleUpdateTodo();
    }
  };
  return {
    submitHandler,
    title,
    description,
    completed,
    disPatch,
    isLoading,
    isError,
    setTitle,
    setDescription,
    setCompleted,
  };
};
