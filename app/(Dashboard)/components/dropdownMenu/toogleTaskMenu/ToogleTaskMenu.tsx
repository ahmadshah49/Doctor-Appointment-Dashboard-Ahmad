"use client";

import { useState } from "react";
import { BsThreeDots } from "react-icons/bs";
import TaskMenu from "../taskMenu/TaskMenu";

const ToogleTaskMenu = () => {
  const [isOpen, setisOpen] = useState(false);
  const ModalClose = () => {
    setisOpen(false);
  };
  return (
    <div>
      <button onClick={() => setisOpen((prev) => !prev)}>
        <BsThreeDots />
      </button>
      {isOpen && <TaskMenu onClose={ModalClose} />}
    </div>
  );
};

export default ToogleTaskMenu;
