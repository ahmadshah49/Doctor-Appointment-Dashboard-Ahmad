"use client";
import { FaPlus } from "react-icons/fa6";
import { BsThreeDots } from "react-icons/bs";
import ToogleTodoButton from "../modals/addTodoModal/toogleTodoButton/ToogleTodoButton";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { fetchTasks } from "@/app/redux/slices/taskSlice";

const Task = () => {
  const disPatch: AppDispatch = useDispatch();
  const todos = useSelector((state: RootState) => state.task.task);
  const isLoading = useSelector((state: RootState) => state.task.isLoading);
  const isError = useSelector((state: RootState) => state.task.isError);
  useEffect(() => {
    disPatch(fetchTasks());
  }, [disPatch]);
  useEffect(() => {
    console.log("Fetched tasks:", todos);
  }, [todos]);

  return (
    <div className="">
      <div className="flex justify-between rounded-md bg-white shadow-md p-4">
        <h1 className="text-base font-bold">Tasks</h1>
        <ToogleTodoButton className="flex items-center gap-4 font-semibold text-primary text-xs">
          New Tasks
          <div className=" text-xs border p-2 rounded-md border-gray-300">
            <FaPlus />
          </div>
        </ToogleTodoButton>
      </div>

      {todos.map((todo, index) => (
        <div
          key={index}
          className="flex items-start gap-8 my-8 rounded-md bg-white shadow-md p-4"
        >
          <input type="checkbox" className="w-[31px] h-[31px] p-2 rounded-md" />
          <div className="flex items-center w-full  justify-between">
            <div className="">
              <h1 className="py-2 font-medium text-base ">{todo?.title}</h1>
              <p className="py-2 font-normal text-xs ">{todo?.description}</p>
            </div>
            <p className="font-normal text-xs text-grayLight">
              {new Date(todo.date).toLocaleDateString()}
            </p>
          </div>
          <div className="w-fit border border-gray-300 text-sky  p-2 rounded-md">
            <BsThreeDots />
          </div>
        </div>
      ))}
    </div>
  );
};

export default Task;
