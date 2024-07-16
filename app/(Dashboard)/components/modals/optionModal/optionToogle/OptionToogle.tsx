"use client";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import OptionModal from "../OptionModal";

const OptionToogle = () => {
  const [isOpen, setisOpen] = useState(false);
  const ModalClose = () => {
    setisOpen(false);
  };
  return (
    <div>
      <button onClick={() => setisOpen((prev) => !prev)}>
        <BsThreeDots />
      </button>
      {isOpen && <OptionModal onClose={ModalClose} />}
    </div>
  );
};

export default OptionToogle;
