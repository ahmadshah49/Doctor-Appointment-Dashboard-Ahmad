"use client";

import { signOut } from "next-auth/react";
import { IoLogOutOutline } from "react-icons/io5";

const LogoutButton = () => {
  return (
    <button onClick={() => signOut()}>
      <IoLogOutOutline
        size={20}
        color="gray"
        title="Logout"
        className="h-[29px] w-[29px] text-gray-400 hover:text-gray-600 transition-all "
      />
    </button>
  );
};

export default LogoutButton;
