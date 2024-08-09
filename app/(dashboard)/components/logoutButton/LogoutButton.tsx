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
        className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all "
      />
    </button>
  );
};

export default LogoutButton;
