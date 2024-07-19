"use client";

import { useState } from "react";
import AddTodoModal from "../addTodoModal/AddTodoModal";

type ToogleButtonProps = {
  children: React.ReactNode;
  isUpdate?: boolean;
  className?: string;
};

const ToogleTodoButton: React.FC<ToogleButtonProps> = ({
  children,
  isUpdate,
  className,
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
      {isOpen && <AddTodoModal onClose={modalClose} isUpdate={isUpdate} />}
    </div>
  );
};

export default ToogleTodoButton;
