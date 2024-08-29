"use client";
import { addTask, fetchTasks } from "@/app/redux/slices/taskSlice";
import { updateTask } from "@/app/redux/slices/updateTaskSlice";
import { AppDispatch, RootState } from "@/app/redux/store";
import { AddTodoTypes, TodoStatus } from "@/app/types/Type";
import { useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";

export const useTodoModal = ({ onClose, isUpdate, data }: AddTodoTypes) => {
  const [title, setTitle] = useState(data?.title || "");
  const [description, setDescription] = useState(data?.description || "");
  const [completed, setCompleted] = useState(
    data?.completed || TodoStatus.NOT_COMPLETED
  );
  const id = data?.id;
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
    } finally {
      onClose();
    }
  };

  const handleUpdateTodo = () => {
    try {
      const updateData = {
        title,
        description,
        completed,
        id,
      };
      disPatch(updateTask(updateData)).unwrap();
      disPatch(fetchTasks()).unwrap();
      toast.success("Task Updated!");
      onClose();
    } catch (error) {
      toast.error("Something Went Wrong!");
    } finally {
      onClose();
    }
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
