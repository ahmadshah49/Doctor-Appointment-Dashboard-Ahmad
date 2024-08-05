"use client";

import { useEffect, useRef, useState } from "react";
import Notification from "../notification/Notification";

const NotificationModal = ({ children }: { children: React.ReactNode }) => {
  const [isOpenMenu, setIsOpenMenu] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  const toggleMenu = () => {
    setIsOpenMenu(!isOpenMenu);
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
      setIsOpenMenu(false);
    }
  };

  useEffect(() => {
    if (isOpenMenu) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpenMenu]);

  return (
    <div ref={menuRef} className="relative  cursor-pointer">
      <div
        onClick={(e) => {
          e.stopPropagation();
          toggleMenu();
        }}
        className=""
      >
        {children}
      </div>
      {isOpenMenu && (
        <div className="absolute -left-96 bg-white cursor-default shadow-2xl w-96 h-96 overflow-y-auto rounded-md border p-2 z-50">
          <h1 className="border-b border-primary px-4 py-2 text-primary font-semibold ">
            All Notifications
          </h1>
          <Notification />
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
