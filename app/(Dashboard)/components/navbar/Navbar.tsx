import { IoSearchOutline } from "react-icons/io5";
import { HiOutlineEnvelope } from "react-icons/hi2";
import { HiOutlineBell } from "react-icons/hi";
import { IoLogOutOutline } from "react-icons/io5";

import getCurrentUser from "@/app/action/getCurrentUser";
import LogoutButton from "../LogoutButton";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const today = new Date();
  const formatedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="h-16 fixed bg-white w-full  flex items-center border-b justify-between gap-4 px-4">
      <div className="border border-gray-400 py-1 rounded flex px-2 justify-between w-1/3">
        <input
          type="text"
          placeholder="Search"
          className="outline-none border-none bg-transparent text-sm font-medium w-full text-gray-500 "
        />
        <IoSearchOutline size={20} color="gray" />
      </div>
      <div className="text-right">
        <p className="text-sm">{currentUser?.name}</p>
        <h1 className="text-sm font-semibold">{currentUser?.companyName}</h1>
      </div>
      <div className="border border-gray-400 py-1 rounded px-2 ">
        {formatedDate}
      </div>
      <div className="flex items-center justify-between gap-4">
        <HiOutlineEnvelope
          size={20}
          className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all "
        />
        <HiOutlineBell
          size={20}
          color="gray"
          className="h-6 w-6 text-gray-400 hover:text-gray-600 transition-all "
        />
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
