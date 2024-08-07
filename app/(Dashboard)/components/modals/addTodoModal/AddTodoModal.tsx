"use client";

import Input from "@/app/components/input/Input";
import { AddTodoTypes, TodoStatus } from "@/app/types/Type";
import { useTodoModal } from "./useTodoModal";

const AddTodoModal: React.FC<AddTodoTypes> = ({ isUpdate, onClose, data }) => {
  const {
    completed,
    description,
    disPatch,
    isError,
    isLoading,
    setCompleted,
    setDescription,
    setTitle,
    submitHandler,
    title,
  } = useTodoModal({ isUpdate, onClose, data });

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
          className="bg-white rounded-[20px] transition-all ease-in-out lg:w-[50%] md:w-[80%] w-[90%] py-10"
        >
          <h1 className="text-center lg:text-4xl md:text-3xl text-2xl font-bold text-primary my-6">
            {isUpdate ? "Update Todo" : "Add Todo"}
          </h1>

          <form
            onSubmit={submitHandler}
            className="lg:px-10 md:px-8 px-6 text-black text-left"
          >
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
              name="description"
              id="description"
              label="Description"
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
                className="bg-red-600 md:px-8 md:py-3 px-4 py-2 w-[150px] rounded-md font-semibold text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-primary md:px-8 md:py-3 px-4 py-2 rounded-md font-semibold text-white w-[150px]"
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
