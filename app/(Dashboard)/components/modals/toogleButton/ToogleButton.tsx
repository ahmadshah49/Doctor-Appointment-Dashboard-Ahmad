"use client";

import { useState } from "react";
import AddPatient from "../addPatient/AddPatient";
import { Patient } from "@/app/types/Type";

type ToogleButtonProps = {
  children: React.ReactNode;
  isUpdate?: boolean;
  className?: string;
  id?: string;
  patient?: Patient;
};

const ToogleButton: React.FC<ToogleButtonProps> = ({
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
        <AddPatient onClose={modalClose} isUpdate={isUpdate} id={id} patient={patient} />
      )}
    </div>
  );
};

export default ToogleButton;
