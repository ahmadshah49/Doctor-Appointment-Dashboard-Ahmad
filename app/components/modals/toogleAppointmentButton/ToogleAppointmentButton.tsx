"use client";
import { Appointment } from "../../../types/Type";
import React, { useState } from "react";
import AddAppointment from "../addAppointment/AddAppointment";

type ToogleButtonProps = {
  children: React.ReactNode;
  isUpdate?: boolean;
  className?: string;
  data?: Appointment;
};

const ToogleAppointmentButton: React.FC<ToogleButtonProps> = ({
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
        <AddAppointment onClose={modalClose} isUpdate={isUpdate} data={data} />
      )}
    </div>
  );
};

export default ToogleAppointmentButton;
