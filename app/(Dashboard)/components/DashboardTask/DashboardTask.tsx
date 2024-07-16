"use client";
import { TodoTypes } from "@/app/types/Type";
import Link from "next/link";
import { HiDotsHorizontal } from "react-icons/hi";

type todoDataProps = {
  todoData: TodoTypes[];
  isLink?: boolean;
};

const DashboardTask: React.FC<todoDataProps> = ({ todoData, isLink }) => {
  return (
    <div className=" rounded-md bg-white shadow-md p-4">
      <h1 className="text-gray-950 py-4 font-semibold ">Tasks</h1>
      {todoData?.map((todo) => (
        <div key={todo?.id} className="flex justify-between h-20 my-3 gap-2">
          <input
            type="checkbox"
            className="w-8 h-8"
            checked={todo?.completed}
            onChange={() => {}}
          />
          <div className="flex justify-between w-full px-4 items-center">
            <div>
              <h1 className="font-medium text-base">{todo?.title}</h1>
              <p className="font-normal text-xs">{todo?.description}</p>
            </div>
            <p>{new Date(todo?.date).toLocaleDateString()}</p>
          </div>

          <div className="w-7 flex items-center justify-center h-7 rounded-md border border-gray-400">
            <p className="text-xl flex items-center justify-center font-semibold">
              <HiDotsHorizontal color="blue" />
            </p>
          </div>
        </div>
      ))}

      {isLink && (
        <Link
          href={"/dashboard/tasks"}
          className="text-primary flex items-center gap-4 justify-end"
        >
          View all
          <span className="w-7 flex items-center justify-center h-7 rounded-md border border-gray-400">
            <p>⇨</p>
          </span>
        </Link>
      )}
    </div>
  );
};

export default DashboardTask;
