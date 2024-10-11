import { HiOutlineEnvelope } from "react-icons/hi2";

import getCurrentUser from "@/app/action/getCurrentUser";
import { BsBell } from "react-icons/bs";
import { RiSearchLine } from "react-icons/ri";
import LogoutButton from "../logoutButton/LogoutButton";
import NotificationModal from "../notificationModal/NotificationModal";

const Navbar = async () => {
  const currentUser = await getCurrentUser();
  const today = new Date();
  const formatedDate = today.toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="lg:h-[92px] h-16 bg-white w-full  flex items-center border-b justify-between gap-4 px-4 xl:px-[26px]">
      <div className="border border-gray-400 min-h-[40px] py-1 rounded lg:flex px-4  items-center xl:w-[580px] xl:min-w-[550px] hidden">
        <input
          type="text"
          defaultValue={"Search"}
          className="outline-none border-none  bg-transparent text-sm xl:text-base font-medium w-full text-gray-500 "
        />
        <RiSearchLine
          size={28}
          className="mr-[6px] font-bold"
          color="#828282"
        />
      </div>
      <div className="lg:text-right text-left">
        <p className="">{currentUser?.name}</p>
        <h1 className=" font-semibold">
          {currentUser?.companyName || " Medical Clinc "}
        </h1>
      </div>
      <div className="border xl:min-w-[137px] md:flex items-center justify-center sm:block hidden border-gray-400 py-1 rounded px-2 ">
        {formatedDate}
      </div>
      <div className="flex items-center xl:mr-[12px] cursor-not-allowed justify-between gap-8">
        <HiOutlineEnvelope
          size={20}
          className="h-[29px] w-[29px] md:block hidden text-gray-400 transition-all "
        />
        <NotificationModal>
          <BsBell
            size={20}
            title="Notifications"
            color="gray"
            className="h-[29px] w-[29px] text-gray-400 relative  hover:text-gray-600 transition-all "
          />
          <span className="w-2 h-2 absolute top-0 right-1 ring-2 ring-white text-yellow-100 bg-red-600 rounded-full z-50" />
        </NotificationModal>
        <LogoutButton />
      </div>
    </div>
  );
};

export default Navbar;
