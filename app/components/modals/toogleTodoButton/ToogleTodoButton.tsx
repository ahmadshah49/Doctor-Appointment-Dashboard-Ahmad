"use client";

import { useState } from "react";

import { Task } from "@/app/types/Type";
import AddTodoModal from "../addTodoModal/AddTodoModal";

type ToogleButtonProps = {
  children: React.ReactNode;
  isUpdate?: boolean;
  className?: string;
  data?: Task;
};

const ToogleTodoButton: React.FC<ToogleButtonProps> = ({
  children,
  isUpdate,
  className,
  data,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className={className} onClick={modalOpen}>
        {children}
      </button>
      {isOpen && (
        <AddTodoModal onClose={modalClose} isUpdate={isUpdate} data={data} />
      )}
    </div>
  );
};

export default ToogleTodoButton;
