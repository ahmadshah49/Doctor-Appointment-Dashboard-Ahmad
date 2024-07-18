"use client";
import { useState } from "react";

import Input from "@/app/components/Input";
import { AddTodoTypes, TodoStatus } from "@/app/types/Type";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { addTask } from "@/app/redux/slices/taskSlice";
import axios from "axios";
import { BASE_URL } from "@/app/utils/axiosInstance";
import toast from "react-hot-toast";

const AddTodoModal: React.FC<AddTodoTypes> = ({ isUpdate, onClose }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(TodoStatus.NOT_COMPLETED);
  const disPatch: AppDispatch = useDispatch();
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const isError = useSelector((state: RootState) => state.task.isError);

  const taskData = {
    title,
    completed,
    description,
  };

  if (isError) {
    console.log("Error", isError);
  }
  const handleAddTodo = async () => {
    disPatch(addTask(taskData));
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

  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="bg-black/60 backdrop-blur-sm z-50 w-full h-full fixed inset-0">
      <div
        onClick={handleOverlayClick}
        className="flex items-center justify-center h-full"
      >
        <div
          onClick={(e) => e.stopPropagation()}
          className="bg-white rounded-[20px] transition-all ease-in-out w-[50%] py-10"
        >
          <h1 className="text-center text-4xl font-bold text-primary my-6">
            {isUpdate ? "Update Todo" : "Add Todo"}
          </h1>

          <form onSubmit={submitHandler} className="px-10 text-left">
            <Input
              name="title"
              id="title"
              label="Title"
              placeHolder="Enter Title"
              value={title}
              type="text"
              required
              onChange={(e) => setTitle(e)}
              sup
            />
            <Input
              name="title"
              id="title"
              label="Title"
              placeHolder="Enter Description"
              value={description}
              type="text"
              required
              onChange={(e) => setDescription(e)}
              sup
            />

            <div className="w-full my-6">
              <label className="text-sm text-left" htmlFor={completed}>
                Status <sup className="text-red-600 text-base">*</sup>
              </label>
              <div>
                <select
                  onChange={(e) => setCompleted(e.target.value)}
                  id="status"
                  name="status"
                  required
                  className="
                    border-b 
                    border-gray-400
                    outline-none
                    focus:border-black
                    pt-2
                    primary:text-[22px]
                    md:text-[18px]
                    font-medium
                    w-full
                    disabled:cursor-not-allowed
                  "
                >
                  {Object.values(TodoStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex items-center justify-center gap-[30px] mb-6 mt-16">
              <button
                type="button"
                onClick={onClose}
                className="bg-red-600 px-8 py-3 w-[150px] rounded-md font-semibold text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary px-8 py-3 rounded-md font-semibold text-white w-[150px]"
              >
                {isUpdate ? "Save" : isLoading ? "Loading..." : "Add"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTodoModal;
