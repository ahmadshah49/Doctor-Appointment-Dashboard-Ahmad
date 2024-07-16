"use client";
import React, { useEffect } from "react";
import ToogleButton from "../addPatient/toogleButton/ToogleButton";

type OptionModalProps = {
  onClose: () => void;
};

const OptionModal: React.FC<OptionModalProps> = ({ onClose }) => {
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      onClose();
    };

    document.addEventListener("click", handleDocumentClick);

    return () => {
      document.removeEventListener("click", handleDocumentClick);
    };
  }, [onClose]);

  return (
    <div
      className="shadow-2xl lg:w-28 lg:h-32 transition-all delay-1000 ease-in-out fixed right-6 bg-primary rounded-md text-white"
      onClick={(e) => e.stopPropagation()}
    >
      <div
        className="p-2 h-full flex flex-col items-center justify-evenly"
        onClick={handleOverlayClick}
      >
        <ToogleButton
          isUpdate
          className="rounded-md px-4 transition-all w-full hover:bg-gray-300/50"
        >
          Update
        </ToogleButton>
        <button
          className="rounded-md px-4 transition-all w-full hover:bg-gray-300/50"
          onClick={onClose}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default OptionModal;
