"use client";

import { useState } from "react";
import AddPatient from "../AddPatient";

type ToogleButtonProps = {
  children: React.ReactNode;
  isUpdate?: boolean;
  className?:string
};

const ToogleButton: React.FC<ToogleButtonProps> = ({ children, isUpdate,className }) => {
  const [isOpen, setIsOpen] = useState(false);

  const modalOpen = () => {
    setIsOpen(true);
  };
  const modalClose = () => {
    setIsOpen(false);
  };
  return (
    <div>
      <button className={className} onClick={modalOpen}>{children}</button>
      {isOpen && <AddPatient onClose={modalClose} isUpdate={isUpdate} />}
    </div>
  );
};

export default ToogleButton;
