"use client";

import { ToogleButtonProp } from "@/app/types/Type";
import { useState } from "react";
import AddPatient from "../addPatient/AddPatient";

const ToogleButton: React.FC<ToogleButtonProp> = ({
  children,
  isUpdate,
  className,
  id,
  patient,
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
        <AddPatient
          onClose={modalClose}
          isUpdate={isUpdate}
          id={id}
          patient={patient}
        />
      )}
    </div>
  );
};

export default ToogleButton;
