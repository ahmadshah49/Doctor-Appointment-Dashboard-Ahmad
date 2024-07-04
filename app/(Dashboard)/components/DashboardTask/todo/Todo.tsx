import React from "react";
import { HiDotsHorizontal } from "react-icons/hi";
const Todo = () => {
  return (
    <div>
      <div className="flex justify-between h-20 my-3 gap-2">
        <input type="checkbox" className="w-8 h-8" />
        <div className="flex justify-between w-full px-4 items-center">
          <div>
            <h1 className="font-medium text-base">
              Task Completed successfully
            </h1>
            <p className="font-normal text-xs">Todo Description</p>
          </div>
          <p>Date</p>
        </div>

        <div className="w-7 flex items-center justify-center h-7 rounded-md border border-gray-400">
          <p className="text-xl flex items-center justify-center font-semibold">
            <HiDotsHorizontal color="blue" />
          </p>
        </div>
      </div>
    </div>
  );
};

export default Todo;
