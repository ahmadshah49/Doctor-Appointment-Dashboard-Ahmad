"use client";
import Link from "next/link";
import { FaPlus } from "react-icons/fa6";
import { MdKeyboardArrowRight } from "react-icons/md";
import Loader from "../loader/Loader";
import { TiTick } from "react-icons/ti";
import { BsThreeDots } from "react-icons/bs";
import ThreeDotsBox from "../threeDots/ThreeDots";
import { useTasks } from "./useTasks";
import ToogleTodoButton from "../modals/toogleTodoButton/ToogleTodoButton";
import { useEffect, useState } from "react";
import { Task } from "@/app/types/Type";
import { AppDispatch, RootState } from "@/app/redux/store";
import { useDispatch, useSelector } from "react-redux";
import { updateCheckBoxTask } from "@/app/redux/slices/updateCheckBoxSlice";

type TaskTypes = {
  isShow?: boolean;
  seeAll?: boolean;
};

const Tasks: React.FC<TaskTypes> = ({ isShow, seeAll }) => {
  const { todos, isError, isLoading } = useTasks();
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

  return (
    <div className="rounded-md bg-white shadow-md p-4">
      <div className="flex justify-between border-b pb-2 border-gray-200">
        <h1 className="text-base font-bold">Tasks</h1>
        <ToogleTodoButton className="flex items-center gap-4 font-semibold text-primary text-xs">
          New Tasks
          <div className="text-xs border p-2 rounded-md border-gray-300">
            <FaPlus />
          </div>
        </ToogleTodoButton>
      </div>

      {isLoading && (
        <div className="flex w-full h-full my-4 items-center justify-center">
          <Loader />
        </div>
      )}
      {!isLoading && isError && <p>Error Loading Tasks</p>}
      {!isLoading && !isError && Todos?.length === 0 && (
        <div className="text-gray-500 text-center w-full my-2">
          No Task available.
        </div>
      )}
      {!isLoading &&
        !isError &&
        todos?.length > 0 &&
        Todos?.map((todo, index) => (
          <div
            key={index}
            className="flex items-start ml-[25px] gap-2 xl:my-5 xl:min-h-[101px] my-8"
          >
            <label className="relative flex items-center mr-[17px]">
              <input
                type="checkbox"
                checked={todo?.completed === "COMPLETED"}
                onChange={() => handleCheckboxChange(todo?.id)}
                className="cursor-pointer appearance-none w-8 h-8 p-2 rounded border checked:bg-sky bg-transparent"
              />

              {todo?.completed === "COMPLETED" && (
                <span className="absolute xl:left-[2px] font-bold text-white text-2xl mx-auto">
                  <TiTick size={30} />
                </span>
              )}
            </label>
            <div className="flex sm:gap-0  items-center w-full justify-between">
              <div>
                <h1 className="py-1 font-semibold text-base ">{todo?.title}</h1>
                <p className="py-1 font-normal text-xs ">{todo?.description}</p>
              </div>
              <p className="font-normal xl:mr-[50px] text-xs text-grayLight">
                {todo?.date
                  ? new Date(todo?.date).toLocaleDateString()
                  : "No date provided"}
              </p>
            </div>
            <ThreeDotsBox id={todo?.id} data={todo}>
              <BsThreeDots size={15} />
            </ThreeDotsBox>
          </div>
        ))}

      {Todos?.length > 0 && seeAll && (
        <Link
          href={"/dashboard/tasks"}
          className="flex items-center gap-4 font-semibold text-xs justify-end text-primary"
        >
          See all
          <div className="text-xs border p-2 rounded-md border-gray-300">
            <MdKeyboardArrowRight />
          </div>
        </Link>
      )}
    </div>
  );
};

export default Tasks;
