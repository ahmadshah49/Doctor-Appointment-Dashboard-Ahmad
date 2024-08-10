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
        <div className="absolute md:-left-96 mt-2 -left-44 bg-white cursor-default shadow-2xl w-60 h-60 md:w-96 md:h-96 overflow-y-auto rounded-md border p-2 z-50">
          <Notification />
        </div>
      )}
    </div>
  );
};

export default NotificationModal;
